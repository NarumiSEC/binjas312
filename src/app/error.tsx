"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-bold tracking-widest text-gold-500 uppercase">
        Terjadi Kesalahan
      </p>
      <h1 className="mt-2 text-2xl font-bold text-white">
        Mohon maaf, halaman tidak dapat dimuat
      </h1>
      <p className="mt-4 text-sm text-army-300">
        Silakan muat ulang halaman. Jika masalah berlanjut, hubungi admin.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-gold-600 px-5 py-2 text-xs font-bold text-army-950 uppercase"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="rounded border border-army-600 px-5 py-2 text-xs font-semibold text-army-200 uppercase"
        >
          Beranda
        </Link>
      </div>
    </div>
  );
}
