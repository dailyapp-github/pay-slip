import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5001/v1/dev/pay-slip',
  baseURL: 'https://api.v2.attendance.dailyapp.id/v1/prod/pay-slip',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// test

export default api;
