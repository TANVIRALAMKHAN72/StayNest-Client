
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; 

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
                const res = await axios.get(`https://staynest-server.vercel.app/users/${email}`); 
                return res.data;
            } catch (error) {
                console.error("Error fetching user role:", error);
                return null;
            }
        },
        enabled: !!email, 
    });

    useEffect(() => {
        if (!queryLoading && userRoleData) {
            setRole(userRoleData.role);
            setIsRoleLoading(false);
        } else if (!queryLoading && !userRoleData && email) {
            
            setRole('user'); 
            setIsRoleLoading(false);
        } else if (!email) {
            setRole(null); 
            setIsRoleLoading(false);
        }
    }, [userRoleData, queryLoading, email]);

    return { role, isRoleLoading, refetch };
};

export default useUserRole;