import { TransactionForm } from "@/components/transaksi/TransactionForm";
import { ReportTable } from "@/components/laporan/ReportTable";
import { getTransactions } from "@/app/actions/transaction.actions";
import { getCategories } from "@/app/actions/category.actions";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Manage your income and expenses with precision.",
};

export default async function TransaksiPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "placeholder-user-id";

  const transactions = await getTransactions(userId);
  const categories = await getCategories(userId);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold">Manajemen Transaksi</h1>
        <p className="text-text-secondary">Catat dan kelola semua pemasukan serta pengeluaran.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TransactionForm categories={categories} userId={userId} />
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <ReportTable initialTransactions={transactions} />
        </div>
      </div>
    </div>
  );
}
