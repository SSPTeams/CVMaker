import { apiClient } from './client';
import { Resume } from '../types/resume';

export const resumeApi = {
  getAll: async (): Promise<Resume[]> => {
    // Реальный API-вызов
    const response = await apiClient.get<Resume[]>('/resumes/');
    return response.data;
  },

  getById: async (id: string): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.get<Resume>(`/resumes/${id}/`);
    return response.data;
  },

  create: async (data: Omit<Resume, 'id' | 'created_at' | 'updated_at'>): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.post<Resume>('/resumes/', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Resume>): Promise<Resume> => {
    // Реальный API-вызов
    const response = await apiClient.put<Resume>(`/resumes/${id}/`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    // Реальный API-вызов
    await apiClient.delete(`/resumes/${id}/`);
  },
}; 