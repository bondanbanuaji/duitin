import { insforge } from './client';
import { Transaction, TransactionType } from '@/types/transaction';

export const getTransactions = async (userId: string, filters?: any) => {
  let query = insforge
    .from('transactions')
    .select('*, categories(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (filters?.startDate) query = query.gte('date', filters.startDate);
  if (filters?.endDate) query = query.lte('date', filters.endDate);
  if (filters?.type) query = query.eq('type', filters.type);
  if (filters?.category) query = query.eq('category_id', filters.category);

  const { data, error } = await query;
  return { data, error };
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'> & { user_id: string }) => {
  const { data, error } = await insforge
    .from('transactions')
    .insert([transaction])
    .select();
  return { data, error };
};

export const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
  const { data, error } = await insforge
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteTransaction = async (id: string) => {
  const { error } = await insforge
    .from('transactions')
    .delete()
    .eq('id', id);
  return { error };
};

export const getCategories = async (userId: string) => {
  const { data, error } = await insforge
    .from('categories')
    .select('*')
    .or(`user_id.eq.${userId},is_default.eq.true`)
    .order('sort_order', { ascending: true });
  return { data, error };
};

export const getBudgets = async (userId: string) => {
  const { data, error } = await insforge
    .from('budgets')
    .select('*, categories(*)')
    .eq('user_id', userId)
    .eq('is_active', true);
  return { data, error };
};
