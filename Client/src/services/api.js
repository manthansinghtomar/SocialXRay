import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry / general errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (e.g., token expired), we can optionally handle logout logic or redirect here
    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired; you could clear token or let the context handle it
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
