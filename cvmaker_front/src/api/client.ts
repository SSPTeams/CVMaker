import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const resumeApi = {
  getAll: async () => {
    const response = await apiClient.get('/resumes/');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/resumes/${id}/`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/resumes/', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/resumes/${id}/`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/resumes/${id}/`);
  },
}; 