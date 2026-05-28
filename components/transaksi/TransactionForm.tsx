"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { addTransaction } from "@/app/actions/transaction.actions";
import { toast } from "react-hot-toast";

interface TransactionFormProps {
  categories: any[];
  userId: string;
}

export function TransactionForm({ categories, userId }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = categories.filter(c => c.type === type || c.type === "both");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount") as string;
    const categoryId = formData.get("categoryId") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;

    const result = await addTransaction({
      userId,
      type,
      amount: amount,
      categoryId,
      date,
      description,
    });

    if (result.success) {
      toast.success("Transaksi berhasil ditambahkan");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Gagal menambahkan transaksi");
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 bg-[#0A0A0A] border border-[#222] rounded-lg p-5 sticky top-24">
      <h3 className="font-mono font-medium text-[13px] tracking-wider text-[#8B949E] uppercase">Execute Transaction</h3>
      
      <div className="flex bg-[#111] p-1 rounded-md border border-[#222]">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-1.5 text-[12px] font-mono font-bold rounded-sm transition-all ${
            type === "expense" 
              ? "bg-[#FF3B5C] text-white" 
              : "text-[#484F58] hover:text-[#8B949E]"
          }`}
        >
          OUTFLOW
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-1.5 text-[12px] font-mono font-bold rounded-sm transition-all ${
            type === "income" 
              ? "bg-[#00E5C3] text-[#080B10]" 
              : "text-[#484F58] hover:text-[#8B949E]"
          }`}
        >
          INFLOW
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="amount" className="text-[11px] font-mono text-[#484F58] uppercase">Amount (IDR)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484F58] font-mono text-sm">Rp</span>
            <Input 
              id="amount" 
              name="amount"
              type="number" 
              placeholder="0.00" 
              required 
              className="pl-10 font-mono text-lg bg-[#050505] border-[#222] focus-visible:ring-[#00E5C3] text-[#E6EDF3]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="categoryId" className="text-[11px] font-mono text-[#484F58] uppercase">Categorization</Label>
          <Select name="categoryId" required>
            <SelectTrigger className="bg-[#050505] border-[#222] focus:ring-[#00E5C3] font-mono text-sm text-[#E6EDF3]">
              <SelectValue placeholder="SELECT_CATEGORY" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] border-[#222] text-[#E6EDF3]">
              {filteredCategories.map(cat => (
                <SelectItem key={cat.id} value={cat.id} className="focus:bg-[#111] focus:text-[#00E5C3]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm grayscale group-hover:grayscale-0">{cat.icon}</span>
                    <span className="font-mono text-xs">{cat.name.toUpperCase()}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="date" className="text-[11px] font-mono text-[#484F58] uppercase">Timestamp</Label>
          <Input 
            id="date" 
            name="date"
            type="date" 
            defaultValue={new Date().toISOString().split('T')[0]}
            required 
            className="bg-[#050505] border-[#222] focus-visible:ring-[#00E5C3] font-mono text-sm text-[#E6EDF3]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description" className="text-[11px] font-mono text-[#484F58] uppercase">Metadata / Desc</Label>
          <Input 
            id="description" 
            name="description"
            type="text" 
            placeholder="ENTRY_DETAILS" 
            className="bg-[#050505] border-[#222] focus-visible:ring-[#00E5C3] font-mono text-sm text-[#E6EDF3]"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className={`w-full mt-2 font-mono font-bold uppercase tracking-widest text-[13px] py-6 shadow-lg transition-all active:scale-[0.98] ${
            type === "expense" 
              ? "bg-[#FF3B5C] hover:bg-[#FF4D61] text-white shadow-[#FF3B5C]/10" 
              : "bg-[#00E5C3] hover:bg-[#00FFAA] text-[#080B10] shadow-[#00E5C3]/10"
          }`}
        >
          {isLoading ? "PROCESSING..." : "COMMIT_ENTRY"}
        </Button>
      </form>
    </div>
  );
}
