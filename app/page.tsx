import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/Logo";
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-base selection:bg-brand-primary selection:text-base-dark">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-base/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo variant="full" size="md" />
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Log in
            </Link>
            <Button asChild className="bg-brand-primary text-base-dark hover:bg-brand-primary/90 rounded-full px-6">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-16 pb-32 sm:px-6 lg:px-8">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-brand-primary/5 blur-[120px]" />
          
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest animate-fade-in">
              <Zap size={14} className="fill-brand-primary" /> AI-Powered Finance OS
            </div>
            
            <h1 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-primary sm:text-7xl lg:text-8xl animate-slide-up">
              Master Your Money with <span className="text-brand-primary">Precision</span>.
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg text-secondary sm:text-xl animate-slide-up [animation-delay:0.1s]">
              The next-generation financial operating system. Realtime tracking, intelligent AI insights, and professional reporting in one seamless dark-mode experience.
            </p>
            
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up [animation-delay:0.2s]">
              <Button asChild size="lg" className="h-14 bg-brand-primary px-8 text-lg font-bold text-base-dark hover:bg-brand-primary/90 rounded-full group">
                <Link href="/register">
                  Start Tracking Free <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 rounded-full">
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Realtime Analytics",
                description: "Watch your cashflow live with professional-grade charts and instant transaction processing."
              },
              {
                icon: Zap,
                title: "Gemini AI Agent",
                description: "Ask your personal AI agent to record transactions, generate reports, or analyze spending patterns."
              },
              {
                icon: Shield,
                title: "Cyberpunk Grade",
                description: "Encrypted data storage and strict privacy controls. Your financial data stays yours."
              }
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-2xl border border-white/5 bg-surface p-8 transition-all hover:border-brand-primary/30 hover:bg-elevated">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-base-dark">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo variant="full" size="sm" />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Duitin. Built for the future of finance.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
