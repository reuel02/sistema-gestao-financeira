// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User, LoginData, RegisterData } from '../types/index';

export const useAuth = () => {
  // Estado para saber se está carregando
  const [loading, setLoading] = useState(true);
  // Estado para saber se está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado com dados do usuário
  const [user, setUser] = useState<User | null>(null);

  // Verifica autenticação ao carregar o hook
  useEffect(() => {
    checkAuth();
  }, []);

  // Função para verificar se está autenticado
  const checkAuth = () => {
    setLoading(true);
    
    const authenticated = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();
    
    setIsAuthenticated(authenticated);
    setUser(currentUser);
    setLoading(false);
  };

  // Função para fazer login
  const login = async (credentials: LoginData) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      setIsAuthenticated(true);
      setUser(response.user);
      
      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para registrar
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      const newUser = await authService.register(userData);
      return newUser;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  // Função para atualizar perfil
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    loading,
    isAuthenticated,
    user,
    
    // Funções
    login,
    register,
    logout,
    updateProfile,
    checkAuth
  };
};