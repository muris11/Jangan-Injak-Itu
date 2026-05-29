"use client";

import { useEffect, useRef } from "react";
import type { Character, GameHud, GameMode, GameResult, GameSettings, PlayerSync } from "@/types/game";
import type { MultiplayerScene } from "@/game/multiplayer-scene";

type Props = {
  playerName: string;
  character: Character;
  mode: GameMode;
  settings: GameSettings;
  runId: number;
  onHud: (hud: GameHud) => void;
  onFinish: (result: GameResult) => void;
  onMessage: (message: string) => void;
  playerId?: string;
  syncs?: PlayerSync[];
  sendSync?: (sync: Partial<PlayerSync>) => void;
};

export function GameCanvas({ playerName, character, mode, settings, runId, onHud, onFinish, onMessage, playerId, syncs, sendSync }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    let alive = true;

    async function boot() {
      if (!alive || !host.current) return;

      if (mode === "multi") {
        const { createMultiplayerGame } = await import("@/game/create-game");
        gameRef.current = await createMultiplayerGame({
          parent: host.current,
          playerName,
          character,
          mode,
          settings,
          callbacks: { onHud, onFinish, onMessage },
          playerId: playerId ?? "",
          sendSync: sendSync ?? (() => {}),
        });
      } else {
        const { createArcadeGame } = await import("@/game/create-game");
        gameRef.current = createArcadeGame({
          parent: host.current,
          playerName,
          character,
          mode,
          settings,
          callbacks: { onHud, onFinish, onMessage },
        });
      }
    }
    void boot();
 
     return () => {
       alive = false;
       gameRef.current?.destroy(true);
       gameRef.current = null;
     };
   }, [playerName, character, mode, settings, runId, onHud, onFinish, onMessage, playerId, sendSync]);

  useEffect(() => {
    if (mode !== "multi" || !gameRef.current || !syncs) return;
    const scene = gameRef.current.scene.getAt(0) as import("@/game/multiplayer-scene").MultiplayerScene | undefined;
    if (scene?.updateOtherPlayers) {
      scene.onPlayersSync(syncs);
      scene.updateOtherPlayers(syncs);
    }
  }, [mode, syncs]);

  return <div ref={host} className="game-canvas-host h-full w-full touch-none" aria-label="Area permainan Jangan Injak Itu!" />;
}
