import { Skeleton } from "@/components/ui/skeleton";

export default function KategoriLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48 bg-surface" />
        <Skeleton className="h-10 w-32 bg-surface" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <Skeleton key={i} className="h-24 w-full rounded-xl bg-surface" />
        ))}
      </div>
    </div>
  );
}
