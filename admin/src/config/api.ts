import axios from 'axios';

const api = axios.create({
  baseURL: 'https://134.185.99.89:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `access:${token}`;
  }
  return config;
});

export default api;