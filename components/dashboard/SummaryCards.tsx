"use client";

import { ArrowDownIcon, ArrowUpIcon, Wallet, Target, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { motion } from "framer-motion";

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

export function SummaryCards({ income, expense, balance }: SummaryCardsProps) {
  const cards = [
    {
      title: "Net Liquidity",
      value: balance,
      icon: Wallet,
      color: "text-[#00E5C3]",
      bg: "bg-[#00E5C3]/10",
      border: "border-[#00E5C3]/20",
      trend: "+12.5%",
      subtitle: "vs last month"
    },
    {
      title: "Inflow",
      value: income,
      icon: ArrowUpIcon,
      color: "text-[#E6EDF3]",
      bg: "bg-[#111]",
      border: "border-[#222]",
      trend: "+4.2%",
      subtitle: "Avg. 4.5M/wk"
    },
    {
      title: "Outflow",
      value: expense,
      icon: ArrowDownIcon,
      color: "text-[#E6EDF3]",
      bg: "bg-[#111]",
      border: "border-[#222]",
      trend: "-2.1%",
      subtitle: "Under limit"
    },
    {
      title: "Runway Target",
      value: 3500000,
      icon: Target,
      color: "text-[#E6EDF3]",
      bg: "bg-[#111]",
      border: "border-[#222]",
      progress: 65,
      subtitle: "65% achieved"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col gap-3 p-5 rounded-lg border ${card.border} bg-[#0A0A0A] tactile-hover relative overflow-hidden group cursor-default`}
        >
          {/* Subtle gradient glow effect on hover for the primary card */}
          {idx === 0 && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5C3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}

          <div className="flex items-center justify-between z-10">
            <span className="text-[12px] font-mono font-medium text-[#8B949E] uppercase tracking-wider">
              {card.title}
            </span>
            <div className={`h-7 w-7 rounded-[4px] flex items-center justify-center ${card.bg} border ${card.border}`}>
              <card.icon className={`h-3.5 w-3.5 ${card.color}`} strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="flex flex-col gap-1 z-10 mt-1">
            <div className={`text-2xl font-mono font-bold tracking-tight ${idx === 0 ? 'text-[#00E5C3]' : 'text-[#E6EDF3]'}`}>
              <AnimatedNumber value={card.value} />
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#484F58]">
                {card.trend && (
                  <span className="flex items-center text-[#00E5A0]">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    {card.trend}
                  </span>
                )}
                <span>{card.subtitle}</span>
              </div>
            </div>

            {card.progress !== undefined && (
              <div className="w-full bg-[#1A1A1A] h-1 rounded-full mt-3 overflow-hidden border border-[#222]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="bg-[#00E5C3] h-full rounded-full" 
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
