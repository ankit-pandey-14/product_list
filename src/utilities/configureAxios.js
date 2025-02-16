import axios from 'axios';

const configureAxios = () => axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 250000,
});

export const axiosInstance = configureAxios();

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (err) => {
        throw err;
    }
)