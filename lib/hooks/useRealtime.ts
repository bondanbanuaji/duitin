import { useEffect } from 'react';
import { subscribeToTransactions } from '@/lib/insforge/realtime';

export function useRealtime(userId: string | undefined, onUpdate: () => void) {
  useEffect(() => {
    if (!userId) return;

    const channel = subscribeToTransactions(
      userId,
      () => onUpdate(),
      () => onUpdate(),
      () => onUpdate()
    );

    return () => {
      channel.unsubscribe();
    };
  }, [userId, onUpdate]);
}
