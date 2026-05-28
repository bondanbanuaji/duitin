import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getBudgets } from "@/app/actions/budget.actions";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budgets",
  description: "Set and track your financial limits with precision.",
};

export default async function BudgetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "placeholder-user-id";

  const budgets = await getBudgets(userId);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold text-[#E6EDF3]">Budget Planner</h1>
          <p className="text-[#8B949E]">Rencanakan keuanganmu dan pantau batas pengeluaran.</p>
        </div>
        <Button className="bg-[#00E5C3] text-[#080B10] hover:bg-[#00E5C3]/90 font-bold shadow-lg shadow-[#00E5C3]/20">
          <PlusCircle className="mr-2 h-4 w-4" /> Buat Budget
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-auto">
          <BudgetProgress initialBudgets={budgets} />
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-lg flex flex-col items-center justify-center border-dashed border-2 text-[#484F58] gap-4">
          <div className="h-16 w-16 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center mb-2 animate-pulse text-2xl">
            🤖
          </div>
          <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#8B949E] uppercase text-center">AI Budget Recommendations</h3>
          <p className="text-center font-mono text-[11px] max-w-sm leading-relaxed uppercase">
            Duitin AI is analyzing high-velocity expenditure patterns to optimize your resource allocation.
          </p>
          <Button variant="outline" className="mt-4 border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/10 font-mono text-[11px] uppercase tracking-widest">
            Execute_Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
