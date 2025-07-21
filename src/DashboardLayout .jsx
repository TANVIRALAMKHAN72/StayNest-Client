// src/Layout/DashboardLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import useUserRole from '../Hooks/useUserRole'; // এই হুকটি পরে তৈরি করব
import { FaUser, FaBuilding, FaBullhorn, FaMoneyBillWave, FaHistory, FaUsers, FaTicketAlt, FaChartBar } from 'react-icons/fa'; // আইকন ব্যবহার করার জন্য
import useUserRole from './useUserRole ';
import useAuth from './Hooks/useAuth';


const DashboardLayout = () => {
    const { user, loading } = useAuth();
    const { role, isRoleLoading } = useUserRole(user?.email); // ইউজারের রোল লোড করা

    if (loading || isRoleLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    // Sidebar navigation links based on role
    const navLinks = [
        <li><Link to="/dashboard/my-profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaUser /> My Profile</Link></li>,
        <li><Link to="/dashboard/announcements" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaBullhorn /> Announcements</Link></li>,
    ];

    if (role === 'member') {
        navLinks.splice(1, 0, 
            <li><Link to="/dashboard/make-payment" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaMoneyBillWave /> Make Payment</Link></li>,
            <li><Link to="/dashboard/payment-history" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaHistory /> Payment History</Link></li>
        );
    }

    if (role === 'admin') {
        navLinks.splice(0, navLinks.length, // Clear previous links and add admin specific ones
            <li><Link to="/dashboard/admin-profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaChartBar /> Admin Profile</Link></li>,
            <li><Link to="/dashboard/manage-members" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaUsers /> Manage Members</Link></li>,
            <li><Link to="/dashboard/make-announcement" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaBullhorn /> Make Announcement</Link></li>,
            <li><Link to="/dashboard/agreement-requests" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaBuilding /> Agreement Requests</Link></li>,
            <li><Link to="/dashboard/manage-coupons" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"><FaTicketAlt /> Manage Coupons</Link></li>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white shadow-lg p-6 flex flex-col items-center lg:items-start space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
                <ul className="w-full">
                    {navLinks}
                </ul>
                <div className="divider lg:hidden"></div>
                <ul className="w-full mt-4 lg:mt-auto">
                    <li><Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200">Back to Home</Link></li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 lg:p-10">
                <Outlet /> {/* Renders the specific dashboard component based on the route */}
            </div>
        </div>
    );
};

export default DashboardLayout;