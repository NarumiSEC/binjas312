# Binjas 312 Kalahitam — Portal Pendaftaran

Portal pendaftaran bina jasmani dengan Next.js 16 (App Router), Tailwind CSS 4, TypeScript, Supabase, dan NextAuth.js.

## Quick start

1. `cp .env.example .env.local` and fill in values
2. Run SQL in `supabase/migrations/001_initial_schema.sql` (Supabase SQL Editor)
3. `npm install && npm run dev`

Full guide: **[docs/SETUP.md](docs/SETUP.md)**

## Vercel

Copy variables from `.env.example` into the Vercel dashboard. Set `NEXT_PUBLIC_APP_URL` and `AUTH_URL` to your production URL. Configure Upstash Redis for rate limiting in production.
# binjas312
