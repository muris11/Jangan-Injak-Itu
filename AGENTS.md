# Jangan Injak Itu! — Multiplayer Platformer

## Goal
Real-time online multiplayer (up to 10 players/room) with PartyKit + Vercel; lobby join/ready flow and game start + gameplay working end-to-end.

## Stack
- Vercel (Next.js 16 App Router) + PartyKit Cloud (WebSocket server)
- Phaser 3 for game rendering
- raw WebSocket (not PartySocket)

## Progress
### Done
- All 16 spec tasks code-complete and build/test passing
- GitHub: `muris11/Jangan-Injak-Itu`
- Vercel prod: `https://jangan-injak-itu.vercel.app`
- PartyKit Cloud: `jangan-injak-itu-party.muris11.partykit.dev`

### Lobby flow (verified end-to-end)
- **Host creates room**: Navigate to `/play`, select character → "Multiplayer Online" → type name → "Buat Room" → lobby shows room code with 👑
- **Guest joins**: Same path → "Masuk Room" → enter code → both players visible in real-time
- **Ready sync**: Click "Siap" updates server, broadcasts to all clients immediately
- **All-ready gate**: "Mulai" button enables only when ≥2 players and every player is ready
- **Start game**: Host clicks "Mulai" → server broadcasts `start` with `startTime` → all clients transition to game canvas with `MULTI` label

### Fixes applied
1. **PartySocket v1 URL incompatibility**: v1 routes `/parties/{name}/{room}` but PartyKit Cloud v0 expects `/party/{room}`. Fixed by switching to raw `WebSocket` (`game/party.ts`).
2. **`router.replace` destroying state**: URL sync via `router.replace` caused full page navigation. Replaced with `window.history.replaceState` (`PlayClient.tsx`).
3. **Stale PartyKit server**: Redeployed after server code changes with `npx partykit deploy`.
4. **Double WebSocket creation**: Added `if (socketRef.current) return;` guard in `connect` (`useMultiplayer.ts`).
5. **`disconnect` doesn't clear state**: Added `setRoom(null)` + `setHostId(null)` so rejoining works.
6. **Multiplayer game not starting**: Added `useEffect` watching `mp.state === "playing"` to trigger `setStarted(true)` for multiplayer mode (`PlayClient.tsx`).
7. **Unused dependency**: Removed `partysocket` from `package.json`.

## Key Architecture
- **`hooks/useMultiplayer.ts`**: Hook owns WebSocket lifecycle, exposes `connect`, `sendReady`, `sendStart`, `sendSync`, `sendFinish`, `disconnect`, `players`, `state`, `rankings`, `startTime`, `error`
- **`game/party.ts`**: `createPartyClient` creates raw WebSocket, `send` helper for JSON messages; callbacks: `onPlayers`, `onSync`, `onStart`, `onFinished`, `onError`
- **`components/game/PlayClient.tsx`**: State machine: PlaySetup → (multi: LobbyScreen) → GameCanvas; multiplayer effect triggers game start on `state === "playing"`
- **`components/game/LobbyScreen.tsx`**: Setup form (name+character+create/join) then lobby (player list + ready + start + disconnect)
- **`components/game/MultiplayerScene.ts`**: Extends `TrapGameScene`, overrides `create`/`update` to render remote players, sends sync on `requestAnimationFrame`, sends finish on level complete
- **`party/room.ts`**: PartyKit server; `onConnect` handles `join`, `ready`, `start`, `sync`, `finish`, `leave`; broadcasts to all connections
- **Env**: `NEXT_PUBLIC_PARTYKIT_HOST` set vercel-side, bust cache with `--force` on change
- **`createMultiplayerGame`** uses dynamic `import()` to avoid circular dependency
- **`playerId`** is React state (not ref) for reactivity; matched via deterministic `crypto.randomUUID()` on each client
- **Multiplayer finish**: client sends time to server, server broadcasts rankings (no local score save)

## Known Minor Issues
- Name in game canvas shows "hh" (fallback from localStorage) instead of lobby name — Phaser scene reads `getPlayerName()` at mount and may use cached value

## Relevant Files
- `hooks/useMultiplayer.ts` — main hook
- `game/party.ts` — WebSocket client
- `components/game/PlayClient.tsx` — orchestrator
- `components/game/LobbyScreen.tsx` — lobby UI
- `components/game/MultiplayerScene.ts` — game scene
- `party/room.ts` — PartyKit server
- `types/game.ts` — shared types
