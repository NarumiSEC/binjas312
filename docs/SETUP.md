# Binjas 312 Kalahitam — Implementation Guide

## 1. Required packages

Already listed in `package.json`. Install:

```bash
npm install
```

| Package | Purpose |
|---------|---------|
| `next`, `react`, `react-dom` | App framework |
| `next-auth@beta` | Auth.js v5 — NIK login, JWT, secure cookies |
| `@supabase/supabase-js`, `@supabase/ssr` | PostgreSQL via Supabase |
| `zod` | Server-side input validation |
| `bcryptjs` | Password hashing (cost 12) |
| `resend` | Registration confirmation email |
| `@upstash/ratelimit`, `@upstash/redis` | Token bucket rate limit (prod) |

---

## 2. Directory structure

```
binjas/
├── .env.example                 # Template for local & Vercel env vars
├── docs/
│   └── SETUP.md                 # This guide
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── scripts/
│   └── run-migration.mjs
├── public/
├── src/
│   ├── middleware.ts            # Auth guard + rate limit + security headers
│   ├── auth.ts                  # NextAuth config (NIK credentials)
│   ├── actions/
│   │   ├── auth.ts              # registerUser server action
│   │   └── registration.ts      # selectPaket + dashboard data (IDOR-safe)
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── jadwal/page.tsx
│   │   ├── lokasi/page.tsx
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth/password.ts
│   │   ├── constants/paket.ts
│   │   ├── db/supabase-admin.ts
│   │   ├── email/send-registration-email.ts
│   │   ├── security/{sanitize,rate-limit}.ts
│   │   └── validations/auth.ts
│   └── types/
├── next.config.ts
└── package.json
```

---

## 3. Environment setup (local)

```bash
cp .env.example .env.local
```

Fill every value in `.env.local`. Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Use output for `AUTH_SECRET`.

---

## 4. Vercel deployment — environment variables

In **Vercel → Project → Settings → Environment Variables**, add:

| Variable | Environments | Notes |
|----------|--------------|-------|
| `NEXT_PUBLIC_APP_URL` | Production | `https://your-domain.vercel.app` |
| `AUTH_SECRET` | All | Same as local, unique per project |
| `AUTH_URL` | Production | Same as `NEXT_PUBLIC_APP_URL` |
| `AUTH_TRUST_HOST` | Production | `true` |
| `NEXT_PUBLIC_SUPABASE_URL` | All | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Anon key (RLS locked down) |
| `SUPABASE_SERVICE_ROLE_KEY` | All | **Secret** — server only |
| `RESEND_API_KEY` | All | Email API |
| `RESEND_FROM_EMAIL` | All | Verified sender |
| `UPSTASH_REDIS_REST_URL` | Production, Preview | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Production, Preview | Rate limiting |

Do **not** expose `SUPABASE_SERVICE_ROLE_KEY` or `AUTH_SECRET` to the client.

Optional: set `DATABASE_URL` only if you run `npm run db:migrate` from CI.

---

## 5. Database

1. Create a [Supabase](https://supabase.com) project.
2. Open **SQL Editor** → paste `supabase/migrations/001_initial_schema.sql` → Run.
3. Copy API keys into `.env.local`.

---

## 6. Security checklist (implemented)

| Threat | Mitigation |
|--------|------------|
| IDOR | UUID PKs only; `user_id` from session on every mutation; no user id in URLs |
| XSS | Zod validation + `sanitizeText`; React escaping; CSP headers |
| CSRF | NextAuth + Server Actions origin checks; `SameSite=Strict` cookies |
| SQLi | Parameterized Supabase client (no raw SQL from user input) |
| DoS | Token bucket 5 req/min on `/api/auth`, `/login`, `/register` POST |

---

## 7. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 8. Deploy to Vercel

```bash
npx vercel
```

Link repo, configure env vars from section 4, deploy. Enable **Upstash** integration or add Redis manually for rate limits.

---

## Next steps (optional)

- Email verification flow + `resend` verification link
- Admin panel with separate role (no service key on client)
- Payment gateway webhook updating `status_pembayaran`
- `jadwal` table in DB instead of static copy
