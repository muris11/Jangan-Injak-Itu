import type { CharacterId, GameMode, GameSettings, LocalScoreEntry } from "@/types/game";

const KEYS = {
  playerName: "jit.playerName",
  character: "jit.selectedCharacter",
  settings: "jit.settings",
  story: "jit.leaderboard.story",
  endless: "jit.leaderboard.endless",
  oneLife: "jit.leaderboard.oneLife",
  speedrun: "jit.leaderboard.speedrun",
  totalPlays: "jit.totalPlays",
};

export const defaultSettings: GameSettings = {
  musicVolume: 0.4,
  sfxVolume: 0.8,
  muted: false,
  reducedMotion: false,
  mobileControlsOpacity: 0.86,
};

function browserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    const probe = "__jit_probe__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T): T {
  const storage = browserStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): boolean {
  const storage = browserStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function isLocalStorageAvailable(): boolean {
  return browserStorage() !== null;
}

export function getPlayerName(): string {
  return readJson(KEYS.playerName, "");
}

export function savePlayerName(name: string): boolean {
  return writeJson(KEYS.playerName, name.trim());
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Nama minimal 2 karakter.";
  if (trimmed.length > 16) return "Nama maksimal 16 karakter.";
  if (!/^[A-Za-z0-9_ ]+$/.test(trimmed)) return "Gunakan huruf, angka, spasi, atau underscore.";
  return null;
}

export function getCharacterId(): CharacterId {
  return readJson<CharacterId>(KEYS.character, "bro");
}

export function saveCharacterId(id: CharacterId): boolean {
  return writeJson(KEYS.character, id);
}

export function getSettings(): GameSettings {
  return { ...defaultSettings, ...readJson<Partial<GameSettings>>(KEYS.settings, {}) };
}

export function saveSettings(settings: GameSettings): boolean {
  return writeJson(KEYS.settings, settings);
}

function leaderboardKey(mode: GameMode): string {
  if (mode === "multi") return "";
  return KEYS[mode === "one-life" ? "oneLife" : mode];
}

export function getScores(mode: GameMode): LocalScoreEntry[] {
  return readJson<LocalScoreEntry[]>(leaderboardKey(mode), []);
}

export function saveScore(entry: LocalScoreEntry): { saved: boolean; rank: number; isHighScore: boolean } {
  const existing = getScores(entry.mode);
  const scores = [...existing, entry]
    .sort((a, b) => b.score - a.score || a.durationMs - b.durationMs || a.deaths - b.deaths)
    .slice(0, 20);
  const saved = writeJson(leaderboardKey(entry.mode), scores);
  incrementTotalPlays();
  return {
    saved,
    rank: scores.findIndex((score) => score.id === entry.id) + 1,
    isHighScore: scores[0]?.id === entry.id,
  };
}

export function clearScores(mode?: GameMode): boolean {
  const storage = browserStorage();
  if (!storage) return false;
  try {
    if (mode) storage.removeItem(leaderboardKey(mode));
    else {
      storage.removeItem(KEYS.story);
      storage.removeItem(KEYS.endless);
      storage.removeItem(KEYS.oneLife);
      storage.removeItem(KEYS.speedrun);
    }
    return true;
  } catch {
    return false;
  }
}

export function resetAllData(): boolean {
  const storage = browserStorage();
  if (!storage) return false;
  try {
    Object.values(KEYS).forEach((key) => storage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}

export function getTotalPlays(): number {
  return readJson(KEYS.totalPlays, 0);
}

function incrementTotalPlays(): void {
  writeJson(KEYS.totalPlays, getTotalPlays() + 1);
}

export function formatScore(score: number): string {
  return new Intl.NumberFormat("id-ID").format(score);
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minute = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minute}:${remainder}`;
}

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `jit-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
