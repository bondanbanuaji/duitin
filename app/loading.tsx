import { Logo } from "@/components/branding/Logo";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#080B10]">
      <div className="flex flex-col items-center gap-4">
        <Logo variant="icon" size="lg" priority className="animate-pulse" />
        <div className="h-1 w-24 overflow-hidden rounded-full bg-[#161B22]">
          <div className="h-full w-1/2 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-[#00E5C3]"></div>
        </div>
      </div>
    </div>
  );
}
