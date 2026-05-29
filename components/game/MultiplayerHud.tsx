"use client";

import type { MultiplayerRanking, PlayerSync } from "@/types/game";

type Props = {
  players: PlayerSync[];
  rankings: MultiplayerRanking[] | null;
  playerId: string | null;
};

export default function MultiplayerHud({ players, rankings, playerId }: Props) {
  if (rankings && rankings.length > 0) {
    const sorted = [...rankings].sort((a, b) => a.finishOrder - b.finishOrder);
    return (
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-1 min-w-48">
        <div className="bg-black/70 rounded px-3 py-2">
          <p className="text-orange-400 font-bold text-xs mb-1">Peringkat Akhir</p>
          {sorted.map((r, i) => (
            <div
              key={r.id}
              className={`flex items-center justify-between text-xs py-0.5 ${
                r.id === playerId ? "text-orange-300 font-bold" : "text-white"
              }`}
            >
              <span>
                {i + 1}. {r.name}
              </span>
              <span className="text-gray-400">{(r.time / 1000).toFixed(1)}s</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const alive = players.filter((p) => p.alive).length;
  const total = players.length;

  return (
    <div className="absolute top-2 right-2 z-50">
      <div className="bg-black/70 rounded px-3 py-1.5 text-white text-xs">
        Hidup: {alive}/{total}
      </div>
    </div>
  );
}
