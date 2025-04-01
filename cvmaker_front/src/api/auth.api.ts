import { apiClient } from './client';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api-token-auth/', {
      username: credentials.email,
      password: credentials.password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/register/', {
      username: data.email, // Используем email как username
      email: data.email,
      password: data.password,
      password2: data.password,
      first_name: data.name.split(' ')[0],
      last_name: data.name.split(' ').slice(1).join(' ') || '',
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },
}; 