import type { PartyServer, Connection } from "partykit/server";

const PLAYERS_PER_ROOM = 10;

type PlayerState = {
  id: string;
  name: string;
  characterId: string;
  colorIndex: number;
  x: number; y: number;
  isGrounded: boolean;
  alive: boolean;
  finished: boolean;
  currentLevel: number;
  deaths: number;
  time: number;
  finishOrder: number | null;
  ready: boolean;
};

type InMessage =
  | { type: "join"; name: string; characterId: string }
  | { type: "sync"; x: number; y: number; isGrounded: boolean; alive: boolean; finished: boolean; currentLevel: number; deaths: number; time: number }
  | { type: "ready" }
  | { type: "start" }
  | { type: "finish"; time: number };

type OutMessage =
  | { type: "room_state"; players: PlayerState[]; hostId: string; status: string }
  | { type: "game_start"; startedAt: number }
  | { type: "game_end"; rankings: PlayerState[] }
  | { type: "error"; message: string };

function colorIndex(used: Set<number>): number {
  for (let i = 0; i < PLAYERS_PER_ROOM; i++) if (!used.has(i)) return i;
  return 0;
}

export default class Room implements PartyServer {
  private players = new Map<string, PlayerState>();
  private hostId: string | null = null;
  private status: "waiting" | "playing" | "finished" = "waiting";
  private finishOrder = 0;
  private syncTimer: ReturnType<typeof setInterval> | null = null;
  private connections = new Map<string, Connection>();

  async onConnect(conn: Connection): Promise<void> {
    this.connections.set(conn.id, conn);
    conn.send(JSON.stringify({ type: "connected", connectionId: conn.id }));
  }

  async onMessage(raw: string, sender: Connection): Promise<void> {
    const msg = JSON.parse(raw) as InMessage;
    switch (msg.type) {
      case "join": {
        if (this.status !== "waiting") {
          sender.send(JSON.stringify({ type: "error", message: "Game sedang berlangsung." }));
          return;
        }
        if (this.players.size >= PLAYERS_PER_ROOM) {
          sender.send(JSON.stringify({ type: "error", message: "Room penuh (max 10)!" }));
          return;
        }
        const used = new Set([...this.players.values()].map((p) => p.colorIndex));
        this.players.set(sender.id, {
          id: sender.id, name: msg.name, characterId: msg.characterId,
          colorIndex: colorIndex(used),
          x: 130, y: 600, isGrounded: true, alive: true, finished: false,
          currentLevel: 0, deaths: 0, time: 0, finishOrder: null, ready: false,
        });
        if (!this.hostId) this.hostId = sender.id;
        this.broadcastRoom();
        break;
      }
      case "sync": {
        const p = this.players.get(sender.id);
        if (!p) return;
        Object.assign(p, { x: msg.x, y: msg.y, isGrounded: msg.isGrounded, alive: msg.alive, finished: msg.finished, currentLevel: msg.currentLevel, deaths: msg.deaths, time: msg.time });
        break;
      }
      case "ready": {
        const p = this.players.get(sender.id);
        if (p) p.ready = !p.ready;
        this.broadcastRoom();
        break;
      }
      case "start": {
        if (sender.id !== this.hostId) { sender.send(JSON.stringify({ type: "error", message: "Hanya host yang bisa mulai!" })); return; }
        if (this.players.size < 2) { sender.send(JSON.stringify({ type: "error", message: "Minimal 2 pemain!" })); return; }
        this.status = "playing";
        this.finishOrder = 0;
        this.broadcast({ type: "game_start", startedAt: Date.now() });
        this.syncTimer = setInterval(() => this.broadcastRoom(), 50);
        break;
      }
      case "finish": {
        const f = this.players.get(sender.id);
        if (!f || f.finished) return;
        this.finishOrder++;
        f.finished = true;
        f.finishOrder = this.finishOrder;
        f.time = msg.time;
        this.broadcastRoom();
        const allDone = [...this.players.values()].every((p) => p.finished);
        if (allDone) this.endGame();
        break;
      }
    }
  }

  async onClose(conn: Connection): Promise<void> {
    this.connections.delete(conn.id);
    const wasHost = conn.id === this.hostId;
    this.players.delete(conn.id);
    if (this.players.size === 0) { this.stopSync(); return; }
    if (wasHost) this.hostId = [...this.players.keys()][0];
    if (this.status === "playing") {
      const allDone = [...this.players.values()].every((p) => p.finished);
      if (allDone && this.finishOrder > 0) this.endGame();
    }
    this.broadcastRoom();
  }

  private broadcast(msg: OutMessage): void {
    const data = JSON.stringify(msg);
    for (const conn of this.connections.values()) conn.send(data);
  }

  private broadcastRoom(): void {
    this.broadcast({ type: "room_state", players: [...this.players.values()], hostId: this.hostId ?? "", status: this.status });
  }

  private endGame(): void {
    this.status = "finished";
    this.stopSync();
    const rankings = [...this.players.values()].sort((a, b) => (a.finishOrder ?? 99) - (b.finishOrder ?? 99));
    this.broadcast({ type: "game_end", rankings });
  }

  private stopSync(): void {
    if (this.syncTimer) { clearInterval(this.syncTimer); this.syncTimer = null; }
  }
}
