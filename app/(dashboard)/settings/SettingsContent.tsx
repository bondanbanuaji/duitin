"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogOut, Save, ShieldAlert, KeyRound } from "lucide-react";

export function SettingsContent() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-[#E6EDF3]">System Configuration</h1>
        <p className="text-[#8B949E]">Atur preferensi aplikasi dan profil akun kamu.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#0D1117] border border-[#222] p-6 rounded-xl flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg border-b border-[#222] pb-2 text-[#E6EDF3]">Profil Pengguna</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue="Pengguna Duitin" className="bg-[#161B22] border-[#222] focus-visible:ring-[#00E5C3]" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@duitin.app" disabled className="bg-[#161B22]/50 border-[#222] text-[#484F58]" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#00E5C3] text-[#080B10] hover:bg-[#00E5C3]/90 font-bold">
                <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
              </Button>
            </div>
          </div>

          <div className="bg-[#0D1117] border border-[#222] p-6 rounded-xl flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg border-b border-[#222] pb-2 flex items-center gap-2 text-[#E6EDF3]">
              <KeyRound className="h-5 w-5 text-[#7C3AED]" /> Integrasi AI (Gemini)
            </h3>
            <p className="text-sm text-[#8B949E]">
              Duitin menggunakan Google Gemini API untuk fitur AI Assistant. Jika kamu memiliki API Key sendiri, kamu bisa memasukkannya di sini.
            </p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="apiKey">Google Gemini API Key</Label>
              <Input id="apiKey" type="password" placeholder="AIzaSy..." className="bg-[#161B22] border-[#222] focus-visible:ring-[#7C3AED]" />
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/10">
                Simpan API Key
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#0D1117] border border-[#222] p-6 rounded-xl flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg border-b border-[#222] pb-2 text-[#E6EDF3]">Preferensi</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm text-[#E6EDF3]">Tema Tampilan</span>
                <span className="text-xs text-[#8B949E]">Pilih mode gelap atau terang</span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="bg-[#0D1117] border border-[#FF3B5C]/20 p-6 rounded-xl flex flex-col gap-6 border-dashed border-2">
            <h3 className="font-heading font-semibold text-lg border-b border-[#FF3B5C]/20 pb-2 text-[#FF3B5C] flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Zona Berbahaya
            </h3>
            <Button variant="outline" className="w-full border-[#222] hover:bg-[#161B22] justify-start text-[#8B949E] hover:text-[#E6EDF3]">
              <LogOut className="mr-2 h-4 w-4" /> Keluar dari Akun
            </Button>
            <Button variant="outline" className="w-full border-[#FF3B5C]/30 text-[#FF3B5C] hover:bg-[#FF3B5C]/10 justify-start">
              Hapus Semua Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
