"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { paketSelectionSchema } from "@/lib/validations/auth";
import { getSupabaseAdmin } from "@/lib/db/supabase-admin";
import { isSupabaseConfigured } from "@/lib/env";
import type { ActionResult } from "@/actions/auth";

/**
 * Anti-IDOR: session user id must match resource owner; no public user UUID in URL.
 */
export async function selectPaket(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, error: "Sesi tidak valid. Silakan masuk kembali." };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Database belum dikonfigurasi. Periksa .env.local",
    };
  }

  const parsed = paketSelectionSchema.safeParse({
    paketId: formData.get("paketId"),
  });
  if (!parsed.success) {
    return { success: false, error: "Paket tidak valid." };
  }

  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("registrations")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      error: "Anda sudah memilih paket. Hubungi admin untuk perubahan.",
    };
  }

  const { error } = await supabase.from("registrations").insert({
    user_id: userId,
    paket_id: parsed.data.paketId,
    status_pembayaran: "menunggu",
  });

  if (error) {
    console.error("[selectPaket]", error);
    return { success: false, error: "Gagal menyimpan paket." };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Paket berhasil dipilih." };
}

export async function getDashboardDataForSession() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const supabase = getSupabaseAdmin();

  const { data: user } = await supabase
    .from("users")
    .select("id, nama, email, no_hp, nik, email_verified, created_at")
    .eq("id", userId)
    .single();

  if (!user) return null;

  const { data: registration } = await supabase
    .from("registrations")
    .select("id, paket_id, status_pembayaran, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  return { user, registration };
}
