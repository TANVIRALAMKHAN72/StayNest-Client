import React from "react";
// import useAuth from '../../Hooks/useAuth';
// import useUserRole from '../../Hooks/useUserRole';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../useUserRole ";

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    role,
    isRoleLoading,
    refetch: refetchRole,
  } = useUserRole(user?.email);

  const {
    data: userData,
    isLoading: userQueryLoading,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["userDetails", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`https://staynest-server.vercel.app/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (authLoading || isRoleLoading || userQueryLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        My Profile
      </h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.photoURL || "/default-user.png"}
          alt={user?.displayName || "User"}
          className="w-24 h-24 rounded-full border-4 border-primary shadow-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-700">
          {user?.displayName || "N/A"}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-gray-600 mt-2">
          Role: <span className="font-bold capitalize">{role}</span>
        </p>
      </div>

      {role === "member" && userData?.rentedApartmentInfo ? (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Rented Apartment Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Agreement Accept Date:</strong>{" "}
              {userData?.agreementAcceptDate
                ? new Date(userData.agreementAcceptDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Floor No:</strong> {userData.rentedApartmentInfo.floorNo}
            </p>
            <p>
              <strong>Block Name:</strong>{" "}
              {userData.rentedApartmentInfo.blockName}
            </p>
            <p>
              <strong>Apartment No:</strong>{" "}
              {userData.rentedApartmentInfo.apartmentNo}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 border-t pt-6 text-center text-gray-500">
          {role === "user" ? (
            <p>
              You currently do not have any rented apartment information. Apply
              for an agreement to become a member!
            </p>
          ) : (
            <p>No rented apartment information available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
