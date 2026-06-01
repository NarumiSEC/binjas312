import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { loginSchema } from "@/lib/validations/auth";
import { tryGetSupabaseAdmin } from "@/lib/db/supabase-admin";
import { verifyPassword } from "@/lib/auth/password";
import { sanitizeText } from "@/lib/security/sanitize";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "NIK",
      credentials: {
        nik: { label: "NIK", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const nik = sanitizeText(parsed.data.nik);
        const supabase = tryGetSupabaseAdmin();
        if (!supabase) return null;

        const { data: user, error } = await supabase
          .from("users")
          .select("id, nama, email, nik, password_hash, email_verified")
          .eq("nik", nik)
          .maybeSingle();

        if (error || !user) return null;

        const valid = await verifyPassword(
          parsed.data.password,
          user.password_hash,
        );
        if (!valid) return null;

        return {
          id: user.id,
          name: user.nama,
          email: user.email,
          nik: user.nik,
          emailVerified: user.email_verified,
        };
      },
    }),
  ],
});
