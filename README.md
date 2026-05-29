# Jangan Injak Itu!

Game web arcade-platformer jebakan absurd: pemain cukup isi nama, pilih karakter, lalu mengejar pintu finish sambil menghindari lantai runtuh, durian jatuh, pintu palsu, dan kambing marah.

## Fitur yang Sudah Diimplementasikan

- Landing page neon arcade yang responsif.
- Setup pemain tanpa login: nama dan pilihan karakter.
- Empat mode: **Story Trap**, **Endless Chaos**, **One Life**, dan **Speedrun**.
- Gameplay Phaser dengan Arcade Physics.
- 10 level Story penuh jebakan dan satu arena Endless.
- Kontrol keyboard desktop dan tombol sentuh mobile.
- Sistem skor, koin, penalti mati/restart, bonus no-death/completion.
- Result modal, native share/clipboard fallback.
- Local leaderboard per mode, maksimal 20 skor.
- Settings lokal: nama, karakter, volume SFX, mute, reduced motion, opacity kontrol HP.
- SEO metadata, sitemap, robots, manifest.
- Tanpa API, login, atau database; data tersimpan di `localStorage`.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Phaser 3
- Framer Motion
- Vercel deployment target
- `localStorage` untuk high score dan settings

## Menjalankan Project

Persyaratan: Node.js `>=20.9`.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build Production

```bash
npm run build
npm run start
```

## Deploy ke Vercel

1. Upload folder project ini ke repository GitHub.
2. Masuk ke Vercel dan pilih **Add New Project**.
3. Import repository.
4. Framework akan terdeteksi sebagai **Next.js**.
5. Klik **Deploy**. Project ini tidak membutuhkan environment variable.
6. Setelah memiliki domain production, sesuaikan `metadataBase` di `app/layout.tsx` serta URL sitemap di `app/sitemap.ts` dan `app/robots.ts`.

## Rute Halaman

| Route | Fungsi |
|---|---|
| `/` | Landing page dan preview high score lokal |
| `/play` | Setup dan gameplay utama |
| `/leaderboard` | Ranking lokal per mode |
| `/how-to-play` | Kontrol, skor, dan panduan |
| `/settings` | Preferensi lokal dan reset data |

## Kontrol

| Input | Aksi |
|---|---|
| `A` / `←` | Bergerak kiri |
| `D` / `→` | Bergerak kanan |
| `W` / `Space` | Lompat |
| `P` | Pause/resume |
| `R` | Restart level |
| `M` | Toggle mute selama bermain |

Pada perangkat touch, tombol kiri, kanan, dan jump otomatis ditampilkan.

## Penyimpanan Lokal

Game sengaja dibuat tanpa akun dan database. Data berikut tersimpan pada browser perangkat pengguna:

```txt
jit.playerName
jit.selectedCharacter
jit.settings
jit.leaderboard.story
jit.leaderboard.endless
jit.leaderboard.oneLife
jit.leaderboard.speedrun
jit.totalPlays
```

Menghapus cache/storage browser akan menghapus skor lokal.

## Struktur Penting

```txt
app/                 halaman Next.js
components/          UI React, game wrapper, leaderboard, settings
game/create-game.ts  Phaser scene, physics, traps, scoring
game/data/           karakter dan data 10 level
lib/storage.ts       localStorage, sort leaderboard, settings
docs/PRD.md          spesifikasi produk sumber
docs/DESIGN.md       spesifikasi desain sumber
```

## Grafis dan Audio

Versi ini membuat grafis pixel langsung di Phaser Canvas saat runtime sehingga:

- tidak bergantung pada aset gambar berlisensi,
- ZIP tetap ringan,
- project langsung playable setelah install.

SFX menggunakan Web Audio beep ringan. Asset sprite/audio custom bisa ditambahkan kemudian pada folder `public/`.

## Catatan Pengembangan Lanjutan

Pengembangan berikutnya yang kompatibel dengan fondasi ini:

- sprite sheet dan musik custom,
- achievement lokal,
- PWA/installable web app,
- level editor lokal,
- leaderboard online opsional melalui Supabase untuk versi berikutnya.

## Dokumen Acuan

- `docs/PRD.md`
- `docs/DESIGN.md`
