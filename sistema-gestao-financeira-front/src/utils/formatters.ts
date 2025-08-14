// src/utils/formatters.ts

// Formatar valor em moeda brasileira
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Formatar data no padrão brasileiro
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Formatar data para input HTML (YYYY-MM-DD)
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Obter data atual no formato ISO
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Formatar texto de forma capitalizada
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Obter cor baseada no tipo de transação
export const getTransactionColor = (type: 'RECEITA' | 'DESPESA'): string => {
  return type === 'RECEITA' ? '#22c55e' : '#ef4444'; // verde para receita, vermelho para despesa
};

// Obter ícone baseado no tipo de transação
export const getTransactionIcon = (type: 'RECEITA' | 'DESPESA'): string => {
  return type === 'RECEITA' ? '↗️' : '↙️';
};

// Calcular porcentagem
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

// Gerar cores aleatórias para gráficos
export const generateColors = (count: number): string[] => {
  const colors = [
    '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1'
  ];
  
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Formatar números grandes (K, M, B)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};