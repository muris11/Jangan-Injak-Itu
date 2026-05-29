"use client";

import { useState } from "react";
import type { CharacterId } from "@/types/game";

const CHARACTERS: { id: CharacterId; name: string; color: string }[] = [
  { id: "bro", name: "Bro", color: "#e74c3c" },
  { id: "oren", name: "Oren", color: "#f39c12" },
  { id: "ayam", name: "Ayam", color: "#e91e63" },
  { id: "tahu", name: "Tahu", color: "#fffde7" },
  { id: "helm", name: "Helm", color: "#9b59b6" },
];

type Props = {
  name: string;
  character: CharacterId;
  error: string | null;
  room: string | null;
  players: { id: string; name: string; colorIndex: number; ready: boolean }[];
  onName: (name: string) => void;
  onCharacter: (id: CharacterId) => void;
  onCreateRoom: () => void;
  onJoinRoom: (roomCode: string) => void;
  onReady: () => void;
  onStartGame: () => void;
  onDisconnect: () => void;
};

export default function LobbyScreen({ name, character, error, room, players, onName, onCharacter, onCreateRoom, onJoinRoom, onReady, onStartGame, onDisconnect }: Props) {
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreateRoom();
    setJoined(true);
  };

  const handleJoinSubmit = () => {
    if (!name.trim() || !joinCode.trim()) return;
    onJoinRoom(joinCode.trim().toUpperCase());
    setJoined(true);
  };

  const handleCopyCode = async () => {
    if (room) {
      try {
        await navigator.clipboard.writeText(room);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* fallback */ }
    }
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <h2 className="text-2xl font-bold text-white">Multiplayer</h2>
        <p className="text-gray-400 text-sm text-center max-w-xs">
          Buat room baru atau masukkan kode room temanmu!
        </p>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          className="w-64 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-orange-400 outline-none"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => onName(e.target.value)}
          maxLength={16}
        />
        <div className="flex gap-2">
          {CHARACTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => onCharacter(c.id)}
              className={`w-12 h-12 rounded-full border-2 transition-all text-sm font-bold
                ${character === c.id ? "border-white scale-110" : "border-transparent opacity-60"}
              `}
              style={{ backgroundColor: c.color, color: c.id === "tahu" ? "#333" : "#fff" }}
              title={c.name}
            >
              {c.name[0]}
            </button>
          ))}
        </div>

        {!showJoin ? (
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              className="px-6 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-400 transition"
            >
              Buat Room
            </button>
            <button
              onClick={() => setShowJoin(true)}
              className="px-6 py-2 rounded bg-gray-700 text-white font-bold hover:bg-gray-600 transition"
            >
              Masuk Room
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-400 text-xs">Masukkan kode room temanmu</p>
            <input
              className="w-48 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-orange-400 outline-none text-center font-mono tracking-widest uppercase"
              placeholder="ABC12"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              maxLength={5}
              onKeyDown={(e) => { if (e.key === "Enter") handleJoinSubmit(); }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleJoinSubmit}
                className="px-5 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-400 transition"
              >
                Gabung
              </button>
              <button
                onClick={() => setShowJoin(false)}
                className="px-5 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-white">Lobby</h2>

      <div className="flex items-center gap-2">
        <code className="px-3 py-1 rounded bg-gray-800 text-orange-400 font-mono text-lg tracking-widest">
          {room}
        </code>
        <button
          onClick={handleCopyCode}
          className="px-3 py-1 rounded bg-gray-700 text-sm text-white hover:bg-gray-600 transition"
        >
          {copied ? "Tersalin!" : "Salin"}
        </button>
      </div>
      <p className="text-gray-400 text-xs">Bagikan kode ini ke temanmu untuk bergabung</p>

      <div className="w-72 flex flex-col gap-2">
        {players.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 px-3 py-2 rounded bg-gray-800"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: CHARACTERS[p.colorIndex]?.color ?? "#666",
                color: p.colorIndex === 3 ? "#333" : "#fff",
              }}
            >
              {p.name[0]}
            </div>
            <span className="text-white text-sm flex-1 truncate">{p.name}</span>
            {p.ready && <span className="text-green-400 text-xs">Siap</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReady}
          className="px-5 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-500 transition"
        >
          Siap
        </button>
        <button
          onClick={onStartGame}
          className="px-5 py-2 rounded bg-orange-500 text-white font-bold hover:bg-orange-400 transition"
        >
          Mulai
        </button>
        <button
          onClick={onDisconnect}
          className="px-5 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
