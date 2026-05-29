"use client";

import { motion } from "framer-motion";
import type { GameResult } from "@/types/game";
import { formatDuration, formatScore } from "@/lib/storage";
import { shareResult } from "@/lib/share";
import { PlayIcon, ShareIcon, TrophyIcon } from "@/components/ui/Icons";

type Props = {
  result: GameResult;
  isHighScore: boolean;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
  onToast: (message: string) => void;
};

export function ResultModal({ result, isHighScore, onPlayAgain, onLeaderboard, onToast }: Props) {
  async function handleShare() {
    const outcome = await shareResult(result);
    onToast(outcome === "shared" ? "Hasil berhasil dibagikan!" : outcome === "copied" ? "Hasil disalin ke clipboard." : "Gagal membagikan hasil.");
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        initial={{ opacity: 0, scale: .94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="modal-card text-center"
      >
        {isHighScore ? (
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <TrophyIcon className="h-4 w-4" /> High Score Baru!
          </p>
        ) : null}
        <h2 id="result-title" className="display-font mb-2 text-3xl text-primary">{result.title}</h2>
        <p className="mb-7 text-sm leading-6 text-muted">{result.flavorText}</p>
        <div className="mb-7 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">Skor</p>
            <p className="mt-2 text-2xl font-black text-primary">{formatScore(result.score)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">Waktu</p>
            <p className="mt-2 text-2xl font-black">{formatDuration(result.durationMs)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">Level</p>
            <p className="mt-2 text-xl font-black">{result.mode === "endless" ? "Survival" : `${result.completedLevels}/10`}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">Mati</p>
            <p className="mt-2 text-xl font-black">{result.deaths}x</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="primary-button w-full" type="button" onClick={onPlayAgain}><PlayIcon className="h-5 w-5" /> Coba Lagi</button>
          <button className="secondary-button w-full" type="button" onClick={() => void handleShare()}><ShareIcon className="h-5 w-5" /> Share Skor</button>
          <button className="ghost-button sm:col-span-2" type="button" onClick={onLeaderboard}>Lihat Leaderboard Lokal</button>
        </div>
      </motion.section>
    </div>
  );
}
