import axios from 'axios';
const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';
const http = axios.create({ baseURL: base });

http.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default http;
