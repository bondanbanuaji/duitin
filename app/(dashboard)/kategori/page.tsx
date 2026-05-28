import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Organize your financial taxonomy.",
};

export default async function KategoriPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "placeholder-user-id";

  const categories = await getCategories(userId);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold text-[#E6EDF3]">Taxonomy</h1>
          <p className="text-[#8B949E]">Kelola daftar kategori untuk transaksi kamu.</p>
        </div>
        <Button className="bg-[#00E5C3] text-[#080B10] hover:bg-[#00E5C3]/90 font-bold shadow-lg shadow-[#00E5C3]/20">
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kategori
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-[#0A0A0A] border border-[#222] p-4 rounded-lg flex items-center justify-between group hover:border-[#00E5C3]/50 transition-colors cursor-default">
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-[4px] bg-[#111] border border-[#222] flex items-center justify-center text-xl shadow-sm grayscale group-hover:grayscale-0 transition-all"
                style={{ color: cat.color || '#E6EDF3' }}
              >
                {cat.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-medium text-[#E6EDF3] uppercase tracking-wider">{cat.name}</span>
                <span className="text-[10px] font-mono text-[#484F58] uppercase tracking-widest">{cat.type === 'expense' ? 'OUTFLOW' : 'INFLOW'}</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#484F58] hover:text-[#00E5C3]">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#484F58] hover:text-[#FF3B5C]">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
