/* eslint-disable react-hooks/set-state-in-effect -- Mode-specific localStorage scores are read after hydration. */
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { modes } from "@/lib/game-copy";
import { clearScores, formatDuration, formatScore, getScores } from "@/lib/storage";
import type { GameMode, LocalScoreEntry } from "@/types/game";
import { TrophyIcon } from "@/components/ui/Icons";
import { Toast } from "@/components/ui/Toast";

const validModes: GameMode[] = ["story", "endless", "one-life", "speedrun", "multi"];

export function LeaderboardClient() {
  const query = useSearchParams();
  const queryMode = query.get("mode") as GameMode;
  const [mode, setMode] = useState<GameMode>(validModes.includes(queryMode) ? queryMode : "story");
  const [scores, setScores] = useState<LocalScoreEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => setScores(getScores(mode)), [mode]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const champion = scores[0];
  const selectedMode = useMemo(() => modes.find((item) => item.id === mode), [mode]);

  function resetBoard() {
    const confirmed = window.confirm(`Hapus semua skor mode ${selectedMode?.name ?? mode} di browser ini?`);
    if (!confirmed) return;
    clearScores(mode);
    setScores([]);
    setToast("Leaderboard lokal berhasil direset.");
  }

  return (
    <>
      <main className="container-game py-10 md:py-14">
        <header className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-secondary">Papan skor perangkat ini</p>
            <h1 className="display-font text-3xl text-primary sm:text-5xl">Leaderboard Lokal</h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">Skor hanya tersimpan di browser perangkat kamu. Main gantian di perangkat yang sama untuk menentukan juara lokal.</p>
          </div>
          <Link href={`/play?mode=${mode}`} className="primary-button">Main Mode Ini</Link>
        </header>

        <nav className="mb-7 flex gap-2 overflow-x-auto pb-2" aria-label="Pilih leaderboard mode">
          {modes.map((item) => (
            <button key={item.id} type="button" onClick={() => setMode(item.id)}
              className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm font-bold transition ${mode === item.id ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted hover:text-white"}`}>
              {item.name}
            </button>
          ))}
        </nav>

        {champion ? (
          <section className="neon-panel pixel-panel mb-7 flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/14 text-primary">
                <TrophyIcon className="h-8 w-8" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-muted">Champion · {selectedMode?.name}</p>
                <h2 className="mt-1 text-2xl font-black">{champion.playerName}</h2>
              </div>
            </div>
            <p className="display-font text-3xl text-primary">{formatScore(champion.score)}</p>
          </section>
        ) : null}

        {scores.length === 0 ? (
          <section className="neon-panel grid min-h-72 place-items-center p-8 text-center">
            <div>
              <TrophyIcon className="mx-auto mb-5 h-12 w-12 text-muted" />
              <h2 className="mb-2 text-xl font-black">Belum ada skor.</h2>
              <p className="mb-7 text-muted">Main dulu, nanti nama kamu nongkrong di sini.</p>
              <Link className="primary-button" href={`/play?mode=${mode}`}>Gas Main</Link>
            </div>
          </section>
        ) : (
          <>
            <div className="hidden md:block table-shell neon-panel">
              <table className="score-table">
                <thead><tr><th>Rank</th><th>Nama</th><th>Skor</th><th>Level</th><th>Mati</th><th>Waktu</th><th>Tanggal</th></tr></thead>
                <tbody>
                  {scores.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>#{index + 1}</td>
                      <td className="font-bold">{entry.playerName}</td>
                      <td className="font-black">{formatScore(entry.score)}</td>
                      <td>{entry.mode === "endless" ? "Survival" : `${entry.completedLevels}/10`}</td>
                      <td>{entry.deaths}x</td>
                      <td>{formatDuration(entry.durationMs)}</td>
                      <td>{new Date(entry.createdAt).toLocaleDateString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 md:hidden">
              {scores.map((entry, index) => (
                <article className="neon-panel flex items-center justify-between gap-4 p-4" key={entry.id}>
                  <div className="flex items-center gap-3">
                    <span className={`display-font text-xl ${index === 0 ? "text-primary" : "text-muted"}`}>#{index + 1}</span>
                    <div>
                      <p className="font-black">{entry.playerName}</p>
                      <p className="text-xs text-muted">{entry.mode === "endless" ? "Survival" : `Level ${entry.completedLevels}/10`} · Mati {entry.deaths}x · {formatDuration(entry.durationMs)}</p>
                    </div>
                  </div>
                  <p className="font-black text-primary">{formatScore(entry.score)}</p>
                </article>
              ))}
            </div>
            <button className="danger-button mt-7" type="button" onClick={resetBoard}>Reset Mode Ini</button>
          </>
        )}
      </main>
      <Toast message={toast} />
    </>
  );
}
