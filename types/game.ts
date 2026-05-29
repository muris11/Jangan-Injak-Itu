export type GameMode = "story" | "endless" | "one-life" | "speedrun" | "multi";
export type CharacterId = "bro" | "oren" | "ayam" | "tahu" | "helm";

export type Character = {
  id: CharacterId;
  name: string;
  description: string;
  bodyColor: number;
  accentColor: number;
};

export type LocalScoreEntry = {
  id: string;
  playerName: string;
  score: number;
  levelReached: number;
  completedLevels: number;
  deaths: number;
  durationMs: number;
  characterId: CharacterId;
  mode: GameMode;
  createdAt: string;
};

export type GameSettings = {
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
  reducedMotion: boolean;
  mobileControlsOpacity: number;
};

export type GameHud = {
  score: number;
  level: number;
  totalLevels: number;
  deaths: number;
  durationMs: number;
  coins: number;
  mode: GameMode;
  paused: boolean;
  message?: string;
};

export type GameResult = LocalScoreEntry & {
  won: boolean;
  title: string;
  flavorText: string;
};

export type LevelDefinition = {
  id: string;
  name: string;
  prankMessage: string;
  worldWidth: number;
  floorSegments: Array<{ x: number; width: number; y?: number; falling?: boolean }>;
  platforms?: Array<{ x: number; y: number; width: number; moving?: boolean }>;
  spikes: Array<{ x: number; y?: number }>;
  coins: Array<{ x: number; y: number }>;
  durians?: Array<{ x: number; triggerX: number }>;
  goats?: Array<{ x: number; y?: number; minX: number; maxX: number }>;
  fakeDoors?: Array<{ x: number; y?: number }>;
  gravityZone?: { startX: number; endX: number };
  dark?: boolean;
  boss?: boolean;
};

export type PlayerSync = {
  id: string;
  name: string;
  characterId: CharacterId;
  colorIndex: number;
  x: number;
  y: number;
  facingLeft: boolean;
  isGrounded: boolean;
  alive: boolean;
  finished: boolean;
  currentLevel: number;
  deaths: number;
  time: number;
  finishOrder: number | null;
};

export type MultiplayerRoomState = {
  code: string;
  hostId: string;
  players: PlayerSync[];
  status: "waiting" | "playing" | "finished";
  startedAt: number | null;
};

export type MultiplayerRanking = {
  id: string;
  name: string;
  characterId: CharacterId;
  colorIndex: number;
  finishOrder: number;
  time: number;
  deaths: number;
};
