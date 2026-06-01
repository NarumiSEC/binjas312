export const metadata = { title: "Jadwal" };

const JADWAL = [
  { hari: "Senin - Rabu", waktu: "15.00 – 17.30", kegiatan: "Bina Fisik (Inti)" },
  { hari: "Selasa", waktu: "15.00 – 19.30", kegiatan: "Bina Psikologi & Bina Fisik" },
  { hari: "Kamis", waktu: "15.30 – 19:00", kegiatan: "Bina Akademik & Bina Fisik" },
  { hari: "Sabtu", waktu: "06.30 – 12.00", kegiatan: "Tes Simulasi & Evaluasi" },
];

export default function JadwalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Jadwal Pembinaan</h1>
      <p className="mt-2 text-army-300">
        Berikut Jadwal Binjas 312 Kalahitam, Disiplin Waktu & Kegiatan.
      </p>
      <ul className="mt-8 divide-y divide-army-700 rounded-lg border border-army-600">
        {JADWAL.map((row) => (
          <li key={row.hari} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between">
            <span className="font-semibold text-gold-400">{row.hari}</span>
            <span className="text-sm text-army-200">{row.waktu}</span>
            <span className="text-sm text-army-400">{row.kegiatan}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
