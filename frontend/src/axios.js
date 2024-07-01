import axios from "axios";


// Creating an instance of axios
const axiosApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
    withCredentials: true,
    withXSRFToken: true,
});




export const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
    //   console.log('CSRF Token response:', response);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
};

// Request interceptor to add the token to headers
axiosApiClient.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});



export default axiosApiClient;