import type { Metadata } from "next";
import Link from "next/link";
import { modes } from "@/lib/game-copy";

export const metadata: Metadata = { title: "Cara Main" };

const controls = [
  { key: "A / ←", use: "Bergerak ke kiri" },
  { key: "D / →", use: "Bergerak ke kanan" },
  { key: "W / Space", use: "Lompat" },
  { key: "P", use: "Pause / Resume" },
  { key: "R", use: "Restart level" },
  { key: "M", use: "Mute saat bermain" },
];

const scoring = [
  ["Selesaikan level", "+1.000"],
  ["Ambil koin", "+100"],
  ["Cepat selesai", "hingga +500"],
  ["Tidak mati satu level", "+500"],
  ["Selesaikan seluruh Story", "+2.000"],
  ["Mati karena jebakan", "-150"],
  ["Restart manual", "-100"],
];

export default function HowToPlayPage() {
  return (
    <main className="container-game py-10 md:py-14">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-secondary">Manual bertahan hidup</p>
        <h1 className="display-font text-3xl text-primary sm:text-5xl">Cara Main</h1>
        <p className="mt-5 text-lg leading-8 text-muted">Tujuanmu sederhana: sampai ke pintu finish yang asli. Masalahnya, jangan terlalu percaya lantai, pintu, koin, atau tulisan “aman”.</p>
        <Link className="primary-button mt-8 w-full sm:w-auto" href="/play">Main Sekarang</Link>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="neon-panel p-6 sm:p-8">
          <h2 className="display-font mb-6 text-2xl text-white">Kontrol Desktop</h2>
          <div className="grid gap-3">
            {controls.map((control) => (
              <div key={control.key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <kbd className="rounded-lg border border-secondary/32 bg-secondary/8 px-3 py-2 font-black text-secondary">{control.key}</kbd>
                <span className="text-sm font-semibold text-muted">{control.use}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-lg font-black">Kontrol Mobile</h3>
          <p className="leading-7 text-muted">Di HP, gunakan tombol kiri dan kanan pada sisi bawah layar serta tombol <strong className="text-primary">JUMP</strong> besar di kanan. Tombol otomatis hanya muncul pada perangkat touch.</p>
        </section>

        <section className="neon-panel p-6 sm:p-8">
          <h2 className="display-font mb-6 text-2xl text-white">Sistem Skor</h2>
          <div className="grid gap-3">
            {scoring.map(([action, value]) => (
              <div key={action} className="flex items-center justify-between border-b border-white/8 pb-3 text-sm">
                <span className="text-muted">{action}</span>
                <strong className={value.startsWith("+") ? "text-success" : "text-danger"}>{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/8 p-5">
            <p className="mb-2 font-black text-primary">Tips kemenangan</p>
            <p className="text-sm leading-7 text-muted">Level pertama mengajarkan aturan terpenting: setelah terkena jebakan, ingat posisinya. Game ini sengaja curang sekali, tetapi tetap bisa ditamatkan setelah kamu membaca polanya.</p>
          </div>
        </section>
      </div>

      <section className="mt-5 neon-panel p-6 sm:p-8">
        <h2 className="display-font mb-7 text-2xl">Mode Game</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modes.map((mode) => (
            <article key={mode.id} className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
              <div className="mb-3 flex justify-between gap-3">
                <h3 className="font-black">{mode.name}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{mode.label}</span>
              </div>
              <p className="text-sm leading-6 text-muted">{mode.description}</p>
              <Link className="mt-5 inline-flex text-sm font-black text-secondary hover:text-white" href={`/play?mode=${mode.id}`}>Mainkan mode ini →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-secondary/20 bg-secondary/[.05] p-6 text-sm leading-7 text-muted">
        <strong className="text-white">Tentang penyimpanan skor:</strong> Game ini tidak menggunakan login atau database. Nama, settings, dan leaderboard disimpan secara lokal di browser perangkat yang kamu gunakan. Menghapus data browser akan menghapus high score tersebut.
      </section>
    </main>
  );
}
