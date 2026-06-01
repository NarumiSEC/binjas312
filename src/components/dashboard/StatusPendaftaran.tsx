import { getPaketById, formatRupiah } from "@/lib/constants/paket";
import type { RegistrationRecord, UserRecord } from "@/types";

const STATUS_LABEL: Record<string, string> = {
  menunggu: "Menunggu Pembayaran",
  diproses: "Sedang Diproses",
  lunas: "Lunas",
  ditolak: "Ditolak",
};

type Props = {
  user: UserRecord;
  registration: RegistrationRecord;
};

export function StatusPendaftaran({ user, registration }: Props) {
  const paket = getPaketById(registration.paket_id);
  const nextSchedule = "Sabtu, 07:00 WIB — Lapangan Bina Fisik (konfirmasi via admin)";

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gold-500/40 bg-gradient-to-br from-army-900 to-army-950 p-6 md:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
          Status Pendaftaran
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          {user.nama}
        </h2>
        <p className="mt-1 text-sm text-army-300">
          NIK: <span className="font-mono text-army-100">{user.nik}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-army-600 bg-army-900/60 p-5">
          <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Paket Terpilih
          </h3>
          <p className="mt-2 font-semibold text-white">{paket?.nama ?? registration.paket_id}</p>
          {paket ? (
            <ul className="mt-3 space-y-1 text-sm text-army-300">
              <li>Pendaftaran: {formatRupiah(paket.biayaPendaftaran)}</li>
              <li>Bulanan: {formatRupiah(paket.biayaBulanan)}</li>
            </ul>
          ) : null}
        </section>

        <section className="rounded-lg border border-army-600 bg-army-900/60 p-5">
          <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Status Pembayaran
          </h3>
          <p className="mt-2 text-lg font-semibold text-white">
            {STATUS_LABEL[registration.status_pembayaran] ??
              registration.status_pembayaran}
          </p>
          <p className="mt-2 text-xs text-army-400">
            Terdaftar:{" "}
            {new Date(registration.created_at).toLocaleDateString("id-ID", {
              dateStyle: "long",
            })}
          </p>
        </section>
      </div>

      <section className="rounded-lg border border-army-600 bg-army-900/60 p-5">
        <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase">
          Jadwal Berikutnya
        </h3>
        <p className="mt-2 text-white">{nextSchedule}</p>
        <p className="mt-2 text-xs text-army-400">
          Jadwal resmi akan diumumkan melalui dashboard dan kontak WhatsApp
          terdaftar.
        </p>
      </section>
    </div>
  );
}
