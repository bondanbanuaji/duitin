"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_BUDGETS = [
  { id: "b1", category: "Food & Beverage", limit: 3000000, spent: 1200000, color: "#00FFB2" },
  { id: "b2", category: "Transport", limit: 1000000, spent: 450000, color: "#4D9FFF" },
  { id: "b3", category: "Shopping", limit: 1500000, spent: 1400000, color: "#FFB300" }, // Near limit
  { id: "b4", category: "Entertainment", limit: 500000, spent: 600000, color: "#FF334B" },  // Over budget
];

export function BudgetProgress({ initialBudgets = [] }: { initialBudgets?: any[] }) {
  const budgetsData = initialBudgets.length > 0 ? initialBudgets : MOCK_BUDGETS;

  return (
    <div className="flex flex-col gap-4 h-full bg-[#0A0A0A] border border-[#222] rounded-lg p-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#8B949E] uppercase">Target Allocation</h3>
        <button className="h-6 w-6 flex items-center justify-center rounded-[4px] hover:bg-[#111] text-[#666] hover:text-[#E6EDF3] transition-colors">
          <Settings2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex flex-col gap-4 mt-2 flex-1 overflow-y-auto">
        {budgetsData.map((budget, idx) => {
          const limit = Number(budget.limit || budget.limitAmount || 0);
          const spent = Number(budget.spent || 0);
          const categoryName = budget.category?.name || budget.category || "Unknown";
          const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
          
          let statusColor = "bg-[#00E5A0]"; // Success
          if (percentage > 95) statusColor = "bg-[#FF3B5C]"; // Danger
          else if (percentage > 80) statusColor = "bg-[#FFB800]"; // Warning
          else if (percentage < 50) statusColor = "bg-[#0090FF]"; // Secondary

          return (
            <motion.div 
              key={budget.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              className="flex flex-col gap-2 group cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#E6EDF3]">{categoryName}</span>
                <span className="text-[11px] font-mono text-[#484F58] group-hover:text-[#8B949E] transition-colors">
                  <span className={percentage > 95 ? "text-[#FF3B5C]" : "text-[#E6EDF3]"}>{formatCurrency(spent)}</span> 
                  <span className="mx-1">/</span> 
                  {formatCurrency(limit)}
                </span>
              </div>
              <div className="w-full bg-[#111] border border-[#222] h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className={`h-full rounded-full ${statusColor}`}
                />
              </div>
              {percentage >= 100 && (
                <span className="text-[10px] font-mono font-bold text-[#FF3B5C] uppercase tracking-wider self-end mt-0.5 animate-pulse">Limit Exceeded</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
