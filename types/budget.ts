export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  period: BudgetPeriod;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at?: string;
}

export interface BudgetWithCategory extends Budget {
  category?: {
    name: string;
    icon: string;
    color: string;
  };
  current_amount: number;
}
