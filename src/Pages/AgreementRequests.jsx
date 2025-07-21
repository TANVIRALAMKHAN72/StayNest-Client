// src/Pages/Dashboard/AgreementRequests.jsx
import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // পেন্ডিং অ্যাগ্রিমেন্ট রিকোয়েস্ট ফেচ করুন
    const { data: agreements = [], isLoading, isError, error } = useQuery({
        queryKey: ['agreementRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/agreements'); // সার্ভার সাইডে শুধু pending গুলোই fetch হচ্ছে
            return res.data;
        }
    });

    // অ্যাগ্রিমেন্ট স্ট্যাটাস আপডেট করার মিউটেশন
    const updateAgreementMutation = useMutation({
        mutationFn: async ({ id, status, userEmail, floorNo, blockName, apartmentNo }) => {
            const res = await axiosSecure.patch(`/api/agreements/${id}`, { status, userEmail, floorNo, blockName, apartmentNo });
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['agreementRequests']); // পেন্ডিং রিকোয়েস্ট রিফেচ করুন
            queryClient.invalidateQueries(['adminStats']); // অ্যাডমিন স্ট্যাটস আপডেট হতে পারে
            queryClient.invalidateQueries(['allUsers']); // ইউজার রোল আপডেট হতে পারে
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to process agreement request.');
        }
    });

    const handleAccept = (agreement) => {
        updateAgreementMutation.mutate({
            id: agreement._id,
            status: 'accepted',
            userEmail: agreement.userEmail,
            floorNo: agreement.floorNo,
            blockName: agreement.blockName,
            apartmentNo: agreement.apartmentNo
        });
    };

    const handleReject = (agreement) => {
        updateAgreementMutation.mutate({
            id: agreement._id,
            status: 'rejected',
            userEmail: agreement.userEmail // রোল পরিবর্তনের জন্য দরকার না হলেও, সার্ভার আশা করতে পারে
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-8">Error loading agreement requests: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Agreement Requests</h2>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
                {agreements.length === 0 ? (
                    <p className="text-center text-gray-600">No pending agreement requests at the moment.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Floor</th>
                                    <th>Block</th>
                                    <th>Room No.</th>
                                    <th>Rent</th>
                                    <th>Req. Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agreements.map((agreement, index) => (
                                    <tr key={agreement._id}>
                                        <th>{index + 1}</th>
                                        <td>{agreement.userName || 'N/A'}</td>
                                        <td>{agreement.userEmail}</td>
                                        <td>{agreement.floorNo}</td>
                                        <td>{agreement.blockName}</td>
                                        <td>{agreement.apartmentNo}</td>
                                        <td>${agreement.rent}</td>
                                        <td>{new Date(agreement.requestDate).toLocaleDateString()}</td>
                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => handleAccept(agreement)}
                                                className="btn btn-sm btn-success text-white"
                                                disabled={updateAgreementMutation.isLoading}
                                            >
                                                <FaCheckCircle /> Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(agreement)}
                                                className="btn btn-sm btn-warning text-white"
                                                disabled={updateAgreementMutation.isLoading}
                                            >
                                                <FaTimesCircle /> Reject
                                            </button>
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

export default AgreementRequests;