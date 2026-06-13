import { PaketSelectionFlow } from "@/components/dashboard/PaketSelectionFlow";

export const metadata = {
  title: "Pendaftaran Paket",
};

export default function PendaftaranPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
        Pendaftaran Program
      </p>
      <h1 className="mt-2 text-3xl font-bold text-white">Pilih Paket & Biodata</h1>
      <p className="mt-3 text-army-300">
        Pilih paket pembinaan, lengkapi biodata, lalu kirim langsung ke admin
        via WhatsApp untuk konfirmasi.
      </p>
      <div className="mt-10">
        <PaketSelectionFlow />
      </div>
    </div>
  );
}
