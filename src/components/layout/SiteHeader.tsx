import Link from "next/link";
import { getSafeSession } from "@/lib/auth/session";

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/lokasi", label: "Lokasi" },
];

export async function SiteHeader() {
  const session = await getSafeSession();

  return (
    <header className="sticky top-0 z-50 border-b border-army-700/30 bg-army-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded border border-gold-500/60 bg-army-800 text-xs font-bold text-gold-400">
            312
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold tracking-widest text-gold-400 uppercase">
              Binjas
            </p>
            <p className="text-sm font-bold text-white">Kalahitam</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-army-100 transition hover:text-gold-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded border border-gold-500/50 bg-army-800 px-3 py-1.5 text-xs font-semibold text-gold-300 uppercase tracking-wide hover:bg-army-700"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded px-3 py-1.5 text-xs font-semibold text-army-100 uppercase tracking-wide hover:text-white sm:inline-block"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded border border-gold-500 bg-gold-600 px-3 py-1.5 text-xs font-bold text-army-950 uppercase tracking-wide hover:bg-gold-500"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
