import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { getDashboardDataForSession } from "@/actions/registration";
import { PaketCards } from "@/components/dashboard/PaketCards";
import { StatusPendaftaran } from "@/components/dashboard/StatusPendaftaran";
import type { RegistrationRecord, UserRecord } from "@/types";

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

  const user = data.user as UserRecord;
  const registration = data.registration as RegistrationRecord | null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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

      <div className="mt-10">
        {registration ? (
          <StatusPendaftaran user={user} registration={registration} />
        ) : (
          <>
            <p className="mb-6 text-army-300">
              Pilih salah satu paket pembinaan di bawah ini untuk melanjutkan
              pendaftaran.
            </p>
            <PaketCards />
          </>
        )}
      </div>
    </div>
  );
}
