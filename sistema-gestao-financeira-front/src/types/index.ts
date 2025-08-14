export interface User {
    id: number
    nome: string
    email: string
    dataCriacao: string
}

export interface Transaction {
    id: number
    tipo: 'RECEITA' | 'DESPESA'
    quantia: number
    descricao: string
    categoria: string
    data: string
    usuarioId: number
}

export interface CreateTransaction {
    tipo: 'RECEITA' | 'DESPESA'
    quantia: number
    descricao: string
    categoria: string
    data: string
}

export interface FinancialSummary {
    totalReceitas: number
    totalDespesas: number
    saldo: number
    quantidadeTransacoes: number
}

export interface LoginData {
    email: string
    senha: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface RegisterData {
    nome: string
    email: string
    senha: string
}

export interface TransactionFilters {
    tipo?: 'RECEITA' | 'DESPESA'
    categoria?: string
    dataInicio?: string
    dataFim?: string
    page?: number
    size?: number
}