"use client";

import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

export function ReportTable({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  const transactionsData = initialTransactions.length > 0 ? initialTransactions : MOCK_TRANSACTIONS;

  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full bg-[#0A0A0A] border border-[#222]">
      <div className="p-4 border-b border-[#222] bg-[#111]">
        <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#8B949E] uppercase">Transaction History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] font-mono text-[#484F58] uppercase bg-[#050505] border-b border-[#222]">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-right">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {transactionsData.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#111] transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-[#484F58] group-hover:text-[#8B949E]">{formatDate(tx.date)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-[4px] bg-[#111] border border-[#222] flex items-center justify-center text-xs grayscale group-hover:grayscale-0">
                      {tx.category?.icon}
                    </span>
                    <span className="font-mono text-xs text-[#E6EDF3]">{tx.category?.name?.toUpperCase()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#8B949E] group-hover:text-[#E6EDF3]">{tx.description}</td>
                <td className={`px-6 py-4 text-right font-mono text-[13px] font-medium ${tx.type === 'income' ? 'text-[#00E5C3]' : 'text-[#E6EDF3]'}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-[#222] bg-[#050505] mt-auto flex justify-between items-center text-[11px] font-mono text-[#484F58]">
        <span>TOTAL_ENTRIES: {transactionsData.length}</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded-[4px] bg-[#111] border border-[#222] hover:text-[#E6EDF3] disabled:opacity-30 uppercase">PREV</button>
          <button className="px-2 py-1 rounded-[4px] bg-[#111] border border-[#222] hover:text-[#E6EDF3] disabled:opacity-30 uppercase">NEXT</button>
        </div>
      </div>
    </div>
  );
}
