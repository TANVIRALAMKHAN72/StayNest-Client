
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router"; 
import { router } from './router/router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const queryClient = new QueryClient(); 

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider> 
                    
                    <Elements stripe={stripePromise}>
                        <RouterProvider router={router} />
                    </Elements>
                </HelmetProvider>
                <ToastContainer /> 
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>,
);