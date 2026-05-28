import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Ticker Skeleton */}
      <Skeleton className="h-12 w-full rounded-md" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md hidden sm:block" />
      </div>
      
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl border border-white/5 bg-surface/50" />
        ))}
      </div>
      
      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 flex flex-col gap-4">
          <Skeleton className="h-[400px] w-full rounded-xl border border-white/5 bg-surface/50" />
          <Skeleton className="h-[300px] w-full rounded-xl border border-white/5 bg-surface/50" />
        </div>
        <div className="xl:col-span-4 flex flex-col gap-4">
          <Skeleton className="h-[320px] w-full rounded-xl border border-white/5 bg-surface/50" />
          <Skeleton className="h-[280px] w-full rounded-xl border border-white/5 bg-surface/50" />
        </div>
      </div>
    </div>
  );
}
