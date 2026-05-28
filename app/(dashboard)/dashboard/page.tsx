import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { RealtimeTicker } from "@/components/dashboard/RealtimeTicker";
import { Activity } from "lucide-react";
import { getDashboardMetrics, getTransactions } from "@/app/actions/transaction.actions";
import { getBudgets } from "@/app/actions/budget.actions";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const CashflowChart = dynamic(() => import("@/components/dashboard/CashflowChart").then(mod => mod.CashflowChart), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-lg" />
});

const CategoryPieChart = dynamic(() => import("@/components/dashboard/CategoryPieChart").then(mod => mod.CategoryPieChart), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-lg" />
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Realtime financial overview and system status.",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "placeholder-user-id";
  
  // Fetch real data from Server Actions
  const metrics = await getDashboardMetrics(userId);
  const transactions = await getTransactions(userId);
  const budgets = await getBudgets(userId);

  return (
    <div className="flex flex-col gap-6 animate-stagger-1 w-full">
      {/* Realtime Ticker fixed at top for Bloomberg feel */}
      <div className="w-full">
        <RealtimeTicker initialTransactions={transactions} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-display font-bold tracking-tight text-[#E6EDF3] flex items-center gap-2">
            Command Center
            <span className="relative flex h-2 w-2 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5C3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5C3]"></span>
            </span>
          </h1>
          <p className="text-[13px] font-mono text-[#666]">SYSTEM_STATUS: NOMINAL | SYNC: TRUE</p>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 bg-[#111] px-3 py-1.5 rounded-md border border-[#222]">
          <Activity className="h-4 w-4 text-[#00E5C3]" />
          <span className="text-[12px] font-mono text-[#A0A0A0]">Live Feed Active</span>
        </div>
      </div>
      
      {/* 4 Summary Cards */}
      <SummaryCards 
        income={metrics.income} 
        expense={metrics.expense} 
        balance={metrics.balance} 
      />
      
      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left Column - Wider */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="h-[400px]">
            <CashflowChart initialTransactions={transactions} />
          </div>
          <div className="h-auto">
            <RecentTransactions initialTransactions={transactions} />
          </div>
        </div>
        
        {/* Right Column - Narrower */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="h-[320px]">
            <CategoryPieChart initialTransactions={transactions} />
          </div>
          <div className="flex-1">
            <BudgetProgress initialBudgets={budgets} />
          </div>
        </div>
      </div>
    </div>
  );
}
