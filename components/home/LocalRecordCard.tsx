/* eslint-disable react-hooks/set-state-in-effect -- Local leaderboard is browser-only data hydrated after mount. */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatScore, getScores } from "@/lib/storage";
import type { LocalScoreEntry } from "@/types/game";
import { TrophyIcon } from "@/components/ui/Icons";

export function LocalRecordCard() {
  const [best, setBest] = useState<LocalScoreEntry | undefined>();

  useEffect(() => {
    setBest(getScores("story")[0]);
  }, []);

  return (
    <div className="neon-panel mt-7 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
          <TrophyIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-muted">High Score Lokal</p>
          {best ? (
            <p className="mt-1 font-bold text-white">{best.playerName} <span className="text-primary">{formatScore(best.score)}</span></p>
          ) : (
            <p className="mt-1 text-sm text-muted">Belum ada skor. Kamu bisa jadi yang pertama.</p>
          )}
        </div>
      </div>
      <Link className="secondary-button !min-h-11 text-sm" href="/leaderboard">Lihat Ranking</Link>
    </div>
  );
}
