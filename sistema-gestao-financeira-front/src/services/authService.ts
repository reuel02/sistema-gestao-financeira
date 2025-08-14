// src/services/authService.ts
import api from './api';
import type { LoginData, LoginResponse, RegisterData, User } from '../types/index';

export const authService = {
  // Fazer login
  async login(credentials: LoginData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    // Salva o token e dados do usuário no localStorage
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },

  // Registrar novo usuário
  async register(userData: RegisterData): Promise<User> {
    const response = await api.post<User>('/auth/register', userData);
    return response.data;
  },

  // Fazer logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Verificar se usuário está logado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Obter dados do usuário logado
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obter token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  // Buscar perfil do usuário atual
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/usuarios/perfil');
    return response.data;
  },

  // Atualizar perfil do usuário
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put<User>('/usuarios/perfil', userData);
    
    // Atualiza os dados no localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    
    return response.data;
  }
};