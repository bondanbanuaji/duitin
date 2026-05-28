"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Activity, Tags, Target } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

const mobileNavItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Cashflow", href: "/transaksi", icon: ArrowLeftRight },
  { title: "Action", href: "/transaksi/baru", icon: Activity, isMain: true },
  { title: "Taxonomy", href: "/kategori", icon: Tags },
  { title: "Targets", href: "/budget", icon: Target },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#000000]/90 backdrop-blur-md border-t border-[#1a1a1a] z-40 px-2 pb-safe">
      <nav className="h-full flex items-center justify-around max-w-md mx-auto">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          
          if (item.isMain) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-4 flex flex-col items-center justify-center gap-1 group outline-none"
              >
                <div className="h-12 w-12 rounded-[12px] bg-[#00E5C3] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,195,0.3)] text-black transform transition-transform group-active:scale-95 border border-[#00E5C3]">
                  <item.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors outline-none",
                isActive ? "text-[#00E5C3]" : "text-[#484F58] hover:text-[#E6EDF3]"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 w-8 h-0.5 bg-[#00E5C3] rounded-b-full shadow-[0_0_8px_rgba(0,229,195,0.5)]" 
                />
              )}
              <item.icon className="h-5 w-5 mb-0.5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
