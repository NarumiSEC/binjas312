import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { tryGetSupabaseAdmin } from "@/lib/db/supabase-admin";

/** Cek koneksi Supabase di server (Vercel). Buka: /api/health/db */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message:
        "SUPABASE_SERVICE_ROLE_KEY atau NEXT_PUBLIC_SUPABASE_URL kosong di Vercel.",
    });
  }

  const supabase = tryGetSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({
      ok: false,
      configured: true,
      message: "Client Supabase gagal dibuat.",
    });
  }

  const { error } = await supabase.from("users").select("id").limit(1);

  if (error) {
    return NextResponse.json({
      ok: false,
      configured: true,
      code: error.code,
      message: error.message,
    });
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    message: "Database siap. Pendaftaran seharusnya berfungsi.",
  });
}
