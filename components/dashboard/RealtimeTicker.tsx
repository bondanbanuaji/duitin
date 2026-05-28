"use client";

import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils/currency";
import { Activity } from "lucide-react";

export function RealtimeTicker({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  const transactionsData = initialTransactions.length > 0 ? initialTransactions : MOCK_TRANSACTIONS;

  // Take last 10 for ticker tape
  const latest = [...transactionsData]
    .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
    .slice(0, 10);

  // Duplicate for seamless infinite scroll
  const tickerItems = [...latest, ...latest];

  return (
    <div className="w-full bg-[#050505] border border-[#222] rounded-md h-9 overflow-hidden flex items-center relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
      
      {/* Live Badge Fixed at Left */}
      <div className="absolute left-2 z-20 flex items-center gap-2 bg-[#111] px-2 py-0.5 rounded-[4px] border border-[#222]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5C3] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5C3]"></span>
        </span>
        <span className="text-[9px] font-mono font-bold text-[#00E5C3] tracking-widest uppercase">Live</span>
      </div>

      <div className="flex items-center whitespace-nowrap animate-ticker ml-24">
        {tickerItems.map((tx, i) => {
          const isIncome = tx.type === "income";
          return (
            <div key={`${tx.id}-${i}`} className="flex items-center gap-3 mx-6">
              <span className="text-[11px] font-mono text-[#484F58]">{tx.category?.name?.toUpperCase() || 'SYS'}</span>
              <span className="text-[11px] font-mono text-[#E6EDF3]">{tx.description}</span>
              <span className={`text-[11px] font-mono font-medium ${isIncome ? 'text-[#00E5A0]' : 'text-[#FF3B5C]'}`}>
                {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
              </span>
              <span className="text-[#333] ml-2">/</span>
            </div>
          );
        })}
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10" />
    </div>
  );
}
