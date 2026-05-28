import { NextResponse } from "next/server";
import { processAiMessage } from "@/lib/gemini/agent";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, history = [] } = await req.json();

    if (!process.env.GEMINI_API_KEY && !req.headers.get("x-gemini-key")) {
      return NextResponse.json(
        { error: "API Key Gemini belum dikonfigurasi. Silakan atur di Pengaturan." },
        { status: 400 }
      );
    }

    const result = await processAiMessage(message, user.id, history);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghubungi Duitin AI." },
      { status: 500 }
    );
  }
}
