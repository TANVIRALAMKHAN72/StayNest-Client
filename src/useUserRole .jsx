// src/Hooks/useUserRole.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; // tanstack query ব্যবহার করে ডাটা ফেচিং

const useUserRole = (email) => {
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    const { data: userRoleData, isLoading: queryLoading, refetch } = useQuery({
        queryKey: ['userRole', email],
        queryFn: async () => {
            if (!email) {
                setIsRoleLoading(false);
                return null;
            }
            try {
                const res = await axios.get(`http://localhost:3000/users/${email}`); // সার্ভার URL পরিবর্তন করুন
                return res.data;
            } catch (error) {
                console.error("Error fetching user role:", error);
                return null;
            }
        },
        enabled: !!email, // Only run query if email exists
    });

    useEffect(() => {
        if (!queryLoading && userRoleData) {
            setRole(userRoleData.role);
            setIsRoleLoading(false);
        } else if (!queryLoading && !userRoleData && email) {
            // If user data not found after query, assume default 'user' role or handle as needed
            setRole('user'); 
            setIsRoleLoading(false);
        } else if (!email) {
            setRole(null); // No email, no role
            setIsRoleLoading(false);
        }
    }, [userRoleData, queryLoading, email]);

    return { role, isRoleLoading, refetch };
};

export default useUserRole;