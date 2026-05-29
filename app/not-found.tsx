import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-game grid min-h-[70svh] place-items-center py-16 text-center">
      <div className="neon-panel max-w-xl p-8 md:p-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[.22em] text-secondary">404 Trap</p>
        <h1 className="display-font mb-4 text-3xl text-primary md:text-5xl">Pintunya Palsu!</h1>
        <p className="mb-8 text-muted">Halaman yang kamu cari sudah kabur. Balik ke menu sebelum lantainya ikut jatuh.</p>
        <Link className="primary-button w-full sm:w-auto" href="/">Kembali ke Menu</Link>
      </div>
    </main>
  );
}
