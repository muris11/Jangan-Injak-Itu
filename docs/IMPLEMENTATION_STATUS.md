# Implementation Status — Jangan Injak Itu!

Dokumen ini mendampingi `PRD.md` dan `DESIGN.md` dengan status implementasi versi ZIP.

## Status Fitur MVP

| Fitur | Status | Catatan |
|---|---|---|
| Landing page responsive | Selesai | Hero, preview game, trap showcase, mode cards, local champion |
| Input nama tanpa login | Selesai | Validasi 2–16 karakter; localStorage |
| Pilihan karakter | Selesai | 5 karakter original berbasis warna |
| Story Mode | Selesai | 10 level data-driven |
| Endless Chaos | Selesai | Arena survival panjang |
| One Life | Selesai | Mati sekali menghasilkan result |
| Speedrun | Selesai | Multiplier skor dan timer |
| Physics platformer | Selesai | Gerak, lompat, platform, jurang, collision |
| Trap gameplay | Selesai | Spike, falling floor, durian jatuh, kambing, fake door, gravity zone, darkness |
| HUD | Selesai | Skor, level, mati, waktu, koin, pause/restart |
| Kontrol desktop | Selesai | Keyboard A/D/arrow/Space/P/R/M |
| Kontrol mobile | Selesai | Tombol touch kiri/kanan/jump |
| Result modal | Selesai | Skor, waktu, deaths, high score |
| Share result | Selesai | Web Share API + clipboard fallback |
| Leaderboard lokal | Selesai | Per mode; max 20 ranking |
| Settings | Selesai | Nama, karakter, mute, SFX, reduced motion, opacity tombol, reset |
| SEO dasar | Selesai | metadata, sitemap, robots, manifest, OpenGraph image |
| Dokumentasi | Selesai | README, PRD, DESIGN, status implementasi |

## Keputusan Implementasi

- Tidak ada login, database, server API, atau environment variable.
- Grafis karakter/trap/platform dibuat langsung oleh Phaser ketika runtime untuk menjaga project ringan dan dapat dijalankan tanpa aset eksternal.
- Sound effect memakai Web Audio tone ringan sehingga tidak ada file audio berlisensi.
- Jika nanti tersedia sprite/audio buatan sendiri, aset dapat ditempatkan di folder `public/` lalu mengganti generator tekstur.

## Hasil Validasi

Dilakukan pada source project sebelum dibuat ZIP:

```bash
npm run lint
npm run build
npm run start -- --port 4174
```

Hasil:
- ESLint: lulus.
- Build production Next.js: lulus.
- Route `/`, `/play`, `/leaderboard`, `/how-to-play`, `/settings`, `/robots.txt`, `/sitemap.xml`, dan `/opengraph-image`: merespons HTTP 200 pada production server.
- `/opengraph-image` menghasilkan `image/png`.

## Catatan Deployment

Project siap di-import ke GitHub lalu Vercel. Setelah mendapatkan domain production final, ubah domain contoh pada:

- `app/layout.tsx` (`metadataBase`)
- `app/sitemap.ts`
- `app/robots.ts`
