"use client";

import { useEffect, useState } from "react";
import type { GameHud as HudType } from "@/types/game";
import { formatDuration, formatScore } from "@/lib/storage";
import { PauseIcon, RefreshIcon } from "@/components/ui/Icons";

type Props = {
  hud: HudType;
  onPause: () => void;
  onRestart: () => void;
};

function FullscreenIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8V3h5" />
      <path d="M21 8V3h-5" />
      <path d="M3 16v5h5" />
      <path d="M21 16v5h-5" />
    </svg>
  );
}

export function GameHud({ hud, onPause, onRestart }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

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
        <button className="ghost-button" onClick={toggleFullscreen} type="button" aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          <FullscreenIcon active={isFullscreen} />
        </button>
        <button className="secondary-button !min-h-11 !px-4" onClick={onPause} type="button" aria-label={hud.paused ? "Lanjutkan game" : "Jeda game"}>
          <PauseIcon className="h-5 w-5" /> {hud.paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}
