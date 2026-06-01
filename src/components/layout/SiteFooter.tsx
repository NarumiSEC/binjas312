export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-army-700/40 bg-army-950 py-8 text-center text-sm text-army-300">
      <p className="font-semibold tracking-wide text-gold-500/90 uppercase">
        Binjas 312 Kalahitam
      </p>
      <p className="mt-1 text-xs text-army-400">
        Portal resmi pendaftaran bina jasmani — disiplin, kuat, siap.
      </p>
      <p className="mt-4 text-xs text-army-500">
        © {new Date().getFullYear()} Binjas 312 Kalahitam. Seluruh hak cipta
        dilindungi.
      </p>
    </footer>
  );
}
