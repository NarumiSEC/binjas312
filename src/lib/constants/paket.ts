import type { PaketId } from "@/types";

export const PAKET_OPTIONS = [
  {
    id: "paket-1" as PaketId,
    nama: "Paket Khusus Bina Fisik",
    deskripsi:
      "Program pembinaan fisik intensif — ketahanan, kecepatan, dan kekuatan untuk persiapan seleksi.",
    biayaPendaftaran: 250_000,
    biayaBulanan: 100_000,
  },
  {
    id: "paket-2" as PaketId,
    nama: "Paket Bina Fisik, Psi, & Akademik",
    deskripsi:
      "Pembinaan fisik, psikologi, dan akademik secara terpadu dalam satu program.",
    biayaPendaftaran: 300_000,
    biayaBulanan: 150_000,
    highlight: true,
  },
] as const;

export function getPaketById(id: string) {
  return PAKET_OPTIONS.find((p) => p.id === id);
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
