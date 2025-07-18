// Модели данных для приложения учёта финансов

export type UserId = 'nikita' | 'alina';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  userId: UserId;
  type: TransactionType;
  category: string;
  amount: number;
  date: string; // ISO
  comment?: string;
}

export interface Budget {
  userId: UserId;
  month: string; // YYYY-MM
  total: number;
  categories: Record<string, number>; // лимиты по категориям
}

export interface PiggyBank {
  id: string;
  userId: UserId;
  name: string;
  target: number;
  deadline?: string; // ISO
  deposits: Array<{
    id: string;
    amount: number;
    date: string;
  }>;
} 