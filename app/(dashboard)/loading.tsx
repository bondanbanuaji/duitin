import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayoutLoading() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-[#EDEDED]">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-[260px] flex-col border-r border-[#222] p-6 gap-8">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Skeleton */}
        <div className="h-16 border-b border-[#1a1a1a] flex items-center justify-between px-6">
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
        
        {/* Workspace Skeleton */}
        <div className="p-8 space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  );
}
