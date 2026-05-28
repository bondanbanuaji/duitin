"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-base p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF3B5C]/10 text-[#FF3B5C]">
        <AlertCircle size={40} />
      </div>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-[#E6EDF3]">Something went wrong</h1>
        <p className="max-w-md text-[#8B949E]">
          An unexpected error occurred. Our team has been notified.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="bg-[#00E5C3] text-[#080B10] hover:bg-[#00E5C3]/90"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")} className="border-[#222] text-[#8B949E]">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
