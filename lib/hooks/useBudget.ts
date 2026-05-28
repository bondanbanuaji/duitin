import { create } from 'zustand';
import { BudgetWithCategory } from '@/types/budget';

interface BudgetState {
  budgets: BudgetWithCategory[];
  loading: boolean;
  fetchBudgets: (userId: string) => Promise<void>;
}

export const useBudget = create<BudgetState>((set) => ({
  budgets: [],
  loading: false,
  fetchBudgets: async (userId) => {
    set({ loading: true });
    // Mock for now
    setTimeout(() => {
      set({ 
        budgets: [
          { id: '1', user_id: userId, category_id: 'c1', amount: 3000000, period: 'monthly', start_date: '2025-10-01', is_active: true, current_amount: 1200000, category: { name: 'Makan', icon: '🍔', color: '#FF3B5C' } }
        ],
        loading: false 
      });
    }, 500);
  }
}));
