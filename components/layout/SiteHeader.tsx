import Link from "next/link";
import { SettingsIcon, TrophyIcon, WarningIcon } from "@/components/ui/Icons";

const links = [
  { href: "/play", label: "Main" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/how-to-play", label: "Cara Main" },
];

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-white/8 bg-bg/70 backdrop-blur-xl">
      <div className="container-game flex min-h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-black" aria-label="Jangan Injak Itu - Beranda">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-bg shadow-[0_0_20px_rgba(255,228,77,.28)]">
            <WarningIcon className="h-6 w-6" />
          </span>
          <span className="display-font hidden text-[15px] leading-tight text-primary xs:block">Jangan<br/>Injak Itu!</span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} className="rounded-xl px-4 py-3 text-sm font-bold text-muted transition hover:bg-white/6 hover:text-white" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/leaderboard" className="ghost-button !min-h-11 !px-3 md:hidden" aria-label="Leaderboard">
            <TrophyIcon className="h-5 w-5" />
          </Link>
          <Link href="/settings" className="ghost-button !min-h-11 !px-3" aria-label="Pengaturan">
            <SettingsIcon className="h-5 w-5" />
          </Link>
          <Link href="/play" className="primary-button !min-h-11 !rounded-xl !px-4 text-sm">
            Main
          </Link>
        </div>
      </div>
    </header>
  );
}
