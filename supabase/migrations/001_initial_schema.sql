-- Binjas 312 Kalahitam — Initial schema
-- Run via Supabase SQL Editor or: npm run db:migrate (with DATABASE_URL set)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users: public identifier is UUID only (anti-IDOR)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL CHECK (char_length(trim(nama)) >= 2),
  email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  no_hp TEXT NOT NULL CHECK (no_hp ~ '^[0-9]{10,15}$'),
  nik TEXT NOT NULL UNIQUE CHECK (nik ~ '^[0-9]{16}$'),
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_nik ON users (nik);

-- One registration per user (unique user_id)
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
  paket_id TEXT NOT NULL CHECK (paket_id IN ('paket-1', 'paket-2', 'paket-3')),
  status_pembayaran TEXT NOT NULL DEFAULT 'menunggu'
    CHECK (status_pembayaran IN ('menunggu', 'diproses', 'lunas', 'ditolak')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations (user_id);

-- Row Level Security (defense in depth; app uses service role + server-side ownership checks)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Server actions use service_role key (bypasses RLS)
GRANT ALL ON TABLE users TO service_role;
GRANT ALL ON TABLE registrations TO service_role;

-- Block direct client access via anon/authenticated keys
REVOKE ALL ON users FROM anon, authenticated;
REVOKE ALL ON registrations FROM anon, authenticated;

COMMENT ON TABLE users IS 'Binjas registrants; never expose sequential IDs';
COMMENT ON TABLE registrations IS 'Package selection per user; one row per user';
