# Multiplayer Real-Time — Jangan Injak Itu!

## 1. Tujuan

Menambahkan mode multiplayer real-time ke game, di mana hingga 10 pemain bisa saling berlomba di level khusus, melihat pergerakan satu sama lain secara langsung. Infrastruktur menggunakan PartyKit untuk WebSocket + Vercel untuk Next.js.

---

## 2. Arsitektur

```
┌─────────────────────────────────────┐
│  Vercel (Next.js)                    │
│  ┌──────────┐  ┌──────────────────┐ │
│  │ Play     │  │ PartyKit Client  │ │
│  │ Page     │──│ (@partykit/next) │ │
│  └──────────┘  └────────┬─────────┘ │
└──────────────────────────┼──────────┘
                           │ WebSocket
┌──────────────────────────┼──────────┐
│  PartyKit Cloud          │          │
│  ┌───────────────────────▼────────┐ │
│  │ party/room.ts                  │ │
│  │ - manage 10 connections/room   │ │
│  │ - broadcast player positions   │ │
│  │ - sync game state              │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

- **PartyKit** server handle WebSocket — setiap room adalah 1 Party
- **Next.js** tetap jalan di Vercel, halaman statis biasa
- **@partykit/nextjs** dipakai untuk integrasi client-side
- Server PartyKit broadcast semua state ke semua client dalam room

---

## 3. Alur Room

| Langkah | Detail |
|---|---|
| 1 | Pemain buka `/play?mode=multi` |
| 2 | Isi nama + pilih karakter (existing flow) |
| 3 | Klik **"Buat Room"** → generate kode room 5 huruf |
| 4 | Share kode/link: `https://game.vercel.app/play?room=ABCDE` |
| 5 | Temen buka link, isi nama + pilih karakter, klik **"Gabung"** |
| 6 | Host lihat list pemain, klik **"Mulai"** jika semua sudah siap |
| 7 | Semua pemain main di level yang sama, lihat posisi real-time |
| 8 | Yang finish duluan menang, muncul result ranking semua pemain |

---

## 4. Game State yang Disinkron

Dari client → server setiap ~100ms:

```ts
{
  playerId: string,
  x: number, y: number,
  isGrounded: boolean,
  facingLeft: boolean,
  currentLevel: number,
  alive: boolean,
  finished: boolean,
  deaths: number,
  time: number           // ms sejak start
}
```

Dari server → broadcast ke semua client:

```ts
{
  type: "state_update",
  players: PlayerSync[]
}
```

Setiap client render **semua pemain** di canvas Phaser:
- Pemain sendiri: kontrol normal dengan input lokal
- Pemain lain: sprite yang mengikuti posisi dari server dengan smoothing (lerp)

---

## 5. Level Multiplayer

File `game/data/multiplayer-levels.ts` — 3-5 level khusus:
- Layout lebih luas untuk 10 pemain
- Trap terpicu sekali untuk semua pemain (durian, lantai runtuh, dll)
- Checkpoint di tengah level
- Finish line yang mendeteksi urutan kedatangan

---

## 6. Tampilan Phaser

- Setiap pemain: sprite karakter + label nama + wrapper warna unik
- HUD: leaderboard urutan real-time di samping
- Tidak ada koin individual, bonus no-death
- Hanya mode multiplayer race (tidak ada story/endless/one-life/speedrun)

---

## 7. Perubahan UI React

| Screen | Komponen |
|---|---|
| Setup (existing) | Ditambah opsi **"Multiplayer"** di pilihan mode |
| Lobby (baru) | `LobbyScreen.tsx` — room code, list pemain, tombol mulai (host only), ready check |
| Game (existing) | Phaser canvas + HUD multiplayer |
| Result (existing) | Tampilkan **ranking** semua pemain |

---

## 8. File Baru

```
partykit.json                     # config PartyKit
party/
  room.ts                         # server logic PartyKit

game/data/
  multiplayer-levels.ts           # 3-5 level multiplayer

game/
  multiplayer-sync.ts             # helper serialisasi state

components/multiplayer/
  LobbyScreen.tsx                 # lobby room
  MultiplayerHud.tsx              # leaderboard real-time
  ReadyCheck.tsx                  # status ready tiap pemain

lib/
  partykit-client.ts              # WebSocket helper

hooks/
  useMultiplayer.ts               # hook koneksi + state multiplayer

app/play/page.tsx                 # detect ?room= param, routing lobby/game
```

## 9. Tipe Baru

```ts
interface PlayerSync {
  id: string; name: string; characterId: CharacterId;
  colorIndex: number;
  x: number; y: number; isGrounded: boolean;
  alive: boolean; finished: boolean;
  currentLevel: number; deaths: number;
  time: number; finishOrder: number | null;
}

interface MultiplayerRoom {
  code: string; hostId: string;
  players: PlayerSync[];
  status: 'waiting' | 'playing' | 'finished';
  startedAt: number | null;
  level: number;
}
```

---

## 10. PartyKit Room Logic (`party/room.ts`)

- `onConnect`: generate playerId, kirim room state
- `onMessage("join")`: tambah player, broadcast
- `onMessage("sync")`: update posisi, broadcast state baru
- `onMessage("ready")`: toggle ready
- `onMessage("start")`: (host only) mulai game
- `onMessage("finish")`: catat finishOrder, cek jika semua selesai
- Interval broadcast state tiap 50ms

---

## 11. Non-Goals

- Tidak ada matchmaking otomatis
- Tidak ada leaderboard online persisten (cukup ranking dalam room)
- Tidak ada chat/suara
- Tidak ada anti-cheat
- Tidak ada spectate mode
