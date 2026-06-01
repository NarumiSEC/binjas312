import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  isSupabaseConfigured,
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "@/lib/env";

let adminClient: SupabaseClient | null = null;

/**
 * Service-role client — server-only. Never import in Client Components.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Database belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local",
    );
  }

  const url = getSupabaseUrl();
  const key = getSupabaseServiceRoleKey();

  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function tryGetSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
}
