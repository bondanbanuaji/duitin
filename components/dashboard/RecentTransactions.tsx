"use client";

import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils/currency";
import { formatRelativeTime } from "@/lib/utils/date";
import { ArrowDownRight, ArrowUpRight, MoreHorizontal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function RecentTransactions({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  const transactionsData = initialTransactions.length > 0 ? initialTransactions : MOCK_TRANSACTIONS;
  
  const recent = [...transactionsData]
    .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-3 h-full bg-[#0A0A0A] border border-[#222] rounded-lg p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#8B949E] uppercase">Transaction Ledger</h3>
        <button className="text-[12px] font-mono text-[#00E5C3] hover:text-white flex items-center gap-1 transition-colors group">
          View All <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 divide-y divide-[#1a1a1a]">
        {recent.map((tx, idx) => {
          const isIncome = tx.type === "income";
          return (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={tx.id} 
              className="flex items-center justify-between py-3 group hover:bg-[#111] -mx-2 px-2 rounded-md transition-colors cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-[4px] bg-[#111] border border-[#222] flex items-center justify-center shrink-0">
                  <span className="text-[14px] grayscale group-hover:grayscale-0 transition-all">{tx.category?.icon || '📝'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-[#E6EDF3]">{tx.description}</span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#484F58]">
                    <span>{tx.category?.name}</span>
                    <span className="h-1 w-1 rounded-full bg-[#333]" />
                    <span>{formatRelativeTime(tx.created_at || tx.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-0.5">
                  <span className={`text-[14px] font-mono font-medium ${isIncome ? 'text-[#00E5C3]' : 'text-[#E6EDF3]'}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                  <span className="text-[10px] font-mono text-[#484F58] uppercase tracking-wider">IDR</span>
                </div>
                <button className="text-[#333] group-hover:text-[#8B949E] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
