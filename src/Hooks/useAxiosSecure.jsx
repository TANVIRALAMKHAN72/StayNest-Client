import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://staynest-server.vercel.app', 
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
       
        axiosSecure.interceptors.request.use(async (config) => {
            
            // if (user) {
            //     try {
            //         const accessToken = await user.getIdToken(); 
            //         // console.log("Current ID Token:", accessToken); 
            //         config.headers.authorization = `Bearer ${accessToken}`;
            //     } catch (error) {
            //         console.error("Error getting ID Token:", error);
            //         
            //         await logOut();
            //         navigate('/login');
            //     }
            // }
            return config; 
        }, (error) => {
            return Promise.reject(error);
        });

        
        axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response?.status;
            

            
            
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });
    }, [user, logOut, navigate]); 

    return axiosSecure;
};

export default useAxiosSecure;