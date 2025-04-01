import { authApi } from '../api/auth.api';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return authApi.login(credentials);
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    return authApi.register(data);
  }

  static async logout(): Promise<void> {
    return authApi.logout();
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
} 