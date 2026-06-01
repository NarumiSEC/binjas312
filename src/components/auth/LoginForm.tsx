"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormField } from "@/components/ui/FormField";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      nik: form.get("nik"),
      password: form.get("password"),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("NIK atau password salah.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <p className="rounded border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <FormField label="NIK" name="nik" inputMode="numeric" required maxLength={16} autoComplete="username" />
      <FormField label="Password" name="password" type="password" required autoComplete="current-password" />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-gold-600 py-3 text-sm font-bold tracking-widest text-army-950 uppercase hover:bg-gold-500 disabled:opacity-50"
      >
        {pending ? "Memverifikasi..." : "Masuk"}
      </button>

      <p className="text-center text-sm text-army-400">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-gold-400 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}
