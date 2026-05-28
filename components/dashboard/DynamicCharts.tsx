"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const CashflowChart = dynamic(
  () => import("./CashflowChart").then((mod) => mod.CashflowChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-lg bg-surface/50" />,
  }
);

export const CategoryPieChart = dynamic(
  () => import("./CategoryPieChart").then((mod) => mod.CategoryPieChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-lg bg-surface/50" />,
  }
);
