"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Tags, 
  Target, 
  Settings, 
  HelpCircle, 
  Terminal,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/branding/Logo";

const mainNavItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Cashflow", href: "/transaksi", icon: ArrowLeftRight },
  { title: "Analytics", href: "/laporan", icon: Activity },
  { title: "Taxonomy", href: "/kategori", icon: Tags },
  { title: "Targets", href: "/budget", icon: Target },
];

const secondaryNavItems = [
  { title: "System", href: "/settings", icon: Settings },
  { title: "Support", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[260px] flex-col h-full bg-[#050505] border-r border-[#1a1a1a]">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-[#1a1a1a]">
        <Logo variant="full" size="md" priority />
      </div>
      
      {/* Navigation */}
      <div className="flex-1 py-5 flex flex-col gap-6 px-3 overflow-y-auto">
        <nav className="flex flex-col gap-0.5">
          <div className="px-2 mb-2 text-[10px] font-mono text-[#666] tracking-wider uppercase">Primary Workflows</div>
          {mainNavItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all group",
                    isActive
                      ? "bg-[#111] text-[#00E5C3]"
                      : "text-[#A0A0A0] hover:text-[#E6EDF3] hover:bg-[#111]"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-[#00E5C3]" : "text-[#666] group-hover:text-[#A0A0A0]")} strokeWidth={isActive ? 2.5 : 2} />
                  {item.title}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="ml-auto w-1 h-4 rounded-full bg-[#00E5C3]" 
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-0.5">
          <div className="h-px bg-[#1a1a1a] mx-2 my-3" />
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-colors group",
                  isActive
                    ? "bg-[#111] text-[#00E5C3]"
                    : "text-[#A0A0A0] hover:text-[#E6EDF3] hover:bg-[#111]"
                )}
              >
                <item.icon className="h-4 w-4 text-[#666] group-hover:text-[#A0A0A0]" strokeWidth={2} />
                {item.title}
              </Link>
            );
          })}
          
          <button className="flex items-center justify-between gap-3 px-2 py-2 mt-2 rounded-md text-[13px] font-medium transition-colors text-[#00E5C3] hover:bg-[#00E5C3]/10 border border-transparent hover:border-[#00E5C3]/20 group">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              Copilot
            </div>
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-[3px] bg-[#111] text-[#A0A0A0] border border-[#222]">
              ⌘K
            </span>
          </button>

          {/* Unlimited Access Badge */}
          <div className="flex items-center gap-2 px-2 py-2 mt-2 bg-[#00E5C3]/5 border border-[#00E5C3]/10 rounded-md cursor-default">
            <span className="relative flex h-1.5 w-1.5 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5C3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5C3]"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#00E5C3] tracking-wider uppercase">Unlimited Free Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
