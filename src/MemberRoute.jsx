import React from 'react';
import { Navigate, useLocation } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import useUserRole from '../Hooks/useUserRole';
import useAuth from './Hooks/useAuth';
import useUserRole from './useUserRole ';

const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isRoleLoading } = useUserRole(user?.email);
    const location = useLocation();

    if (loading || isRoleLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (user && role === 'member') {
        return children;
    }

    return <Navigate to="/dashboard/my-profile" state={{ from: location }} replace />;
};

export default MemberRoute;