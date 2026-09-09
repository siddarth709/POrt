import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // A disconnected CMS must fall back to local portfolio mode, never leave the UI waiting indefinitely.
  timeout: 5000,
});

// Attach admin token automatically for dashboard requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
