import React from 'react';
import { Navigate, useLocation } from 'react-router';  // react-router-dom থেকে নেবে
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!user) {
    // যদি লগইন না থাকে, তাহলে Login পেজে নিয়ে যাবে এবং সাথে আগের পেজের লিঙ্ক পাঠাবে
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
