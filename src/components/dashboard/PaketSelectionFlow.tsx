"use client";

import { useState } from "react";
import type { PaketId } from "@/types";
import { PAKET_OPTIONS, formatRupiah } from "@/lib/constants/paket";
import { biodataSchema } from "@/lib/validations/biodata";
import {
  buildPendaftaranWhatsAppMessage,
  getWhatsAppUrl,
} from "@/lib/whatsapp/message";
import { FormField } from "@/components/ui/FormField";

type Props = {
  defaultNik?: string;
  defaultNama?: string;
};

export function PaketSelectionFlow({ defaultNik = "", defaultNama = "" }: Props) {
  const [step, setStep] = useState<"paket" | "biodata">("paket");
  const [selectedPaket, setSelectedPaket] = useState<PaketId | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handlePilihPaket(id: PaketId) {
    setSelectedPaket(id);
    setStep("biodata");
    setFormError(null);
    setErrors({});
  }

  function handleKirimWa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setErrors({});

    if (!selectedPaket) {
      setFormError("Pilih paket terlebih dahulu.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const raw = {
      nik: form.get("nik"),
      namaLengkap: form.get("namaLengkap"),
      tanggalLahir: form.get("tanggalLahir"),
      riwayatPenyakit: form.get("riwayatPenyakit"),
      namaOrangTua: form.get("namaOrangTua"),
      alamat: form.get("alamat"),
    };

    const parsed = biodataSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const err of parsed.error.errors) {
        const key = err.path[0]?.toString();
        if (key && !fieldErrors[key]) fieldErrors[key] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }

    const message = buildPendaftaranWhatsAppMessage(selectedPaket, {
      nik: parsed.data.nik,
      namaLengkap: parsed.data.namaLengkap,
      tanggalLahir: parsed.data.tanggalLahir,
      riwayatPenyakit: parsed.data.riwayatPenyakit,
      namaOrangTua: parsed.data.namaOrangTua,
      alamat: parsed.data.alamat,
    });

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  if (step === "biodata" && selectedPaket) {
    const paket = PAKET_OPTIONS.find((p) => p.id === selectedPaket)!;

    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => {
            setStep("paket");
            setSelectedPaket(null);
          }}
          className="text-sm text-gold-400 hover:underline"
        >
          ← Kembali pilih paket
        </button>

        <div className="rounded-lg border border-gold-500/40 bg-army-900/60 p-4">
          <p className="text-xs font-bold tracking-widest text-gold-500 uppercase">
            Paket dipilih
          </p>
          <p className="mt-1 font-semibold text-white">{paket.nama}</p>
        </div>

        <form onSubmit={handleKirimWa} className="space-y-4">
          {formError ? (
            <p className="rounded border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
              {formError}
            </p>
          ) : null}

          <FormField
            label="NIK"
            name="nik"
            defaultValue={defaultNik}
            inputMode="numeric"
            maxLength={16}
            required
            placeholder="16 digit"
            error={errors.nik}
          />
          <FormField
            label="Nama Lengkap"
            name="namaLengkap"
            defaultValue={defaultNama}
            required
            error={errors.namaLengkap}
          />
          <FormField
            label="Tanggal Lahir"
            name="tanggalLahir"
            type="date"
            required
            error={errors.tanggalLahir}
          />
          <div className="space-y-1">
            <label
              htmlFor="riwayatPenyakit"
              className="block text-xs font-semibold tracking-wide text-army-200 uppercase"
            >
              Riwayat Penyakit
            </label>
            <textarea
              id="riwayatPenyakit"
              name="riwayatPenyakit"
              rows={3}
              required
              placeholder="Tulis riwayat penyakit atau &quot;Tidak ada&quot;"
              className="w-full rounded border border-army-600 bg-army-950 px-3 py-2.5 text-sm text-white placeholder:text-army-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
            />
            {errors.riwayatPenyakit ? (
              <p className="text-xs text-red-400">{errors.riwayatPenyakit}</p>
            ) : null}
          </div>
          <FormField
            label="Nama Orang Tua"
            name="namaOrangTua"
            required
            error={errors.namaOrangTua}
          />
          <div className="space-y-1">
            <label
              htmlFor="alamat"
              className="block text-xs font-semibold tracking-wide text-army-200 uppercase"
            >
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              rows={3}
              required
              placeholder="Alamat lengkap sesuai KTP"
              className="w-full rounded border border-army-600 bg-army-950 px-3 py-2.5 text-sm text-white placeholder:text-army-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
            />
            {errors.alamat ? (
              <p className="text-xs text-red-400">{errors.alamat}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-[#25D366] py-3 text-sm font-bold tracking-wide text-white uppercase hover:bg-[#20bd5a]"
          >
            <span aria-hidden>📱</span>
            Kirim ke WhatsApp
          </button>
          <p className="text-center text-xs text-army-400">
            Data akan terbuka di WhatsApp admin untuk konfirmasi pendaftaran.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PAKET_OPTIONS.map((paket) => (
        <article
          key={paket.id}
          className={`flex flex-col rounded-lg border bg-army-900/80 p-6 shadow-lg ${
            paket.highlight
              ? "border-gold-500 ring-1 ring-gold-500/30"
              : "border-army-600"
          }`}
        >
          {paket.highlight ? (
            <span className="mb-3 inline-block w-fit rounded bg-gold-600 px-2 py-0.5 text-[10px] font-bold text-army-950 uppercase">
              Lengkap
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
          <button
            type="button"
            onClick={() => handlePilihPaket(paket.id)}
            className="mt-6 w-full rounded border border-gold-500/60 bg-army-800 py-2.5 text-xs font-bold tracking-widest text-gold-300 uppercase transition hover:bg-gold-600 hover:text-army-950"
          >
            Pilih & Isi Biodata
          </button>
        </article>
      ))}
    </div>
  );
}
