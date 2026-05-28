import { Skeleton } from "@/components/ui/skeleton";

export default function LaporanLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-64 bg-surface" />
          <Skeleton className="h-4 w-96 bg-surface" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 bg-surface" />
          <Skeleton className="h-10 w-32 bg-surface" />
          <Skeleton className="h-10 w-32 bg-surface" />
        </div>
      </div>
      
      <Skeleton className="h-16 w-full rounded-xl bg-surface" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="lg:col-span-2 h-[400px] w-full rounded-xl bg-surface" />
        <Skeleton className="h-[400px] w-full rounded-xl bg-surface" />
        <Skeleton className="h-[400px] w-full rounded-xl bg-surface" />
      </div>

      <Skeleton className="h-[600px] w-full rounded-xl bg-surface" />
    </div>
  );
}
