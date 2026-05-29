"use client";

import type { GameHud as HudType } from "@/types/game";
import { formatDuration, formatScore } from "@/lib/storage";
import { PauseIcon, RefreshIcon } from "@/components/ui/Icons";

type Props = {
  hud: HudType;
  onPause: () => void;
  onRestart: () => void;
};

export function GameHud({ hud, onPause, onRestart }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="hud" aria-label="Statistik permainan">
        <div className="hud-item"><span>Score</span><strong className="text-primary">{formatScore(hud.score)}</strong></div>
        <div className="hud-item"><span>Level</span><strong>{hud.mode === "endless" ? "∞" : `${hud.level}/${hud.totalLevels}`}</strong></div>
        <div className="hud-item"><span>Mati</span><strong>{hud.deaths}x</strong></div>
        <div className="hud-item"><span>Waktu</span><strong>{formatDuration(hud.durationMs)}</strong></div>
        <div className="hud-item hidden sm:block"><span>Koin</span><strong>{hud.coins}</strong></div>
      </div>
      <div className="flex justify-center gap-2">
        <button className="ghost-button" onClick={onRestart} type="button" aria-label="Restart level">
          <RefreshIcon className="h-5 w-5" /> <span className="hidden sm:inline">Restart</span>
        </button>
        <button className="secondary-button !min-h-11 !px-4" onClick={onPause} type="button" aria-label={hud.paused ? "Lanjutkan game" : "Jeda game"}>
          <PauseIcon className="h-5 w-5" /> {hud.paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}
