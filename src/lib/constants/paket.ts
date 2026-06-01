import type { PaketOption } from "@/types";

export const PAKET_OPTIONS: PaketOption[] = [
  {
    id: "paket-1",
    nama: "Paket 1: Khusus Bina Fisik",
    deskripsi: "Program pembinaan fisik intensif untuk persiapan seleksi.",
    biayaPendaftaran: 250_000,
    biayaBulanan: 100_000,
  },
  {
    id: "paket-2",
    nama: "Paket 2: Bina Fisik, Psi, & Akademik",
    deskripsi: "Pembinaan fisik, psikologi, dan akademik — 1x pertemuan/minggu.",
    biayaPendaftaran: 300_000,
    biayaBulanan: 150_000,
    pertemuanPerMinggu: 1,
  },
  {
    id: "paket-3",
    nama: "Paket 3: Bina Fisik, Psi, & Akademik",
    deskripsi: "Pembinaan fisik, psikologi, dan akademik — 2x pertemuan/minggu.",
    biayaPendaftaran: 350_000,
    biayaBulanan: 175_000,
    pertemuanPerMinggu: 2,
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
