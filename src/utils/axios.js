// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
// });

// export default axiosInstance;

import axiosInstance from '../api/axiosInstance'; 

const login = async (email, password) => {
    // Calling axiosInstance automatically injects { withCredentials: true }
    const response = await axiosInstance.post('/jwt', { email, password }); 
    return response.data;
};