import { authApi } from '../api/auth.api';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.login(credentials);
    localStorage.setItem('token', response.token);
    return response;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.register(data);
    localStorage.setItem('token', response.token);
    return response;
  }

  static async logout(): Promise<void> {
    await authApi.logout();
    localStorage.removeItem('token');
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
} 