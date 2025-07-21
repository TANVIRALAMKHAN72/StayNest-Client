import React from "react";
// import useAuth from '../../Hooks/useAuth';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { FaHistory } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/api/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
        Error loading payment history: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Payment History
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        {payments.length === 0 ? (
          <p className="text-center text-gray-600">
            No payment history found yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Month</th>
                  <th>Original Rent</th>
                  <th>Paid Amount</th>
                  <th>Coupon Applied</th>
                  <th>Transaction ID</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>{payment.month}</td>
                    <td>${payment.originalRent?.toFixed(2)}</td>
                    <td>${payment.paidRent?.toFixed(2)}</td>
                    <td>
                      {payment.couponCode || "None"} (
                      {payment.discountPercentage || 0}%)
                    </td>
                    <td>{payment.transactionId}</td>
                    <td>
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
