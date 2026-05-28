import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-base p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#161B22] text-[#484F58]">
        <Ghost size={40} />
      </div>
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold text-[#E6EDF3]">404 — Page Not Found</h1>
        <p className="max-w-md text-[#8B949E]">
          The page you are looking for might have been moved, deleted, or never existed.
        </p>
      </div>
      <Button asChild className="bg-[#00E5C3] text-[#080B10] hover:bg-[#00E5C3]/90">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
    </div>
  );
}
