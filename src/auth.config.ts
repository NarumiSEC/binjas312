import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        token.nik = (user as { nik?: string }).nik;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.nik = token.nik as string | undefined;
      }
      return session;
    },
  },
  providers: [],
  // Dev: trust localhost. Production: set AUTH_TRUST_HOST=true on Vercel.
  trustHost:
    process.env.NODE_ENV === "development" ||
    process.env.AUTH_TRUST_HOST === "true",
} satisfies NextAuthConfig;
