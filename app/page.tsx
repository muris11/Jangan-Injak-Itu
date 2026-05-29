import type { Metadata } from "next";
import Link from "next/link";
import { HeroCopy } from "@/components/home/HeroCopy";
import { HeroPreview } from "@/components/home/HeroPreview";
import { LocalRecordCard } from "@/components/home/LocalRecordCard";
import { modes, trapShowcase } from "@/lib/game-copy";
import { PlayIcon, TrophyIcon, WarningIcon } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Beranda" };

export default function HomePage() {
  return (
    <main>
      <section className="container-game grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[.94fr_1.06fr] lg:gap-14 lg:pb-24">
        <HeroCopy />
        <div>
          <HeroPreview />
          <LocalRecordCard />
        </div>
      </section>

      <section className="container-game py-14 md:py-20" aria-labelledby="fitur">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-secondary">Kenapa nagih?</p>
          <h2 id="fitur" className="display-font text-3xl leading-tight text-white sm:text-4xl">
            Gagal cepat. Ketawa. Ulang lagi.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Jebakan Absurd", text: "Lantai jatuh, pintu kabur, durian turun, dan kambing yang punya masalah pribadi.", icon: <WarningIcon className="h-7 w-7" /> },
            { title: "High Score Lokal", text: "Skor tersimpan di browser. Cocok dimainkan gantian saat demo atau nongkrong.", icon: <TrophyIcon className="h-7 w-7" /> },
            { title: "Main Instan", text: "Tanpa akun dan tanpa database. Buka link dari HP atau laptop lalu langsung gas.", icon: <PlayIcon className="h-7 w-7" /> },
          ].map((feature) => (
            <article className="neon-panel p-6" key={feature.title}>
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-secondary/10 text-secondary">{feature.icon}</span>
              <h3 className="mb-3 text-xl font-black">{feature.title}</h3>
              <p className="leading-7 text-muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-game py-14 md:py-20" aria-labelledby="trap-heading">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-danger">Daftar pengkhianat</p>
            <h2 id="trap-heading" className="display-font text-3xl sm:text-4xl">Jangan percaya apa pun.</h2>
          </div>
          <Link className="secondary-button text-sm" href="/play">Tes Keberanian</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trapShowcase.map((trap, index) => (
            <article className="neon-panel relative overflow-hidden p-5" key={trap.name}>
              <span className="display-font absolute right-4 top-3 text-4xl text-white/5">{String(index + 1).padStart(2, "0")}</span>
              <span className="mb-5 block h-2 w-14 rounded-full bg-danger shadow-[0_0_15px_rgba(255,59,92,.55)]" />
              <h3 className="mb-2 font-black">{trap.name}</h3>
              <p className="text-sm leading-6 text-muted">{trap.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-game py-14 md:py-20" aria-labelledby="modes-heading">
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[.26em] text-secondary">Pilih kekacauan</p>
        <h2 id="modes-heading" className="display-font mb-10 text-center text-3xl sm:text-4xl">Empat Mode Main</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modes.map((mode) => (
            <Link href={`/play?mode=${mode.id}`} className="neon-panel group flex gap-5 p-6 transition hover:-translate-y-1 hover:border-secondary/40" key={mode.id}>
              <span className="display-font text-3xl text-primary">{mode.label}</span>
              <div>
                <h3 className="mb-2 text-lg font-black group-hover:text-primary">{mode.name}</h3>
                <p className="text-sm leading-6 text-muted">{mode.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-game pb-8 pt-12">
        <div className="neon-panel pixel-panel flex flex-col items-center justify-between gap-7 p-8 text-center md:flex-row md:p-12 md:text-left">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-secondary">Siap dipermainkan lantai?</p>
            <h2 className="display-font max-w-xl text-3xl text-primary md:text-4xl">Nama kamu bisa jadi legenda lokal.</h2>
          </div>
          <Link className="primary-button w-full md:w-auto" href="/play">
            <PlayIcon className="h-5 w-5" /> Gas Main
          </Link>
        </div>
      </section>
    </main>
  );
}
