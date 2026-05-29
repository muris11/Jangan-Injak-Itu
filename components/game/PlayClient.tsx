/* eslint-disable react-hooks/set-state-in-effect -- Persisted localStorage preferences are hydrated after browser mount. */
"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GameHud } from "@/components/game/GameHud";
import { MobileControls } from "@/components/game/MobileControls";
import { PlaySetup } from "@/components/game/PlaySetup";
import { ResultModal } from "@/components/game/ResultModal";
import { Toast } from "@/components/ui/Toast";
import LobbyScreen from "@/components/game/LobbyScreen";
import MultiplayerHud from "@/components/game/MultiplayerHud";
import { LandscapeOverlay } from "@/components/game/LandscapeOverlay";
import { characters, getCharacter } from "@/game/data/characters";
import { dispatchControl } from "@/game/controls";
import { useMultiplayer } from "@/hooks/useMultiplayer";
import {
  getCharacterId,
  getPlayerName,
  getSettings,
  isLocalStorageAvailable,
  saveCharacterId,
  savePlayerName,
  saveScore,
  validateName,
} from "@/lib/storage";
import type { CharacterId, GameHud as HudType, GameMode, GameResult, GameSettings } from "@/types/game";

const GameCanvas = dynamic(() => import("@/components/game/GameCanvas").then((module) => module.GameCanvas), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm font-bold text-muted">
      Loading jebakan...
    </div>
  ),
});

const validModes: GameMode[] = ["story", "endless", "one-life", "speedrun", "multi"];

function modeFromQuery(value: string | null): GameMode {
  return validModes.includes(value as GameMode) ? (value as GameMode) : "story";
}

const initialHud = (mode: GameMode): HudType => ({
  score: 0,
  level: 1,
  totalLevels: mode === "endless" ? 1 : 10,
  deaths: 0,
  durationMs: 0,
  coins: 0,
  mode,
  paused: false,
});

export function PlayClient() {
  const router = useRouter();
  const params = useSearchParams();
  const queryMode = modeFromQuery(params.get("mode"));
  const [playerName, setPlayerName] = useState("");
  const [characterId, setCharacterId] = useState<CharacterId>("bro");
  const [mode, setMode] = useState<GameMode>(queryMode);
  const [settings, setSettings] = useState<GameSettings>(getSettings);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [nameError, setNameError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [runId, setRunId] = useState(1);
  const [hud, setHud] = useState<HudType>(() => initialHud(queryMode));
  const [result, setResult] = useState<GameResult | null>(null);
  const [isHighScore, setIsHighScore] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const mp = useMultiplayer(params.get("room") ?? undefined);
  const [lobbyName, setLobbyName] = useState("");

  useEffect(() => {
    if (mode === "multi" && mp.room && mp.room !== params.get("room")) {
      window.history.replaceState(null, "", `/play?mode=multi&room=${mp.room}`);
    }
  }, [mode, mp.room, params]);

  useEffect(() => {
    if (mode === "multi" && mp.state === "playing" && !started) {
      savePlayerName(lobbyName.trim());
      setPlayerName(lobbyName.trim());
      saveCharacterId(characterId);
      setStarted(true);
      setHud(initialHud("multi"));
      autoFullscreen();
    }
  }, [mode, mp.state, started, lobbyName, characterId]);

  useEffect(() => {
    setPlayerName(getPlayerName());
    setCharacterId(getCharacterId());
    setSettings(getSettings());
    setStorageAvailable(isLocalStorageAvailable());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const character = useMemo(() => getCharacter(characterId), [characterId]);

  function autoFullscreen() {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile || document.fullscreenElement) return;
    document.documentElement.requestFullscreen().catch(() => {});
  }

  function startGame() {
    const error = validateName(playerName);
    if (error) {
      setNameError(error);
      return;
    }
    setNameError(null);
    savePlayerName(playerName.trim());
    saveCharacterId(characterId);
    setResult(null);
    setIsHighScore(false);
    setHud(initialHud(mode));
    setRunId((value) => value + 1);
    setStarted(true);
    autoFullscreen();
  }

  const handleFinish = useCallback((finished: GameResult) => {
    if (finished.mode === "multi") {
      mp.sendFinish(finished.durationMs);
      return;
    }
    const status = saveScore(finished);
    setResult(finished);
    setIsHighScore(status.isHighScore);
    setToast(status.saved ? (status.isHighScore ? "High score baru tersimpan!" : "Skor tersimpan lokal.") : "Skor tidak dapat disimpan.");
  }, [mp.sendFinish]);

  const handleMessage = useCallback((message: string) => {
    if (message.length < 25 && /high|disimpan|audio/i.test(message)) setToast(message);
  }, []);

  function selectMode(nextMode: GameMode) {
    setMode(nextMode);
    router.replace(`/play?mode=${nextMode}`, { scroll: false });
  }

  function playAgain() {
    setResult(null);
    setIsHighScore(false);
    setHud(initialHud(mode));
    setRunId((value) => value + 1);
  }

  function quitToSetup() {
    setStarted(false);
    setResult(null);
  }

  function handleMultiCreateRoom() {
    const idx = characters.findIndex((c) => c.id === characterId);
    mp.connect(lobbyName.trim(), characterId, idx);
  }

  function handleMultiJoinRoom(roomCode: string) {
    const idx = characters.findIndex((c) => c.id === characterId);
    mp.connect(lobbyName.trim(), characterId, idx, roomCode);
  }

  function handleMultiStart() {
    mp.sendStart();
    autoFullscreen();
  }

  if (mode === "multi" && mp.state === "waiting") {
    return (
      <>
        <LobbyScreen
          name={lobbyName}
          character={characterId}
          error={mp.error}
          room={mp.room}
          players={mp.players}
          playerId={mp.playerId}
          hostId={mp.hostId}
          onName={(value) => setLobbyName(value)}
          onCharacter={setCharacterId}
          onCreateRoom={handleMultiCreateRoom}
          onJoinRoom={handleMultiJoinRoom}
          onReady={mp.sendReady}
          onStartGame={handleMultiStart}
          onDisconnect={mp.disconnect}
        />
        <Toast message={toast} />
      </>
    );
  }

  if (!started) {
    return (
      <>
        <PlaySetup
          name={playerName}
          error={nameError}
          mode={mode}
          characterId={characterId}
          storageAvailable={storageAvailable}
          onName={(value) => { setPlayerName(value); setNameError(null); }}
          onMode={selectMode}
          onCharacter={setCharacterId}
          onStart={startGame}
        />
        <Toast message={toast} />
      </>
    );
  }

  return (
    <main className={`container-game pb-12 pt-5 md:pt-8${started ? " is-playing" : ""}`}>
      <div className="mb-4 flex items-center justify-between gap-4 max-md:hidden">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-secondary">{mode.replace("-", " ")}</p>
          <h1 className="text-lg font-black text-white">{mode === "multi" ? lobbyName : playerName} · {character.name}</h1>
        </div>
        <button type="button" className="ghost-button" onClick={quitToSetup}>Keluar</button>
      </div>
      <div className="game-hud-wrapper">
        <GameHud
          hud={hud}
          onPause={() => dispatchControl({ action: "pause" })}
          onRestart={() => dispatchControl({ action: "restart" })}
        />
      </div>
      <div className="game-frame" data-reduced-motion={settings.reducedMotion}>
        <button type="button" className="game-frame-close md:hidden" onClick={quitToSetup} aria-label="Keluar game">✕</button>
        <GameCanvas
          playerName={mode === "multi" ? lobbyName.trim() : playerName.trim()}
          character={character}
          mode={mode}
          settings={settings}
          runId={runId}
          onHud={setHud}
          onFinish={handleFinish}
          onMessage={handleMessage}
          playerId={mode === "multi" ? (mp.playerId ?? undefined) : undefined}
          syncs={mode === "multi" ? mp.syncs : undefined}
          sendSync={mode === "multi" ? mp.sendSync : undefined}
        />
        {mode === "multi" ? (
          <MultiplayerHud
            players={mp.syncs}
            rankings={mp.rankings}
            playerId={mp.playerId}
          />
        ) : null}
        {hud.paused && !result ? (
          <div className="absolute inset-0 z-10 grid place-items-center bg-bg/60 backdrop-blur-[2px]">
            <div className="text-center">
              <p className="display-font mb-3 text-3xl text-primary">PAUSED</p>
              <button type="button" className="primary-button" onClick={() => dispatchControl({ action: "pause" })}>Lanjut Main</button>
            </div>
          </div>
        ) : null}
        <LandscapeOverlay />
      </div>
      <div className="mt-5 hidden justify-center gap-6 text-sm font-bold text-muted lg:flex">
        <span>A / ← &nbsp; Kiri</span><span>D / → &nbsp; Kanan</span><span>Space &nbsp; Lompat</span><span>P &nbsp; Pause</span><span>R &nbsp; Restart</span>
      </div>
      {!result ? <MobileControls opacity={settings.mobileControlsOpacity} /> : null}
      {result && mode !== "multi" ? (
        <ResultModal
          result={result}
          isHighScore={isHighScore}
          onPlayAgain={playAgain}
          onLeaderboard={() => router.push(`/leaderboard?mode=${result.mode}`)}
          onToast={setToast}
        />
      ) : null}
      <Toast message={toast} />
    </main>
  );
}
