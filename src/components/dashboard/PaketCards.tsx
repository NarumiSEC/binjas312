"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectPaket } from "@/actions/registration";
import type { ActionResult } from "@/actions/auth";
import { PAKET_OPTIONS, formatRupiah } from "@/lib/constants/paket";

const initial: ActionResult | null = null;

export function PaketCards() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(selectPaket, initial);

  useEffect(() => {
    if (state?.success) router.refresh();
  }, [state, router]);

  return (
    <div className="space-y-6">
      {state && !state.success ? (
        <p className="rounded border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded border border-green-800/50 bg-green-950/50 px-4 py-3 text-sm text-green-300">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-3">
        {PAKET_OPTIONS.map((paket, index) => (
          <article
            key={paket.id}
            className={`flex flex-col rounded-lg border bg-army-900/80 p-6 shadow-lg ${
              index === 1
                ? "border-gold-500 ring-1 ring-gold-500/30"
                : "border-army-600"
            }`}
          >
            {index === 1 ? (
              <span className="mb-3 inline-block w-fit rounded bg-gold-600 px-2 py-0.5 text-[10px] font-bold text-army-950 uppercase">
                Direkomendasikan
              </span>
            ) : null}
            <h3 className="text-lg font-bold text-white">{paket.nama}</h3>
            <p className="mt-2 flex-1 text-sm text-army-300">{paket.deskripsi}</p>
            <dl className="mt-4 space-y-2 border-t border-army-700 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-army-400">Pendaftaran</dt>
                <dd className="font-semibold text-gold-400">
                  {formatRupiah(paket.biayaPendaftaran)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-army-400">Bulanan</dt>
                <dd className="font-semibold text-white">
                  {formatRupiah(paket.biayaBulanan)}
                </dd>
              </div>
            </dl>
            <form action={formAction} className="mt-6">
              <input type="hidden" name="paketId" value={paket.id} />
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded border border-gold-500/60 bg-army-800 py-2.5 text-xs font-bold tracking-widest text-gold-300 uppercase transition hover:bg-gold-600 hover:text-army-950 disabled:opacity-50"
              >
                {pending ? "Memproses..." : "Pilih Paket"}
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
