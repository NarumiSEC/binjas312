"use server";

import { registerSchema } from "@/lib/validations/auth";
import { sanitizeEmail, sanitizeText } from "@/lib/security/sanitize";
import { hashPassword } from "@/lib/auth/password";
import { getSupabaseAdmin } from "@/lib/db/supabase-admin";
import { isSupabaseConfigured } from "@/lib/env";
import { sendRegistrationConfirmationEmail } from "@/lib/email/send-registration-email";

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function registerUser(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    nama: formData.get("nama"),
    email: formData.get("email"),
    no_hp: formData.get("no_hp"),
    nik: formData.get("nik"),
    password: formData.get("password"),
  };

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error:
        "Database belum dikonfigurasi. Hubungi admin atau periksa file .env.local",
    };
  }

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Data tidak valid";
    return { success: false, error: first };
  }

  const data = {
    nama: sanitizeText(parsed.data.nama),
    email: sanitizeEmail(parsed.data.email),
    no_hp: sanitizeText(parsed.data.no_hp),
    nik: sanitizeText(parsed.data.nik),
    password: parsed.data.password,
  };

  const supabase = getSupabaseAdmin();
  const password_hash = await hashPassword(data.password);

  const { error } = await supabase.from("users").insert({
    nama: data.nama,
    email: data.email,
    no_hp: data.no_hp,
    nik: data.nik,
    password_hash,
    email_verified: false,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "Email atau NIK sudah terdaftar.",
      };
    }
    if (error.code === "PGRST205" || error.message?.includes("schema cache")) {
      return {
        success: false,
        error:
          "Tabel database belum dibuat. Admin harus menjalankan migrasi SQL di Supabase (lihat docs/SETUP.md).",
      };
    }
    if (error.code === "42501") {
      return {
        success: false,
        error: "Akses database ditolak. Periksa SUPABASE_SERVICE_ROLE_KEY di .env.local.",
      };
    }
    console.error("[register]", error);
    const devHint =
      process.env.NODE_ENV === "development" ? ` (${error.code}: ${error.message})` : "";
    return {
      success: false,
      error: `Pendaftaran gagal. Silakan coba lagi.${devHint}`,
    };
  }

  void sendRegistrationConfirmationEmail({
    to: data.email,
    nama: data.nama,
  });

  return {
    success: true,
    message:
      "Pendaftaran berhasil. Periksa email Anda dan masuk dengan NIK serta password.",
  };
}
