import { insforge } from './client';
import { Transaction } from '@/types/transaction';

export const subscribeToTransactions = (
  userId: string,
  onInsert: (tx: Transaction) => void,
  onUpdate: (tx: Transaction) => void,
  onDelete: (id: string) => void
) => {
  return insforge
    .channel(`transactions:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onInsert(payload.new as Transaction))
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onUpdate(payload.new as Transaction))
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onDelete(payload.old.id))
    .subscribe();
};
