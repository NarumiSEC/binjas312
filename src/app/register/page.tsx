import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Pendaftaran",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-lg border border-army-600 bg-army-900/80 p-8 shadow-xl">
        <p className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
          Pendaftaran Baru
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">Daftar Akun</h1>
        <p className="mt-1 text-sm text-army-400">
          Lengkapi data diri Anda dengan benar sesuai KTP.
        </p>
        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
