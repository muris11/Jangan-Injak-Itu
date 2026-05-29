"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPartyClient, send } from "@/game/party";
import type { MultiplayerRoomState, PlayerSync, MultiplayerRanking, CharacterId } from "@/types/game";

export type LobbyPlayer = {
  id: string;
  name: string;
  characterId: CharacterId;
  colorIndex: number;
  ready: boolean;
};

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "127.0.0.1:1999";

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export function useMultiplayer(roomCode?: string) {
  const [room, setRoom] = useState<string | null>(roomCode ?? null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);
  const [state, setState] = useState<MultiplayerRoomState["status"]>("waiting");
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [syncs, setSyncs] = useState<PlayerSync[]>([]);
  const [rankings, setRankings] = useState<MultiplayerRanking[] | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const clientIdRef = useRef<string>(crypto.randomUUID());
  const playerNameRef = useRef<string>("");
  const playerCharRef = useRef<CharacterId>("bro");
  const playerColorRef = useRef<number>(0);

  const connect = useCallback((name: string, characterId: CharacterId, colorIndex: number, joinRoomCode?: string) => {
    if (socketRef.current) return;
    const code = joinRoomCode ?? room ?? generateRoomCode();
    setRoom(code);
    setPlayerId(clientIdRef.current);
    playerNameRef.current = name;
    playerCharRef.current = characterId;
    playerColorRef.current = colorIndex;

    const socket = createPartyClient(PARTYKIT_HOST, code, clientIdRef.current, {
      onPlayers: (p, host) => {
        setHostId(host);
        setPlayers(
          p.map((pl) => ({
            id: pl.id,
            name: pl.name,
            characterId: pl.characterId,
            colorIndex: pl.colorIndex,
            ready: pl.ready,
          })),
        );
      },
      onSync: (s) => {
        setSyncs(s);
      },
      onStart: (t) => {
        setStartTime(t);
        setState("playing");
      },
      onFinished: (r) => {
        setRankings(r);
        setState("finished");
      },
      onError: (msg) => {
        setError(msg);
      },
    });

    socketRef.current = socket;

    const doSend = () => send(socket, { type: "join", name, characterId, colorIndex });
    if (socket.readyState === WebSocket.OPEN) {
      doSend();
    } else {
      socket.addEventListener("open", doSend, { once: true });
    }
  }, [room]);

  const sendReady = useCallback(() => {
    if (socketRef.current) send(socketRef.current, { type: "ready" });
  }, []);

  const sendStart = useCallback(() => {
    if (socketRef.current) send(socketRef.current, { type: "start" });
  }, []);

  const sendSync = useCallback((partial: Partial<PlayerSync>) => {
    if (socketRef.current) send(socketRef.current, { type: "sync", sync: partial });
  }, []);

  const sendFinish = useCallback((time: number) => {
    if (socketRef.current) send(socketRef.current, { type: "finish", time });
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      send(socketRef.current, { type: "leave" });
      socketRef.current.close();
      socketRef.current = null;
    }
    setRoom(null);
    setHostId(null);
    setState("waiting");
    setPlayers([]);
    setSyncs([]);
    setRankings(null);
    setStartTime(null);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        try {
          send(socketRef.current, { type: "leave" });
        } catch { /* ignore */ }
        socketRef.current.close();
      }
    };
  }, []);

  return {
    room,
    playerId,
    hostId,
    state,
    players,
    syncs,
    rankings,
    startTime,
    error,
    connect,
    sendReady,
    sendStart,
    sendSync,
    sendFinish,
    disconnect,
  };
}
