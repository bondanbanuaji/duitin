import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      <Skeleton className="h-10 w-64 bg-surface" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-xl bg-surface" />
          <Skeleton className="h-64 w-full rounded-xl bg-surface" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl bg-surface" />
          <Skeleton className="h-64 w-full rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
