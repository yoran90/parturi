import axios from 'axios';

// Create axios instance with global default configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001',
  withCredentials: true, // This ensures cookies are sent with every request
  timeout: 30000,
});

// Add a request interceptor to include localStorage token as Authorization header (Safari fallback)
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure credentials are always sent
    config.withCredentials = true;
    
    // Add localStorage token to Authorization header as fallback for Safari
    const token = localStorage.getItem('userToken');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ Unauthorized - Token may have expired');
      // Clear stored data and redirect to login
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
