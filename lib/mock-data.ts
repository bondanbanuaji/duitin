import { Category, TransactionWithCategory } from "@/types/transaction";
import { format, subDays } from "date-fns";

export const MOCK_CATEGORIES: Category[] = [
  { id: "c1", name: "Makan & Minum", icon: "🍔", color: "#FF3B5C", type: "expense", is_default: true },
  { id: "c2", name: "Transportasi", icon: "🚗", color: "#0090FF", type: "expense", is_default: true },
  { id: "c3", name: "Belanja", icon: "🛍️", color: "#FFB800", type: "expense", is_default: true },
  { id: "c4", name: "Tagihan", icon: "🧾", color: "#7C3AED", type: "expense", is_default: true },
  { id: "c5", name: "Gaji", icon: "💰", color: "#00E5A0", type: "income", is_default: true },
  { id: "c6", name: "Freelance", icon: "💻", color: "#00E5C3", type: "income", is_default: true },
];

const today = new Date();

export const MOCK_TRANSACTIONS: TransactionWithCategory[] = [
  {
    id: "t1",
    type: "income",
    amount: 15000000,
    category_id: "c5",
    category: MOCK_CATEGORIES.find(c => c.id === "c5"),
    description: "Gaji Bulan Oktober",
    date: format(today, "yyyy-MM-dd"),
    created_at: new Date().toISOString()
  },
  {
    id: "t2",
    type: "expense",
    amount: 120000,
    category_id: "c1",
    category: MOCK_CATEGORIES.find(c => c.id === "c1"),
    description: "Makan siang dengan tim",
    date: format(today, "yyyy-MM-dd"),
    created_at: new Date().toISOString()
  },
  {
    id: "t3",
    type: "expense",
    amount: 50000,
    category_id: "c2",
    category: MOCK_CATEGORIES.find(c => c.id === "c2"),
    description: "Isi Bensin",
    date: format(subDays(today, 1), "yyyy-MM-dd"),
    created_at: new Date().toISOString()
  },
  {
    id: "t4",
    type: "expense",
    amount: 450000,
    category_id: "c4",
    category: MOCK_CATEGORIES.find(c => c.id === "c4"),
    description: "Bayar Listrik",
    date: format(subDays(today, 2), "yyyy-MM-dd"),
    created_at: new Date().toISOString()
  },
  {
    id: "t5",
    type: "income",
    amount: 2500000,
    category_id: "c6",
    category: MOCK_CATEGORIES.find(c => c.id === "c6"),
    description: "Project Website",
    date: format(subDays(today, 3), "yyyy-MM-dd"),
    created_at: new Date().toISOString()
  }
];
