import type { BiodataForm } from "@/types";
import { getPaketById } from "@/lib/constants/paket";
import { formatRupiah } from "@/lib/constants/paket";

function formatTanggalLahir(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildPendaftaranWhatsAppMessage(
  paketId: string,
  biodata: BiodataForm,
): string {
  const paket = getPaketById(paketId);
  const lines = [
    "*PENDAFTARAN BINJAS 312 KALAHITAM*",
    "",
    `*Paket:* ${paket?.nama ?? paketId}`,
    paket
      ? `*Biaya Pendaftaran:* ${formatRupiah(paket.biayaPendaftaran)}`
      : "",
    paket ? `*Biaya Bulanan:* ${formatRupiah(paket.biayaBulanan)}` : "",
    "",
    "*BIODATA PESERTA*",
    `*NIK:* ${biodata.nik}`,
    `*Nama Lengkap:* ${biodata.namaLengkap}`,
    `*Tanggal Lahir:* ${formatTanggalLahir(biodata.tanggalLahir)}`,
    `*Riwayat Penyakit:* ${biodata.riwayatPenyakit}`,
    `*Nama Orang Tua:* ${biodata.namaOrangTua}`,
    `*Alamat:* ${biodata.alamat}`,
    "",
    "Mohon konfirmasi pendaftaran saya. Terima kasih.",
  ];
  return lines.filter(Boolean).join("\n");
}

export function getWhatsAppUrl(message: string): string {
  const phone =
    process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER?.replace(/\D/g, "") ??
    "6283148338260";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
