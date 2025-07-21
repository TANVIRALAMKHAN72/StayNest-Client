import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaPlus, FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/coupons");
      return res.data;
    },
  });

  const addCouponMutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axiosSecure.post("/api/coupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon added successfully!");
      queryClient.invalidateQueries(["allCoupons"]);
      reset();
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add coupon.");
    },
  });

  const updateCouponAvailabilityMutation = useMutation({
    mutationFn: async ({ id, available }) => {
      const res = await axiosSecure.patch(`/api/coupons/${id}/availability`, {
        available,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon availability updated!");
      queryClient.invalidateQueries(["allCoupons"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to update coupon availability."
      );
    },
  });

  const onSubmitAddCoupon = (data) => {
    addCouponMutation.mutate({
      ...data,
      discountPercentage: parseInt(data.discountPercentage),
      available: true,
    });
  };

  const handleToggleAvailability = (coupon) => {
    updateCouponAvailabilityMutation.mutate({
      id: coupon._id,
      available: !coupon.available,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-8">
        Error loading coupons: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Manage Coupons
      </h2>

      <div className="flex justify-end mb-6 max-w-5xl mx-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add New Coupon
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
        {coupons.length === 0 ? (
          <p className="text-center text-gray-600">No coupons added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Discount (%)</th>
                  <th>Description</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <tr key={coupon._id}>
                    <th>{index + 1}</th>
                    <td>{coupon.couponCode}</td>
                    <td>{coupon.discountPercentage}%</td>
                    <td>{coupon.couponDescription}</td>
                    <td>
                      <span
                        className={`badge ${
                          coupon.available ? "badge-success" : "badge-error"
                        }`}
                      >
                        {coupon.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleAvailability(coupon)}
                        className={`btn btn-sm ${
                          coupon.available ? "btn-warning" : "btn-success"
                        } text-white`}
                        disabled={updateCouponAvailabilityMutation.isLoading}
                      >
                        {coupon.available ? <FaToggleOff /> : <FaToggleOn />}{" "}
                        {coupon.available ? "Set Unavailable" : "Set Available"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h3 className="text-2xl font-bold text-center mb-6">
              Add New Coupon
            </h3>
            <form
              onSubmit={handleSubmit(onSubmitAddCoupon)}
              className="space-y-4"
            >
              <div>
                <label className="label">Coupon Code</label>
                <input
                  type="text"
                  {...register("couponCode", {
                    required: "Coupon code is required",
                  })}
                  placeholder="e.g., SUMMER20"
                  className="input input-bordered w-full"
                />
                {errors.couponCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.couponCode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Discount Percentage</label>
                <input
                  type="number"
                  {...register("discountPercentage", {
                    required: "Discount percentage is required",
                    min: { value: 1, message: "Must be at least 1%" },
                    max: { value: 100, message: "Cannot exceed 100%" },
                  })}
                  placeholder="e.g., 20"
                  className="input input-bordered w-full"
                />
                {errors.discountPercentage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Coupon Description</label>
                <textarea
                  {...register("couponDescription", {
                    required: "Description is required",
                  })}
                  placeholder="e.g., 20% off for new members"
                  className="textarea textarea-bordered w-full h-24"
                ></textarea>
                {errors.couponDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.couponDescription.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addCouponMutation.isLoading}
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
