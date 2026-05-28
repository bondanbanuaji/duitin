import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Daftar akun Duitin baru untuk mulai mengelola keuangan Anda.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Nama Lengkap</Label>
          <Input id="fullName" type="text" placeholder="Budi Santoso" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <Input id="confirmPassword" type="password" required className="bg-bg-elevated/50 border-border/50 focus-visible:ring-brand-primary" />
        </div>
        <Button className="w-full bg-brand-primary text-bg-base hover:bg-brand-primary/90 mt-2 font-bold shadow-lg shadow-brand-primary/20">
          Daftar Sekarang
        </Button>
      </form>
      <div className="text-center text-sm text-text-secondary">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-brand-primary font-medium hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}
