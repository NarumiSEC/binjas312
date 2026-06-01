import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Masuk",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-lg border border-army-600 bg-army-900/80 p-8 shadow-xl">
        <p className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase">
          Portal Peserta
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">Masuk</h1>
        <p className="mt-1 text-sm text-army-400">
          Gunakan NIK dan password yang terdaftar.
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-army-400">Memuat...</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
