"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser, type ActionResult } from "@/actions/auth";
import { FormField } from "@/components/ui/FormField";

const initial: ActionResult | null = null;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state?.success === false ? (
        <p className="rounded border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded border border-green-800/50 bg-green-950/50 px-4 py-3 text-sm text-green-300" role="status">
          {state.message}{" "}
          <Link href="/login" className="font-semibold text-gold-400 underline">
            Masuk sekarang
          </Link>
        </p>
      ) : null}

      <FormField label="Nama Lengkap" name="nama" required autoComplete="name" />
      <FormField label="Email" name="email" type="email" required autoComplete="email" />
      <FormField label="No. HP" name="no_hp" inputMode="numeric" required autoComplete="tel" placeholder="08xxxxxxxxxx" />
      <FormField label="NIK" name="nik" inputMode="numeric" required maxLength={16} placeholder="16 digit" />
      <FormField label="Password" name="password" type="password" required autoComplete="new-password" />

      <button
        type="submit"
        disabled={pending || state?.success === true}
        className="w-full rounded bg-gold-600 py-3 text-sm font-bold tracking-widest text-army-950 uppercase hover:bg-gold-500 disabled:opacity-50"
      >
        {pending ? "Mendaftarkan..." : "Daftar Sekarang"}
      </button>
    </form>
  );
}
