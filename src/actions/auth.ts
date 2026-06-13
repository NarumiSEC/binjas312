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
        "Database belum dikonfigurasi di server. Isi SUPABASE_SERVICE_ROLE_KEY di Vercel lalu Redeploy.",
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

  try {
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
      if (error.code === "23514") {
        return {
          success: false,
          error:
            "Format data tidak valid. NIK 16 digit angka, HP 10–15 digit angka, email valid.",
        };
      }
      if (error.code === "PGRST205" || error.message?.includes("schema cache")) {
        return {
          success: false,
          error:
            "Tabel database belum dibuat. Jalankan migrasi SQL di Supabase.",
        };
      }
      if (
        error.code === "42501" ||
        error.message?.includes("Invalid API key") ||
        error.message?.includes("JWT")
      ) {
        return {
          success: false,
          error:
            "API key Supabase salah. Di Vercel pakai service_role (bukan anon key).",
        };
      }
      console.error("[register]", error);
      return {
        success: false,
        error: `Pendaftaran gagal (${error.code ?? "error"}). Hubungi admin.`,
      };
    }
  } catch (e) {
    console.error("[register] unexpected", e);
    const msg = e instanceof Error ? e.message : "unknown";
    if (msg.includes("Missing Supabase") || msg.includes("dikonfigurasi")) {
      return {
        success: false,
        error:
          "Database belum terhubung di Vercel. Isi SUPABASE_SERVICE_ROLE_KEY lalu Redeploy.",
      };
    }
    return {
      success: false,
      error: `Pendaftaran gagal: ${msg.slice(0, 120)}`,
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
