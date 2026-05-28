import { create } from 'zustand'
import { TransactionWithCategory, Category } from '@/types/transaction'
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '@/lib/mock-data'
import { insforge } from '@/lib/insforge/client'

interface TransactionState {
  transactions: TransactionWithCategory[]
  categories: Category[]
  loading: boolean
  addTransaction: (tx: any) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  fetchData: () => Promise<void>
}

export const useTransactions = create<TransactionState>((set) => ({
  transactions: MOCK_TRANSACTIONS, // Default to mock data initially
  categories: MOCK_CATEGORIES,
  loading: false,

  fetchData: async () => {
    // Prevent fetching if no real env vars (avoids errors in demo mode)
    if (!process.env.NEXT_PUBLIC_INSFORGE_URL) return;

    set({ loading: true })
    const { data: txData } = await insforge.from('transactions').select('*, category:categories(*)').order('date', { ascending: false })
    const { data: catData } = await insforge.from('categories').select('*').order('sort_order', { ascending: true })
    
    if (txData && catData) {
      set({ transactions: txData, categories: catData, loading: false })
    } else {
      set({ loading: false })
    }
  },

  addTransaction: async (txData) => {
    // Implement optimistic update for demo
    const newTx = { ...txData, id: `t${Date.now()}` }
    set((state) => ({ transactions: [newTx, ...state.transactions] }))
    
    if (process.env.NEXT_PUBLIC_INSFORGE_URL) {
      await insforge.from('transactions').insert(txData)
    }
  },

  deleteTransaction: async (id) => {
    set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) }))
    
    if (process.env.NEXT_PUBLIC_INSFORGE_URL) {
      await insforge.from('transactions').delete().eq('id', id)
    }
  }
}))
