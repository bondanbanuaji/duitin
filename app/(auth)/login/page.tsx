import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke akun Duitin Anda untuk mengelola keuangan.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-brand-secondary hover:text-brand-primary transition-colors">
              Lupa password?
            </Link>
          </div>
          <Input id="password" type="password" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <Button className="w-full bg-brand-primary text-bg-base hover:bg-brand-primary/90 mt-2 font-bold shadow-lg shadow-brand-primary/20">
          Masuk Sekarang
        </Button>
      </form>
      <div className="text-center text-sm text-text-secondary">
        Belum punya akun?{" "}
        <Link href="/register" className="text-brand-primary font-medium hover:underline">
          Daftar di sini
        </Link>
      </div>
    </div>
  );
}
