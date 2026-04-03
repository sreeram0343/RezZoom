import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Uses env in prod, localhost in dev
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to inject the JWT token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rezzoom_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Just in case we add auth middleware later
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
