import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[min(85vh,720px)] overflow-hidden border-b border-army-700/50">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/hero-binjas.png)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-army-950/95 via-army-950/80 to-army-950/50"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-army-950 via-transparent to-army-950/40"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 min-h-[inherit]">
          <p className="text-xs font-bold tracking-[0.35em] text-gold-500 uppercase">
            Portal Resmi
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Binjas 312{" "}
            <span className="text-gold-400">Kalahitam</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-army-200">
            Program bina jasmani terstruktur untuk mempersiapkan calon peserta
            seleksi dengan standar disiplin, kebugaran, dan mental yang
            terukur — Segera Join Program Bina Jasmani 312 Kalahitam.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pendaftaran"
              className="rounded bg-gold-600 px-6 py-3 text-sm font-bold tracking-widest text-army-950 uppercase hover:bg-gold-500"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/login"
              className="rounded border border-army-500 px-6 py-3 text-sm font-semibold text-army-100 uppercase tracking-wide hover:border-gold-500 hover:text-gold-400"
            >
              Masuk Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-xs font-bold tracking-[0.25em] text-gold-500 uppercase">
          Tentang Program
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-army-200">
          Binjas 312 Kalahitam menyelenggarakan pembinaan fisik, psikologi, dan
          akademik dengan jadwal terjadwal, instruktur berpengalaman, dan
          pemantauan perkembangan peserta melalui dashboard terproteksi.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Bina Fisik",
              desc: "Latihan ketahanan, kecepatan, dan kekuatan sesuai standar seleksi.",
            },
            {
              title: "Bina Psikologi",
              desc: "Pendampingan mental dan manajemen stres saat ujian.",
            },
            {
              title: "Bina Akademik",
              desc: "Penguatan materi tes tertulis dan wawancara terstruktur.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-army-700 bg-army-900/50 p-6"
            >
              <h3 className="font-bold text-gold-400">{item.title}</h3>
              <p className="mt-2 text-sm text-army-300">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
