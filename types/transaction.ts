export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense' | 'both';
  is_default: boolean;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category_id: string;
  description: string;
  date: string;
  created_at?: string;
}

// Temporary for UI development
export interface TransactionWithCategory extends Transaction {
  category?: Category;
}
