// src/Pages/Dashboard/AdminProfile.jsx
import React from 'react';
 // আপনার useAuth হুক ইমপোর্ট করুন
// import useAxiosSecure from '../../Hooks/useAxiosSecure'; // আপনার axiosSecure হুক ইমপোর্ট করুন
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUsers, FaHome, FaDoorClosed, FaChartPie } from 'react-icons/fa'; // Icons for better UI
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminProfile = () => {
    const { user } = useAuth(); // লগইন করা ইউজারের তথ্য
    const axiosSecure = useAxiosSecure(); // সুরক্ষিত API কল করার জন্য


    // admin-stats ডেটা ফেচ করুন
    const { data: stats = {}, isLoading, isError, error } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-8">Error loading admin stats: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Profile & Statistics</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mb-10">
                <div className="flex flex-col items-center">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                        src={user?.photoURL || 'https://via.placeholder.com/150'} // ডিফল্ট ছবি
                        alt="Admin Profile"
                    />
                    <h3 className="text-2xl font-semibold mt-4 text-gray-800">{user?.displayName || 'Admin'}</h3>
                    <p className="text-gray-600 mt-1">{user?.email}</p>
                    <p className="badge badge-primary badge-lg mt-3">Admin</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Total Rooms */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaHome className="text-blue-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Total Apartments</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
                    </div>
                </div>

                {/* Available Rooms */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaDoorClosed className="text-green-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Available Apartments</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.availableRooms}</p>
                    </div>
                </div>

                {/* Users Count */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaUsers className="text-purple-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Total Users</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                </div>

                {/* Members Count */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaUserShield className="text-yellow-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Total Members</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
                    </div>
                </div>

                {/* Percentage Available */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaChartPie className="text-teal-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Available (%)</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.percentageAvailable}%</p>
                    </div>
                </div>

                {/* Percentage Unavailable */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <FaChartPie className="text-red-500 text-4xl" />
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Unavailable (%)</h4>
                        <p className="text-3xl font-bold text-gray-900">{stats.percentageUnavailable}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;