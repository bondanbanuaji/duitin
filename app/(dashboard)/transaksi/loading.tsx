import { Skeleton } from "@/components/ui/skeleton";

export default function TransaksiLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-64 bg-surface" />
        <Skeleton className="h-4 w-96 bg-surface" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-[500px] w-full rounded-xl bg-surface" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-[600px] w-full rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
