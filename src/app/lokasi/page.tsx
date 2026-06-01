export const metadata = { title: "Lokasi" };

export default function LokasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Lokasi</h1>
      <div className="mt-8 rounded-lg border border-army-600 bg-army-900/60 p-6">
        <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase">
          Area Pembinaan
        </h2>
        <p className="mt-3 text-army-200">
          Lapangan Yonif 312 Kalahitam
          <br />
          Markas Batalyon Infanteri 312/Kala Hitam (Yonif 312/KH) berlokasi di Kelurahan Dangdeur, Kecamatan Subang, Kabupaten Subang, Jawa Barat
        </p>
        <p className="mt-4 text-sm text-army-400">
          Datang 15 menit sebelum jadwal. Memakai pakaian olahraga rapi dan
          membawa botol minum pribadi.
        </p>
      </div>
    </div>
  );
}
