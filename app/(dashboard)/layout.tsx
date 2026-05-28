import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { AgentChat } from "@/components/ai-agent/AgentChat";
import { AgentCommandBar } from "@/components/ai-agent/AgentCommandBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-[#E6EDF3] selection:bg-[#00E5C3] selection:text-black">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-[260px] flex-col border-r border-[#222]" aria-label="Main Sidebar">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#000000]">
        <Navbar />
        
        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-0" aria-label="Dashboard Content">
          <div className="mx-auto w-full max-w-[1400px] p-4 lg:p-8 lg:pt-6 pb-24 lg:pb-12">
            {children}
          </div>
        </main>
        
        <MobileNav />
        <AgentChat />
        <AgentCommandBar />
      </div>
    </div>
  );
}
