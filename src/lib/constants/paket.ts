import type { PaketOption } from "@/types";

export const PAKET_OPTIONS: PaketOption[] = [
  {
    id: "paket-1",
    nama: "Paket Khusus Bina Fisik",
    deskripsi:
      "Program pembinaan fisik intensif — ketahanan, kecepatan, dan kekuatan untuk persiapan seleksi.",
    biayaPendaftaran: 250_000,
    biayaBulanan: 100_000,
    highlight: false,
  },
  {
    id: "paket-2",
    nama: "Paket Bina Fisik, Psi, & Akademik",
    deskripsi:
      "Pembinaan fisik, psikologi, dan akademik secara terpadu dalam satu program.",
    biayaPendaftaran: 300_000,
    biayaBulanan: 150_000,
    highlight: true,
  },
];

export function getPaketById(id: string): PaketOption | undefined {
  return PAKET_OPTIONS.find((p) => p.id === id);
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
