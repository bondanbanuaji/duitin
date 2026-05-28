import { Logo } from "@/components/branding/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080B10] text-[#E6EDF3] flex items-center justify-center relative overflow-hidden p-4">
      {/* Cinematic background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_#00E5C315,_transparent_70%)] z-0" />
      
      <div className="w-full max-w-md relative z-10 bg-[#0D1117]/80 backdrop-blur-xl p-8 rounded-2xl border border-[#222] shadow-2xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo variant="full" size="lg" className="mb-4" />
          <p className="text-[#8B949E] font-medium text-sm">Fintech-grade financial operating system.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
