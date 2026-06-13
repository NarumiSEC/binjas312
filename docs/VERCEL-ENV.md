# Environment Variables — Vercel (Production)

Setelah mengisi variabel, wajib **Redeploy** (Deployments → ⋮ → Redeploy).

## Wajib

| Variable | Nilai contoh |
|----------|----------------|
| `NEXT_PUBLIC_APP_URL` | `https://binjas312.vercel.app` |
| `AUTH_URL` | `https://binjas312.vercel.app` |
| `AUTH_SECRET` | sama seperti di `.env.local` |
| `AUTH_TRUST_HOST` | `true` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key dari Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** key (bukan anon!) |

## Penting

- `SUPABASE_SERVICE_ROLE_KEY` **tanpa** prefix `NEXT_PUBLIC_`
- Centang environment: **Production**, **Preview**, **Development**
- Jangan pakai `http://localhost:3000` untuk `AUTH_URL` / `NEXT_PUBLIC_APP_URL` di production

| `NEXT_PUBLIC_WA_ADMIN_NUMBER` | `6283148338260` (nomor admin WA) |

## Opsional

| Variable | Catatan |
|----------|---------|
| `RESEND_API_KEY` | Email konfirmasi |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` untuk tes |
| `UPSTASH_REDIS_REST_URL` | Rate limit (kalau token salah, pendaftaran tetap jalan) |
| `UPSTASH_REDIS_REST_TOKEN` | |

## Cek database

Migrasi SQL harus sudah di-run di Supabase (tabel `users`). Lihat `docs/SUPABASE-MIGRASI.md`.
