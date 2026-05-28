"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  LayoutDashboard, 
  ReceiptText, 
  ArrowLeftRight, 
  Tags, 
  Target, 
  Settings,
  Bot,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";

export function AgentCommandBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Ketik perintah atau tanya AI..." />
      <CommandList className="bg-[#0D1117] text-[#E6EDF3]">
        <CommandEmpty>Hasil tidak ditemukan.</CommandEmpty>
        <CommandGroup heading="Navigasi Cepat">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/laporan"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <ReceiptText className="mr-2 h-4 w-4" />
            <span>Laporan</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/transaksi"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            <span>Transaksi</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/kategori"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <Tags className="mr-2 h-4 w-4" />
            <span>Kategori</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/budget"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <Target className="mr-2 h-4 w-4" />
            <span>Budget</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator className="bg-[#222]" />
        <CommandGroup heading="AI Assistant">
          <CommandItem 
            onSelect={() => runCommand(() => {})} 
            className="aria-selected:bg-[#161B22] aria-selected:text-[#7C3AED]"
          >
            <Bot className="mr-2 h-4 w-4 text-[#7C3AED]" />
            <span>Tanya Duitin AI...</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator className="bg-[#222]" />
        <CommandGroup heading="Pengaturan">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))} className="aria-selected:bg-[#161B22] aria-selected:text-[#00E5C3]">
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
