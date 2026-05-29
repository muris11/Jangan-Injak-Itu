import PartySocket from "partysocket";
import type { CharacterId, PlayerSync, MultiplayerRanking } from "@/types/game";

export type ClientMessage =
  | { type: "join"; name: string; characterId: CharacterId; colorIndex: number }
  | { type: "sync"; sync: Partial<PlayerSync> }
  | { type: "ready" }
  | { type: "start" }
  | { type: "finish"; time: number }
  | { type: "leave" };

export type LobbyPlayerData = PlayerSync & { ready: boolean };

export type ServerMessage =
  | { type: "players"; players: LobbyPlayerData[]; hostId: string }
  | { type: "sync"; syncs: PlayerSync[] }
  | { type: "start"; startTime: number }
  | { type: "finished"; rankings: MultiplayerRanking[] }
  | { type: "error"; message: string };

export type MessageHandler = {
  onPlayers: (players: LobbyPlayerData[], hostId: string) => void;
  onSync: (syncs: PlayerSync[]) => void;
  onStart: (startTime: number) => void;
  onFinished: (rankings: MultiplayerRanking[]) => void;
  onError: (message: string) => void;
};

export function createPartyClient(
  host: string,
  room: string,
  clientId: string,
  handlers: MessageHandler,
): PartySocket {
  const socket = new PartySocket({
    host,
    room,
    id: clientId,
    party: "jangan-injak-itu-party",
  });

  socket.addEventListener("message", (event) => {
    try {
      const msg: ServerMessage = JSON.parse(event.data as string);
      switch (msg.type) {
        case "players":
          handlers.onPlayers(msg.players, msg.hostId);
          break;
        case "sync":
          handlers.onSync(msg.syncs);
          break;
        case "start":
          handlers.onStart(msg.startTime);
          break;
        case "finished":
          handlers.onFinished(msg.rankings);
          break;
        case "error":
          handlers.onError(msg.message);
          break;
      }
    } catch {
      // ignore malformed messages
    }
  });

  return socket;
}

export function send(socket: PartySocket, msg: ClientMessage) {
  socket.send(JSON.stringify(msg));
}
