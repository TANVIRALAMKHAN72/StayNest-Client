// src/Pages/Dashboard/Announcements.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Announcements = () => {
    const { data: announcements, isLoading, isError, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/announcements'); // সার্ভার URL পরিবর্তন করুন
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Announcements</h1>
            {announcements.length === 0 ? (
                <p className="text-gray-500">No announcements available yet.</p>
            ) : (
                <div className="space-y-6">
                    {announcements.map(announcement => (
                        <div key={announcement._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-sm transition-shadow">
                            <h3 className="text-xl font-semibold text-primary mb-2">{announcement.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{announcement.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Published: {new Date(announcement.timestamp).toLocaleDateString()} at {new Date(announcement.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Announcements;