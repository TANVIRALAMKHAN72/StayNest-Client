import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router"; // react-router-dom থেকে useNavigate ইমপোর্ট করুন

// Axios Instance তৈরি করুন
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // আপনার সার্ভারের বেস URL
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Request Interceptor: রিকোয়েস্ট পাঠানোর আগে টোকেন যোগ করুন
        axiosSecure.interceptors.request.use(async (config) => {
            // ✅ টোকেন পাওয়ার এবং সেট করার অংশটি আপাতত কমেন্ট আউট করা হলো
            // if (user) {
            //     try {
            //         const accessToken = await user.getIdToken(); 
            //         // console.log("Current ID Token:", accessToken); // Debugging
            //         config.headers.authorization = `Bearer ${accessToken}`;
            //     } catch (error) {
            //         console.error("Error getting ID Token:", error);
            //         // টোকেন পেতে সমস্যা হলে লগআউট বা অন্য হ্যান্ডলিং করতে পারেন
            //         await logOut();
            //         navigate('/login');
            //     }
            // }
            return config; // config অবজেক্টটি সবসময় রিটার্ন করবে
        }, (error) => {
            return Promise.reject(error);
        });

        // 2. Response Interceptor: রেসপন্স পাওয়ার পর ত্রুটি হ্যান্ডেল করুন
        axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response?.status;
            // console.log("Error status in interceptor:", status); // Debugging

            // ✅ 401 (Unauthorized) বা 403 (Forbidden) এর ক্ষেত্রে লগআউট করার লজিকটি রাখা হলো,
            // কারণ এটি সার্ভার সাইডে অথরাইজেশন ফেল করলে কাজে আসতে পারে।
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });
    }, [user, logOut, navigate]); // ডিপেন্ডেন্সি অ্যারেতে `user`, `logOut` এবং `Maps` যোগ করুন

    return axiosSecure;
};

export default useAxiosSecure;