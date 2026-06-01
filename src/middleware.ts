import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import { checkAuthRateLimit } from "@/lib/security/rate-limit";

const PROTECTED_PREFIXES = ["/dashboard"];

const { auth } = NextAuth(authConfig);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function shouldRateLimit(request: NextRequest): boolean {
  if (request.method !== "POST") return false;
  const { pathname } = request.nextUrl;
  const isServerAction = request.headers.has("next-action");
  return (
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/register" ||
    (isServerAction && pathname === "/register")
  );
}

export default auth(async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (shouldRateLimit(request)) {
    const ip = getClientIp(request);
    const key = `${ip}:${pathname}`;
    const { success, remaining } = await checkAuthRateLimit(key);
    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi dalam satu menit." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Remaining": String(remaining),
          },
        },
      );
    }
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const session = request.auth;

  const userId =
    session?.user?.id ??
    (session?.user as { id?: string } | undefined)?.id;
  if (isProtected && !userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    (pathname === "/login" || pathname === "/register") &&
    userId
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
