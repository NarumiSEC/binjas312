import { Resend } from "resend";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendRegistrationConfirmationEmail(params: {
  to: string;
  nama: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!resend || !from) {
    console.warn("[email] RESEND_API_KEY or RESEND_FROM_EMAIL not configured");
    return { ok: false, error: "Email service not configured" };
  }

  const { error } = await resend.emails.send({
    from,
    to: params.to,
    subject: "Konfirmasi Pendaftaran — Binjas 312 Kalahitam",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a2e1a;">
        <div style="background: #1b4332; color: #fff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">BINJAS 312 KALAHITAM</h1>
          <p style="margin: 8px 0 0; font-size: 12px; opacity: 0.9;">Bina Jasmani &amp; Persiapan Seleksi</p>
        </div>
        <div style="padding: 32px 24px; border: 1px solid #d4e4d4; border-top: none;">
          <p>Yth. <strong>${escapeHtml(params.nama)}</strong>,</p>
          <p>Pendaftaran akun Anda telah berhasil dicatat dalam sistem kami.</p>
          <p>Silakan masuk menggunakan <strong>NIK</strong> dan password yang Anda daftarkan, lalu pilih paket pembinaan di dashboard.</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${escapeHtml(appUrl)}/login"
               style="background: #2d6a4f; color: #fff; padding: 12px 28px; text-decoration: none; font-weight: bold;">
              Masuk ke Portal
            </a>
          </p>
          <p style="font-size: 12px; color: #666;">Email ini dikirim otomatis. Mohon tidak membalas.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
