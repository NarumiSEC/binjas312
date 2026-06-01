/**
 * Central env access — avoids MissingSecret and gives clear dev fallbacks.
 */
const DEV_AUTH_SECRET = "binjas-local-dev-only-change-before-production";

export function getAuthSecret(): string {
  if (process.env.AUTH_SECRET?.trim()) {
    return process.env.AUTH_SECRET.trim();
  }
  if (process.env.NODE_ENV === "development") {
    return DEV_AUTH_SECRET;
  }
  throw new Error(
    "AUTH_SECRET wajib diisi. Salin .env.example ke .env.local dan isi AUTH_SECRET.",
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}
