// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {
//   RouterProvider,
// } from "react-router";
// import { router } from './router/router.jsx';
// import AuthProvider from './Context/AuthProvider.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//   </StrictMode>,
// )





// src/main.jsx (বা index.jsx)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router"; // react-router-dom থেকে
import { router } from './router/router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- নতুন লাইন: Stripe Elements এর জন্য ইম্পোর্ট করুন ---
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Stripe Publishable Key কে .env ফাইল থেকে লোড করুন
// VITE_STRIPE_PUBLISHABLE_KEY এনভায়রনমেন্ট ভেরিয়েবল থেকে আসবে
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const queryClient = new QueryClient(); // একটি নতুন QueryClient তৈরি করুন

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider> {/* HelmetProvider যদি ব্যবহার করেন */}
                    {/* <Elements> প্রোভাইডার এখানে যোগ করুন এবং stripePromise পাস করুন */}
                    <Elements stripe={stripePromise}>
                        <RouterProvider router={router} />
                    </Elements>
                </HelmetProvider>
                <ToastContainer /> {/* ToastContainer যদি ব্যবহার করেন */}
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>,
);