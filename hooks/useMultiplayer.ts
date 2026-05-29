"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PartySocket from "partysocket";
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
  const [state, setState] = useState<MultiplayerRoomState["status"]>("waiting");
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [syncs, setSyncs] = useState<PlayerSync[]>([]);
  const [rankings, setRankings] = useState<MultiplayerRanking[] | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<PartySocket | null>(null);
  const playerIdRef = useRef<string | null>(null);
  const playerNameRef = useRef<string>("");
  const playerCharRef = useRef<CharacterId>("bro");
  const playerColorRef = useRef<number>(0);

  const connect = useCallback((name: string, characterId: CharacterId, colorIndex: number, joinRoomCode?: string) => {
    const code = joinRoomCode ?? room ?? generateRoomCode();
    setRoom(code);
    playerNameRef.current = name;
    playerCharRef.current = characterId;
    playerColorRef.current = colorIndex;

    const socket = createPartyClient(PARTYKIT_HOST, code, {
      onPlayers: (p) => {
        setPlayers(
          p.map((pl) => ({
            id: pl.id,
            name: pl.name,
            characterId: pl.characterId,
            colorIndex: pl.colorIndex,
            ready: false,
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

    send(socket, { type: "join", name, characterId, colorIndex });
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
    playerId: playerIdRef.current,
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
