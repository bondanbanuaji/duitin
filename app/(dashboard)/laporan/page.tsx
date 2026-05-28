import { DateRangePicker } from "@/components/laporan/DateRangePicker";
import { ReportTable } from "@/components/laporan/ReportTable";
import { Button } from "@/components/ui/button";
import { Download, Filter, FileText } from "lucide-react";
import { getTransactions } from "@/app/actions/transaction.actions";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const CashflowChart = dynamic(() => import("@/components/dashboard/CashflowChart").then(mod => mod.CashflowChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />
});

const CategoryPieChart = dynamic(() => import("@/components/dashboard/CategoryPieChart").then(mod => mod.CategoryPieChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />
});

export const metadata: Metadata = {
  title: "Reports",
  description: "Comprehensive financial analytics and exportable reports.",
};

export default async function LaporanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "placeholder-user-id";

  const transactions = await getTransactions(userId);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold text-[#E6EDF3]">Laporan Keuangan</h1>
          <p className="text-[#8B949E]">Analisis komprehensif dari aktivitas keuangan kamu.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="bg-[#0D1117] border-[#222] hover:bg-[#161B22] hover:text-[#E6EDF3]">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <a href="/api/export/pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="bg-[#0D1117] border-[#00E5C3]/30 text-[#00E5C3] hover:bg-[#00E5C3]/10">
              <FileText className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </a>
          <a href="/api/export/xlsx" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="bg-[#0D1117] border-[#00E5A0]/30 text-[#00E5A0] hover:bg-[#00E5A0]/10">
              <Download className="mr-2 h-4 w-4" /> Export XLSX
            </Button>
          </a>
        </div>
      </div>

      <div className="glass-card p-4 rounded-xl flex items-center gap-4 bg-[#0A0A0A] border border-[#222]">
        <DateRangePicker />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <CashflowChart initialTransactions={transactions} />
        </div>
        <CategoryPieChart initialTransactions={transactions} />
        <div className="glass-card p-6 rounded-xl flex items-center justify-center border-dashed border-2 border-[#222] h-[400px] bg-[#0A0A0A]">
          <p className="text-[#484F58] font-mono text-sm tracking-widest uppercase">Analytics_Engine_V2_Standby</p>
        </div>
      </div>

      <div className="h-auto">
        <ReportTable initialTransactions={transactions} />
      </div>
    </div>
  );
}
