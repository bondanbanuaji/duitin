"use client";

import { Bell, Command, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils/date";

export function Navbar() {
  const today = new Date();

  return (
    <header className="h-16 border-b border-[#1a1a1a] bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      
      {/* Left section - Mobile Brand or Desktop Date */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden flex items-center gap-2">
          <div className="h-5 w-5 rounded-[3px] bg-[#00FFB2] flex items-center justify-center">
            <Command className="h-3 w-3 text-black" strokeWidth={3} />
          </div>
          <h1 className="text-lg font-display font-bold text-[#EDEDED]">DUITIN</h1>
        </div>

        <div className="hidden lg:flex flex-col">
          <h2 className="text-[11px] font-mono tracking-widest text-[#666] uppercase">
            System Date
          </h2>
          <p className="text-[13px] font-medium text-[#A0A0A0]">
            {formatDate(today)} <span className="text-[#00FFB2] ml-1">● ONLINE</span>
          </p>
        </div>
      </div>

      {/* Center - Global Search Bar (Cyber OS feel) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#666] group-focus-within:text-[#00FFB2] transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search transactions, accounts, or ask AI..." 
            className="block w-full pl-10 pr-12 py-1.5 border border-[#222] rounded-md leading-5 bg-[#111] text-[#EDEDED] placeholder-[#666] focus:outline-none focus:ring-1 focus:ring-[#00FFB2] focus:border-[#00FFB2] sm:text-[13px] transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-[10px] font-mono text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded-[3px] border border-[#222]">⌘F</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative h-8 w-8 text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#111] tactile-hover">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#FF334B] shadow-[0_0_6px_rgba(255,51,75,0.6)]" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <div className="h-5 w-px bg-[#222] hidden sm:block mx-1" />
        
        {/* Unlimited Access Badge */}
        <div className="hidden sm:flex items-center px-2 py-1 bg-[#00FFB2]/5 border border-[#00FFB2]/10 rounded-[4px] mr-1">
          <span className="text-[9px] font-mono font-bold text-[#00FFB2] tracking-widest uppercase">FREE FULL ACCESS</span>
        </div>

        <div className="flex items-center gap-2 pl-1 cursor-pointer group tactile-hover">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[12px] font-medium text-[#EDEDED] group-hover:text-[#00FFB2] transition-colors">Admin.01</span>
            <span className="text-[10px] font-mono text-[#666]">ROOT_ACCESS</span>
          </div>
          <Avatar className="h-7 w-7 rounded-[4px] ring-1 ring-[#222] group-hover:ring-[#00FFB2] transition-all bg-[#111]">
            <AvatarImage src="https://api.dicebear.com/9.x/shapes/svg?seed=Admin" alt="Admin" />
            <AvatarFallback className="bg-[#111] text-[#00FFB2] text-xs font-mono rounded-[4px]">A1</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
