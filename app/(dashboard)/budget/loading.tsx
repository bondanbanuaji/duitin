import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48 bg-surface" />
        <Skeleton className="h-10 w-32 bg-surface" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-[500px] w-full rounded-xl bg-surface" />
        <Skeleton className="h-[500px] w-full rounded-xl bg-surface" />
      </div>
    </div>
  );
}
