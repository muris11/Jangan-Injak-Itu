import Link from "next/link";
import { WarningIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/8 py-8">
      <div className="container-game flex flex-col justify-between gap-5 text-sm text-muted sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-semibold">
          <WarningIcon className="h-5 w-5 text-primary" />
          Jangan Injak Itu! — High score tersimpan lokal di browser.
        </div>
        <div className="flex flex-wrap gap-5">
          <Link className="hover:text-white" href="/play">Main</Link>
          <Link className="hover:text-white" href="/leaderboard">Leaderboard</Link>
          <Link className="hover:text-white" href="/how-to-play">Cara Main</Link>
          <Link className="hover:text-white" href="/settings">Settings</Link>
        </div>
      </div>
    </footer>
  );
}
