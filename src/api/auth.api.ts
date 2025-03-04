import { apiClient } from './client';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

// Моки для разработки
const mockAuthResponse: AuthResponse = {
  user: {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  },
  token: 'mock_jwt_token',
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // В реальном приложении:
    // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    // return response.data;
    
    // Мок для разработки:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAuthResponse);
      }, 500);
    });
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    // В реальном приложении:
    // const response = await apiClient.post<AuthResponse>('/auth/register', data);
    // return response.data;
    
    // Мок для разработки:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...mockAuthResponse,
          user: {
            ...mockAuthResponse.user,
            name: data.name,
            email: data.email,
          },
        });
      }, 500);
    });
  },

  logout: async (): Promise<void> => {
    // В реальном приложении:
    // await apiClient.post('/auth/logout');
    
    // Мок для разработки:
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  },
}; 