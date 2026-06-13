import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { getDashboardDataForSession } from "@/actions/registration";
import { PaketSelectionFlow } from "@/components/dashboard/PaketSelectionFlow";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const data = await getDashboardDataForSession();
  if (!data) {
    redirect("/login");
  }

  const user = data.user;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
            Dashboard Peserta
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Selamat datang, {user.nama}
          </h1>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded border border-army-600 px-4 py-2 text-xs font-semibold text-army-300 uppercase tracking-wide hover:border-red-800 hover:text-red-300"
          >
            Keluar
          </button>
        </form>
      </div>

      <p className="mt-6 text-army-300">
        Pilih paket, isi biodata, lalu kirim ke WhatsApp admin untuk melanjutkan
        pendaftaran.
      </p>

      <div className="mt-8">
        <PaketSelectionFlow defaultNik={user.nik} defaultNama={user.nama} />
      </div>
    </div>
  );
}
