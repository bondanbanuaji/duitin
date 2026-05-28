import { Logo } from "@/components/branding/Logo";

export default function AuthLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base p-4">
      <div className="flex flex-col items-center gap-6">
        <Logo variant="icon" size="lg" priority className="animate-pulse" />
        <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-brand-primary"></div>
        </div>
      </div>
    </div>
  );
}
