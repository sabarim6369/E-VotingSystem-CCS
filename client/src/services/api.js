import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  const token = config.useAdmin ? adminToken : userToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  adminLogin: (payload) => api.post('/auth/admin/login', payload)
};

export const userApi = {
  elections: () => api.get('/user/elections'),
  vote: (electionId, payload) => api.post(`/user/elections/${electionId}/vote`, payload)
};

export const adminApi = {
  elections: () => api.get('/admin/elections', { useAdmin: true }),
  createElection: (payload) => api.post('/admin/elections', payload, { useAdmin: true }),
  addCandidate: (electionId, payload) =>
    api.post(`/admin/elections/${electionId}/candidates`, payload, { useAdmin: true }),
  setStatus: (electionId, payload) =>
    api.patch(`/admin/elections/${electionId}/status`, payload, { useAdmin: true }),
  results: (electionId) => api.get(`/admin/elections/${electionId}/results`, { useAdmin: true })
};
