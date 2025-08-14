// src/services/transactionService.ts
import api from './api';
import type { Transaction, CreateTransaction, FinancialSummary, TransactionFilters } from '../types/index.ts';

export const transactionService = {
  // Buscar todas as transações com filtros opcionais
  async getTransactions(filters: TransactionFilters = {}) {
    const params = new URLSearchParams();
    
    // Adiciona os filtros como query parameters
    if (filters.tipo) params.append('tipo', filters.tipo);
    if (filters.categoria) params.append('categoria', filters.categoria);
    if (filters.dataInicio) params.append('dataInicio', filters.dataInicio);
    if (filters.dataFim) params.append('dataFim', filters.dataFim);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.size) params.append('size', filters.size.toString());

    const response = await api.get<Transaction[]>(`/transacoes?${params.toString()}`);
    return response.data;
  },

  // Buscar transação por ID
  async getTransactionById(id: number) {
    const response = await api.get<Transaction>(`/transacoes/${id}`);
    return response.data;
  },

  // Criar nova transação
  async createTransaction(transaction: CreateTransaction) {
    const response = await api.post<Transaction>('/transacoes', transaction);
    return response.data;
  },

  // Atualizar transação existente
  async updateTransaction(id: number, transaction: Partial<CreateTransaction>) {
    const response = await api.put<Transaction>(`/transacoes/${id}`, transaction);
    return response.data;
  },

  // Deletar transação
  async deleteTransaction(id: number) {
    await api.delete(`/transacoes/${id}`);
  },

  // Obter resumo financeiro
  async getFinancialSummary() {
    const response = await api.get<FinancialSummary>('/transacoes/resumo');
    return response.data;
  },

  // Buscar transações por categoria
  async getTransactionsByCategory(categoria: string) {
    const response = await api.get<Transaction[]>(`/transacoes/categoria/${categoria}`);
    return response.data;
  },

  // Buscar receitas
  async getReceitas(filters: Omit<TransactionFilters, 'tipo'> = {}) {
    return this.getTransactions({ ...filters, tipo: 'RECEITA' });
  },

  // Buscar despesas
  async getDespesas(filters: Omit<TransactionFilters, 'tipo'> = {}) {
    return this.getTransactions({ ...filters, tipo: 'DESPESA' });
  }
};