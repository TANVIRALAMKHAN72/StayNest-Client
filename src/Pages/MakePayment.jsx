import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCreditCard, FaTicketAlt } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedRent, setDiscountedRent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    data: userData = {},
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (userData?.rentedApartmentInfo && userData?.role === "member") {
      setValue("memberEmail", userData.email);
      setValue("floor", userData.rentedApartmentInfo.floorNo);
      setValue("blockName", userData.rentedApartmentInfo.blockName);
      setValue("apartmentNo", userData.rentedApartmentInfo.apartmentNo);
    }
  }, [userData, setValue]);

  const manualInputRent = watch("rent", 0);

  useEffect(() => {
    const currentRent = parseFloat(manualInputRent) || 0;
    setDiscountedRent(currentRent);
    setAppliedCoupon(null);
    setCouponError("");

    if (currentRent > 0 && stripe && elements) {
      setIsProcessing(true);
      axiosSecure
        .post("/create-payment-intent", { price: currentRent })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setIsProcessing(false);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);

          Swal.fire({
            icon: "error",
            title: "Payment Initialization Failed",
            text: "Failed to initialize payment. Please try again.",
            confirmButtonColor: "#3085d6",
          });
          setIsProcessing(false);
          setClientSecret("");
        });
    } else if (currentRent === 0) {
      setClientSecret("");
      setIsProcessing(false);
    }
  }, [manualInputRent, axiosSecure, stripe, elements]);

  const handleApplyCoupon = async () => {
    const couponCode = watch("couponCode");
    setCouponError("");

    const currentRent = parseFloat(manualInputRent);

    if (isNaN(currentRent) || currentRent <= 0) {
      setCouponError(
        "Please enter a valid rent amount before applying a coupon."
      );
      return;
    }

    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const res = await axiosSecure.get("/api/coupons");
      const coupons = res.data;
      const validCoupon = coupons.find(
        (c) => c.couponCode === couponCode && c.available
      );

      if (validCoupon) {
        const discountAmount =
          currentRent * (validCoupon.discountPercentage / 100);
        setDiscountedRent(currentRent - discountAmount);
        setAppliedCoupon(validCoupon);

        Swal.fire({
          icon: "success",
          title: "Coupon Applied!",
          text: `Coupon "${couponCode}" applied! ${validCoupon.discountPercentage}% off.`,
          confirmButtonColor: "#3085d6",
        });
      } else {
        setCouponError("Invalid or unavailable coupon code.");
        setAppliedCoupon(null);
        setDiscountedRent(currentRent);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError("Failed to apply coupon. Please try again.");
      setDiscountedRent(currentRent);
    }
  };

  const onSubmit = async (data) => {
    if (!stripe || !elements || !clientSecret) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Stripe is not ready or payment initialization failed.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      Swal.fire({
        icon: "warning",
        title: "Missing Card Details",
        text: "Card information is not complete. Please enter card details.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error: createPaymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName || "Anonymous User",
          },
        });

      if (createPaymentMethodError) {
        console.error("[createPaymentMethod error]", createPaymentMethodError);

        Swal.fire({
          icon: "error",
          title: "Card Error",
          text: createPaymentMethodError.message,
          confirmButtonColor: "#3085d6",
        });
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmPaymentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email,
              name: user?.displayName || "Anonymous User",
            },
          },
        });

      if (confirmPaymentError) {
        console.error("[confirmCardPayment error]", confirmPaymentError);

        Swal.fire({
          icon: "error",
          title: "Payment Confirmation Failed",
          text: confirmPaymentError.message,
          confirmButtonColor: "#3085d6",
        });
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);

        const paymentData = {
          memberEmail: user.email,
          floor: data.floor,
          blockName: data.blockName,
          apartmentNo: data.apartmentNo,
          originalRent: parseFloat(manualInputRent) || 0,
          paidRent: parseFloat(discountedRent.toFixed(2)),
          month: data.month,
          couponCode: appliedCoupon ? appliedCoupon.couponCode : "N/A",
          discountPercentage: appliedCoupon
            ? appliedCoupon.discountPercentage
            : 0,
          transactionId: paymentIntent.id,
          paymentDate: new Date(paymentIntent.created * 1000),
          status: paymentIntent.status,
        };

        const res = await axiosSecure.post("/api/payments", paymentData);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your payment has been processed and recorded.",
            confirmButtonColor: "#3085d6",
          });
          reset();
          setAppliedCoupon(null);
          setDiscountedRent(0);
          setCouponError("");
          setClientSecret("");
          queryClient.invalidateQueries(["paymentHistory", user.email]);
        }
        setIsProcessing(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Payment did not succeed. Please try again.",
          confirmButtonColor: "#3085d6",
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred during payment:", error);

      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again.",
        confirmButtonColor: "#3085d6",
      });
      setIsProcessing(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isUserError) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error loading user data: {userError.message}
      </div>
    );
  }

  if (!userData?.rentedApartmentInfo || userData?.role !== "member") {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-xl font-semibold text-gray-700">
            You are not a member or do not have a rented apartment yet.
          </p>
          <p className="text-gray-500 mt-2">
            Please become a member or apply for an agreement to make payments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Helmet>
        <title>StayNest | Make Payment</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Make a Payment
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label">Member Email</label>
            <input
              type="text"
              {...register("memberEmail")}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Floor</label>
              <input
                type="text"
                {...register("floor")}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="label">Block Name</label>
              <input
                type="text"
                {...register("blockName")}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="label">Apartment No.</label>
              <input
                type="text"
                {...register("apartmentNo")}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="label">Original Rent</label>
            <input
              type="number"
              step="0.01"
              {...register("rent", {
                required: "Rent amount is required",
                min: { value: 0.01, message: "Rent must be greater than 0" },
              })}
              className="input input-bordered w-full"
              placeholder="Enter rent amount"
            />
            {errors.rent && (
              <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>
            )}
          </div>

          <div>
            <label className="label">Month to Pay</label>
            <select
              {...register("month", { required: "Please select a month" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            {errors.month && (
              <p className="text-red-500 text-sm mt-1">
                {errors.month.message}
              </p>
            )}
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <label className="label">Coupon Code (Optional)</label>
              <input
                type="text"
                {...register("couponCode")}
                placeholder="Enter coupon code"
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaTicketAlt /> Apply Coupon
            </button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-1">{couponError}</p>
          )}
          {appliedCoupon && (
            <p className="text-green-600 text-md font-semibold mt-2">
              Applied: "{appliedCoupon.couponCode}" -{" "}
              {appliedCoupon.discountPercentage}% Discount!
            </p>
          )}

          {parseFloat(manualInputRent) > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-lg font-semibold text-gray-800">
                Final Amount to Pay:{" "}
                <span className="text-blue-600">
                  ${discountedRent.toFixed(2)}
                </span>
                {appliedCoupon && (
                  <span className="text-sm text-gray-500 ml-2 line-through">
                    ${parseFloat(manualInputRent).toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          )}

          {parseFloat(manualInputRent) > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Details:
              </label>
              <div className="border border-gray-300 p-3 rounded-md">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": { color: "#aab7c4" },
                      },
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={
                !stripe ||
                !elements ||
                parseFloat(manualInputRent) <= 0 ||
                !watch("month") ||
                isProcessing ||
                !clientSecret
              }
            >
              <FaCreditCard />
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
