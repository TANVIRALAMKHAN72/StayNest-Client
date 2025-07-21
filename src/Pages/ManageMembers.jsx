// src/Pages/Dashboard/ManageMembers.jsx
import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaUser, FaUserShield, FaTrash } from 'react-icons/fa'; // Icons
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // সব ইউজার ফেচ করুন
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // রোল আপডেট করার মিউটেশন
    const updateRoleMutation = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch(`/users/${email}/role`, { role });
            return res.data;
        },
        onSuccess: () => {
            toast.success('User role updated successfully!');
            queryClient.invalidateQueries(['allUsers']); // ডেটা রিফেচ করুন
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to update user role.');
        }
    });

    const handleRemoveMember = (userEmail) => {
        // রোল 'user' এ পরিবর্তন করুন
        updateRoleMutation.mutate({ email: userEmail, role: 'user' });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-8">Error loading users: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Manage Members</h2>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Current Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'badge-error' : user.role === 'member' ? 'badge-success' : 'badge-info'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {user.role === 'member' ? (
                                            <button
                                                onClick={() => handleRemoveMember(user.email)}
                                                className="btn btn-sm btn-error text-white"
                                                disabled={updateRoleMutation.isLoading}
                                            >
                                                <FaTrash /> Remove
                                            </button>
                                        ) : (
                                            <span className="text-gray-500 text-sm">N/A</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMembers;