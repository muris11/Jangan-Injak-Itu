# PRD.md — Jangan Injak Itu!

> Product Requirements Document untuk game web arcade-platformer tanpa login, tanpa database, cukup isi nama, main, simpan high score lokal, dan deploy ke Vercel.

---

## 1. Ringkasan Produk

### 1.1 Nama Produk
**Jangan Injak Itu!**

### 1.2 Tagline
**Game platformer jebakan absurd yang bikin emosi, ketawa, dan pengen coba lagi.**

### 1.3 Deskripsi Singkat
Jangan Injak Itu! adalah game web 2D berbasis browser yang dapat dimainkan langsung tanpa login. Pemain hanya perlu memasukkan nama, memilih karakter, lalu menyelesaikan level pendek penuh jebakan kocak dan tidak terduga. Skor disimpan secara lokal di browser memakai `localStorage`, sehingga game tetap ringan, mudah di-host di Vercel, dan bisa dimainkan siapa saja lewat link.

### 1.4 Konsep Utama
Pemain mengontrol karakter kecil untuk mencapai pintu finish. Namun, hampir setiap level memiliki “jebakan pengkhianat” seperti lantai jatuh, koin palsu, pintu kabur, durian jatuh, kambing menyeruduk, gravitasi terbalik, hingga checkpoint palsu.

### 1.5 Value Proposition
Game ini memberikan pengalaman cepat, lucu, dan replayable dengan setup yang sangat sederhana:
- Tidak perlu registrasi.
- Tidak perlu database.
- Bisa dimainkan di HP, tablet, laptop, dan desktop.
- Bisa langsung di-host di Vercel.
- Bisa dimainkan bersama teman saat presentasi atau demo.
- High score tersimpan di perangkat pemain.

---

## 2. Tujuan Produk

### 2.1 Tujuan Utama
Membangun game web yang:
1. Seru dimainkan dalam 30 detik pertama.
2. Dapat dimainkan tanpa login.
3. Tidak membutuhkan backend database.
4. Responsif untuk desktop, laptop, tablet, dan smartphone.
5. Memiliki mekanik high score lokal.
6. Siap di-deploy ke Vercel.
7. Mudah dikembangkan menjadi versi online leaderboard di masa depan.

### 2.2 Tujuan Pengalaman Pemain
Pemain harus merasa:
- “Game-nya gampang, tapi kok nyebelin ya?”
- “Sekali lagi deh, tadi hampir menang.”
- “Jebakannya lucu banget.”
- “Gue mau kalahin skor temen gue.”
- “Ini cocok banget dimainkan ramai-ramai.”

### 2.3 Tujuan Teknis
Sistem harus:
- Berjalan di browser modern.
- Tidak bergantung pada server saat gameplay.
- Memakai asset lokal dari folder `public`.
- Menyimpan data pemain di `localStorage`.
- Memuat cepat.
- Tetap playable di layar kecil.
- Memakai kontrol keyboard dan kontrol sentuh.
- Tidak crash saat refresh halaman.
- Tidak menampilkan error hydration di Next.js.

---

## 3. Target Pengguna

### 3.1 Primary User
Mahasiswa, pelajar, dan pengguna umum yang ingin memainkan game ringan langsung dari browser.

### 3.2 Secondary User
Dosen, teman kelas, atau pengunjung demo project yang ingin mencoba game tanpa membuat akun.

### 3.3 Persona 1 — Pemain Casual
- Nama: Raka
- Perangkat: Smartphone Android
- Tujuan: Main cepat saat santai
- Kebutuhan: Tombol besar, loading cepat, tidak login
- Pain point: Malas download aplikasi

### 3.4 Persona 2 — Pemain Demo Kelas
- Nama: Dini
- Perangkat: Laptop presentasi
- Tujuan: Mencoba game dan membandingkan skor
- Kebutuhan: Input nama cepat, leaderboard lokal
- Pain point: Waktu demo terbatas

### 3.5 Persona 3 — Developer Project
- Nama: Muris
- Perangkat: PC/laptop
- Tujuan: Membuat game web yang terlihat profesional
- Kebutuhan: Struktur project rapi, mudah dikembangkan, responsif
- Pain point: Tidak ingin ribet login dan database

---

## 4. Scope Produk

### 4.1 Scope MVP
Fitur yang wajib ada pada versi pertama:

1. Landing page.
2. Input nama pemain.
3. Pilih karakter.
4. Halaman game.
5. Minimal 5 level.
6. Kontrol keyboard desktop.
7. Kontrol sentuh mobile.
8. Sistem nyawa atau retry.
9. Sistem skor.
10. Local leaderboard.
11. High score lokal.
12. Halaman cara bermain.
13. Halaman leaderboard lokal.
14. Tombol restart.
15. Tombol mute/unmute.
16. Tombol share hasil.
17. Responsive layout.
18. Deploy ke Vercel.

### 4.2 Scope Versi 1.1
Fitur lanjutan setelah MVP:
1. Tambah level menjadi 10.
2. Tambah mode endless.
3. Tambah mode one-life challenge.
4. Tambah achievement lokal.
5. Tambah sound effect lengkap.
6. Tambah animasi intro level.
7. Tambah setting sensitivitas kontrol mobile.
8. Tambah pilihan skin karakter.

### 4.3 Scope Versi 2.0
Fitur masa depan:
1. Leaderboard online.
2. Login opsional.
3. Database Supabase.
4. Level editor.
5. Share level.
6. Duel online.
7. Daily challenge.
8. Cloud save.

### 4.4 Di Luar Scope MVP
Untuk versi awal, fitur berikut tidak dibuat:
- Login.
- Register.
- Database.
- Admin panel.
- Multiplayer real-time.
- Chat.
- Payment.
- NFT.
- Marketplace item.
- Cloud leaderboard.
- Analytics server-side.

---

## 5. Platform dan Perangkat

### 5.1 Browser Target
Game harus berjalan di:
- Chrome terbaru.
- Edge terbaru.
- Firefox terbaru.
- Safari terbaru.
- Mobile Chrome Android.
- Mobile Safari iOS.

### 5.2 Perangkat Target
Game harus nyaman di:
- Smartphone kecil 360px.
- Smartphone standar 390px–430px.
- Tablet 768px.
- Laptop 1366px.
- Desktop 1440px–1920px.
- Monitor besar 2560px.

### 5.3 Orientasi Layar
- Desktop: landscape.
- Mobile: portrait tetap playable.
- Mobile landscape: optional tetapi tetap didukung.
- Tablet: portrait dan landscape.

### 5.4 Minimum Ukuran Layar
Ukuran minimum yang harus masih bisa dimainkan:
- Width: 320px.
- Height: 568px.

---

## 6. Tech Stack

### 6.1 Frontend
- Next.js App Router.
- TypeScript.
- Tailwind CSS 4.
- React.
- Framer Motion untuk UI transitions.

### 6.2 Game Engine
- Phaser 3.
- Arcade Physics.
- Scale Manager.
- Scene-based architecture.

### 6.3 Audio
- Howler.js atau Phaser Sound.
- File audio lokal di folder `public/sounds`.

### 6.4 Storage
- `localStorage` untuk:
  - nama pemain terakhir,
  - daftar skor lokal,
  - high score,
  - achievement lokal,
  - setting mute,
  - pilihan karakter.

### 6.5 Deployment
- Vercel.
- GitHub.
- Static asset dari folder `public`.

### 6.6 Tidak Digunakan
- Database.
- Authentication.
- API eksternal.
- WebSocket.
- Server action untuk gameplay.
- Prisma.
- Supabase.
- Firebase.

---

## 7. Struktur Project

```txt
jangan-injak-itu/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── play/
│   │   └── page.tsx
│   ├── leaderboard/
│   │   └── page.tsx
│   ├── how-to-play/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageShell.tsx
│   ├── game/
│   │   ├── GameCanvas.tsx
│   │   ├── NameModal.tsx
│   │   ├── CharacterSelect.tsx
│   │   ├── MobileControls.tsx
│   │   ├── GameHud.tsx
│   │   ├── PauseOverlay.tsx
│   │   ├── ResultModal.tsx
│   │   └── LocalLeaderboard.tsx
│   └── ui/
├── game/
│   ├── config.ts
│   ├── events.ts
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── MenuScene.ts
│   │   ├── LevelScene.ts
│   │   ├── EndlessScene.ts
│   │   ├── GameOverScene.ts
│   │   └── ResultScene.ts
│   ├── objects/
│   │   ├── Player.ts
│   │   ├── Trap.ts
│   │   ├── FallingFloor.ts
│   │   ├── FakeDoor.ts
│   │   ├── FallingDurian.ts
│   │   ├── AngryGoat.ts
│   │   ├── MovingPlatform.ts
│   │   ├── Coin.ts
│   │   └── Checkpoint.ts
│   ├── data/
│   │   ├── levels.ts
│   │   ├── characters.ts
│   │   ├── traps.ts
│   │   └── achievements.ts
│   └── utils/
│       ├── score.ts
│       ├── storage.ts
│       ├── responsive.ts
│       └── input.ts
├── public/
│   ├── sprites/
│   ├── backgrounds/
│   ├── tiles/
│   ├── sounds/
│   ├── music/
│   └── icons/
├── types/
│   ├── game.ts
│   ├── score.ts
│   └── storage.ts
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 8. User Flow

### 8.1 Flow Pertama Kali Main
```txt
User membuka link
↓
Landing page tampil
↓
Klik tombol “Main Sekarang”
↓
Modal input nama tampil
↓
User isi nama
↓
User pilih karakter
↓
Game loading
↓
Level 1 dimulai
↓
User bermain
↓
Game selesai atau user kalah
↓
Result modal tampil
↓
Skor disimpan ke localStorage
↓
User dapat restart atau lihat leaderboard lokal
```

### 8.2 Flow Pemain Lama
```txt
User membuka link
↓
Sistem membaca nama terakhir dari localStorage
↓
Landing page menampilkan “Lanjut sebagai [Nama]”
↓
User klik main
↓
Game langsung mulai
```

### 8.3 Flow Leaderboard Lokal
```txt
User selesai main
↓
Sistem hitung skor akhir
↓
Sistem simpan score entry ke localStorage
↓
Sistem urutkan skor tertinggi
↓
Hanya top 20 disimpan
↓
Leaderboard ditampilkan
```

### 8.4 Flow Reset Data
```txt
User masuk Settings
↓
Klik Reset Data Lokal
↓
Dialog konfirmasi
↓
User setuju
↓
localStorage key game dihapus
↓
UI kembali ke state awal
```

---

## 9. Fitur Detail

### 9.1 Landing Page
Landing page harus:
- Menjelaskan game dalam 1 kalimat.
- Menampilkan tombol utama “Main Sekarang”.
- Menampilkan preview karakter.
- Menampilkan preview jebakan.
- Menampilkan high score lokal jika ada.
- Menampilkan tombol “Cara Main”.
- Menampilkan tombol “Leaderboard”.
- Responsive dari mobile sampai desktop.

Konten landing:
- Headline: “Jangan Injak Itu!”
- Subheadline: “Platformer jebakan absurd yang kelihatannya gampang, tapi lantainya suka bohong.”
- CTA utama: “Main Sekarang”
- CTA sekunder: “Lihat Cara Main”
- Badge: “Tanpa Login”, “Tanpa Download”, “Bisa Main di HP”

### 9.2 Input Nama
Requirement:
- Nama wajib diisi.
- Minimal 2 karakter.
- Maksimal 16 karakter.
- Hanya huruf, angka, spasi, underscore.
- Emoji tidak disarankan.
- Jika kosong, tampilkan error.
- Nama disimpan ke localStorage.
- Nama bisa diganti di Settings.

Validasi:
```txt
Valid:
Muris
Rifqy_11
Player 1

Tidak valid:
<admin>
nama-terlalu-panjang-banget
```

### 9.3 Pilih Karakter
Karakter awal:
1. Si Bro Pixel.
2. Kucing Oren.
3. Ayam Kabur.
4. Tahu Bulat.
5. Helm Proyek.

Data karakter:
```ts
type Character = {
  id: string
  name: string
  spriteKey: string
  description: string
  speed: number
  jumpPower: number
}
```

Pada MVP, stats karakter boleh sama agar balancing mudah.

### 9.4 Gameplay Level
Setiap level terdiri dari:
- spawn point,
- platform,
- obstacle,
- jebakan,
- koin,
- pintu finish,
- timer,
- teks prank opsional.

Kondisi menang:
- Pemain menyentuh pintu finish asli.

Kondisi kalah:
- Pemain jatuh ke jurang.
- Pemain terkena trap fatal.
- Pemain kehabisan nyawa jika mode memakai nyawa.

### 9.5 Kontrol Desktop
- `A` atau `ArrowLeft`: kiri.
- `D` atau `ArrowRight`: kanan.
- `W`, `ArrowUp`, atau `Space`: lompat.
- `P`: pause.
- `R`: restart level.
- `M`: mute/unmute.

### 9.6 Kontrol Mobile
Kontrol mobile harus:
- Selalu terlihat saat game berjalan.
- Tombol kiri di kiri bawah.
- Tombol kanan di kiri bawah.
- Tombol lompat di kanan bawah.
- Tombol pause di kanan atas.
- Tombol cukup besar minimal 56px.
- Area tap tidak terlalu dekat dengan tepi layar.
- Menggunakan `touch-action: none` agar tidak scroll saat bermain.

### 9.7 Pause
Saat pause:
- Game physics berhenti.
- Timer berhenti.
- Audio musik mengecil atau berhenti.
- Overlay pause muncul.
- Tombol Resume.
- Tombol Restart.
- Tombol Keluar ke Menu.

### 9.8 Game Over
Game over terjadi jika:
- Nyawa habis.
- Waktu habis.
- Pemain memilih menyerah.

Game over menampilkan:
- Nama pemain.
- Level terakhir.
- Skor.
- Jumlah mati.
- Waktu bermain.
- Tombol main lagi.
- Tombol leaderboard.
- Tombol share.

### 9.9 Result Win
Jika menyelesaikan semua level:
- Tampilkan “Kamu menang, tapi lantai tetap tidak bisa dipercaya.”
- Tampilkan total skor.
- Tampilkan total waktu.
- Tampilkan total death.
- Tampilkan badge jika ada.
- Simpan skor lokal.

### 9.10 Local Leaderboard
Leaderboard lokal menyimpan maksimal 20 entry.

Field:
```ts
type LocalScoreEntry = {
  id: string
  playerName: string
  score: number
  levelReached: number
  completedLevels: number
  deaths: number
  durationMs: number
  characterId: string
  mode: "story" | "endless" | "one-life" | "speedrun"
  createdAt: string
}
```

Leaderboard sort:
1. Skor tertinggi.
2. Jika skor sama, waktu tercepat.
3. Jika masih sama, death paling sedikit.
4. Jika masih sama, createdAt terbaru.

### 9.11 Share Result
Tombol share:
- Jika Web Share API tersedia, gunakan native share.
- Jika tidak, copy teks ke clipboard.

Template:
```txt
Aku main Jangan Injak Itu!
Nama: Muris
Skor: 12.450
Level: 8/10
Mati: 17x

Berani kalahin skor aku?
```

### 9.12 Settings
Settings berisi:
- Nama pemain.
- Pilihan karakter default.
- Volume musik.
- Volume SFX.
- Toggle mute.
- Toggle reduced motion.
- Reset leaderboard lokal.
- Reset semua data lokal.

---

## 10. Mode Game

### 10.1 Story Mode
Mode utama. Pemain menyelesaikan level 1 sampai level 10.

Aturan:
- Level berurutan.
- Pemain boleh retry.
- Skor turun setiap mati.
- Finish semua level menghasilkan bonus.

### 10.2 Endless Chaos
Mode bertahan hidup.

Aturan:
- Arena tunggal.
- Obstacle muncul semakin cepat.
- Skor berdasarkan durasi bertahan.
- Game selesai saat terkena trap.

### 10.3 One Life Challenge
Mode sulit.

Aturan:
- Pemain hanya punya 1 nyawa.
- Skor bonus lebih tinggi.
- Cocok untuk pemain yang ingin tantangan.

### 10.4 Speedrun Mode
Mode waktu.

Aturan:
- Target menyelesaikan semua level secepat mungkin.
- Death memberi penalti waktu.
- Leaderboard mengutamakan waktu tercepat.

---

## 11. Desain Level

### 11.1 Prinsip Desain Level
Setiap level harus:
- Dipahami cepat.
- Memiliki 1 gimmick utama.
- Memiliki 1–3 jebakan minor.
- Tidak terlalu panjang.
- Bisa selesai 20–60 detik.
- Memiliki momen lucu.
- Fair setelah pemain tahu pola jebakannya.

### 11.2 Level 1 — Tutorial Bohong
Gimmick:
- Tulisan bilang aman.
- Lantai dekat finish jatuh.

Tujuan:
- Mengajarkan bahwa game ini penuh prank.

### 11.3 Level 2 — Koin Durian
Gimmick:
- Salah satu koin berubah menjadi durian jatuh.

Tujuan:
- Mengajarkan bahwa reward bisa jadi trap.

### 11.4 Level 3 — Pintu Kabur
Gimmick:
- Pintu finish bergerak menjauh.

Tujuan:
- Memperkenalkan fake goal.

### 11.5 Level 4 — Kambing Marah
Gimmick:
- Kambing menyeruduk horizontal.

Tujuan:
- Mengajarkan timing dan posisi aman.

### 11.6 Level 5 — Jembatan Sopan
Gimmick:
- Jembatan bergerak saat diinjak.

Tujuan:
- Mengajarkan platform dinamis.

### 11.7 Level 6 — Gravitasi Ngaco
Gimmick:
- Area tertentu membalik gravitasi.

Tujuan:
- Variasi gameplay.

### 11.8 Level 7 — Checkpoint Palsu
Gimmick:
- Checkpoint palsu melempar pemain ke awal.

Tujuan:
- Humor dan kejutan.

### 11.9 Level 8 — Hujan Bakso
Gimmick:
- Obstacle jatuh dari langit.

Tujuan:
- Menguji reaksi.

### 11.10 Level 9 — Lampu Mati
Gimmick:
- Area gelap, hanya radius kecil terlihat.

Tujuan:
- Menciptakan suspense lucu.

### 11.11 Level 10 — Boss Tukang Prank
Gimmick:
- Boss mengaktifkan jebakan secara berurutan.

Tujuan:
- Finale yang memorable.

---

## 12. Sistem Skor

### 12.1 Variabel Skor
- Base score per level selesai.
- Bonus waktu.
- Bonus koin.
- Penalti death.
- Penalti retry.
- Bonus no-death.
- Bonus completion.

### 12.2 Formula MVP
```ts
levelScore =
  1000 +
  coinCollected * 100 +
  timeBonus -
  deathsInLevel * 150

timeBonus = Math.max(0, 500 - secondsSpent * 10)
```

### 12.3 Bonus
- No death level: +500.
- Finish all levels: +2000.
- Finish under target time: +1000.
- One-life mode multiplier: x1.5.
- Speedrun mode multiplier: x1.2.

### 12.4 Penalti
- Death: -150.
- Restart manual: -100.
- Skip level: -700.
- Hint: -200.

### 12.5 Minimum Skor
Skor level tidak boleh negatif.
```ts
finalLevelScore = Math.max(0, levelScore)
```

---

## 13. Data Storage Lokal

### 13.1 localStorage Keys
```txt
jit.playerName
jit.selectedCharacter
jit.settings
jit.leaderboard.story
jit.leaderboard.endless
jit.leaderboard.oneLife
jit.leaderboard.speedrun
jit.achievements
jit.lastSession
```

### 13.2 Settings Object
```json
{
  "musicVolume": 0.5,
  "sfxVolume": 0.8,
  "muted": false,
  "reducedMotion": false,
  "mobileControlsOpacity": 0.85
}
```

### 13.3 Error Handling
Jika localStorage tidak tersedia:
- Game tetap bisa dimainkan.
- Skor tidak disimpan.
- Tampilkan pesan ringan: “Browser tidak mengizinkan penyimpanan lokal.”

### 13.4 Data Privacy
Karena tanpa login:
- Tidak ada email.
- Tidak ada password.
- Tidak ada data sensitif.
- Nama pemain hanya tersimpan di perangkat.
- Data tidak dikirim ke server.

---

## 14. Requirements Responsif

### 14.1 Breakpoints
Gunakan pendekatan mobile-first:

```txt
xs: 320px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 14.2 Landing Page Responsif
Mobile:
- Hero 1 kolom.
- CTA full width.
- Preview game di bawah teks.
- Card fitur horizontal scroll atau stack.

Tablet:
- Hero 2 kolom ringan.
- CTA tidak full width.
- Card fitur 2 kolom.

Desktop:
- Hero 2 kolom besar.
- Preview game besar di kanan.
- Section fitur 3 kolom.

### 14.3 Game Canvas Responsif
Canvas harus:
- Mempertahankan aspect ratio 16:9 di desktop.
- Bisa memakai fit mode di mobile.
- Tidak keluar viewport.
- Tidak tertutup navbar.
- Memiliki safe area untuk mobile controls.
- Pause saat tab tidak aktif.

### 14.4 Mobile Controls Responsif
Mobile controls:
- Muncul hanya pada touch device.
- Ukuran minimal 56px.
- Jarak dari bawah minimal 16px.
- Memperhitungkan safe area iPhone:
```css
padding-bottom: env(safe-area-inset-bottom);
```

### 14.5 Orientation Handling
Jika mobile portrait:
- Canvas tetap tampil.
- HUD compact.
- Mobile controls aktif.

Jika mobile landscape:
- Canvas memenuhi lebar.
- Controls menjadi lebih kecil.
- HUD dipadatkan.

---

## 15. Requirements Aksesibilitas

### 15.1 UI Website
- Semua tombol memiliki label jelas.
- Warna teks memiliki kontras baik.
- Fokus keyboard terlihat.
- Tombol CTA bisa diakses dengan keyboard.
- Modal bisa ditutup dengan Escape.
- Form input memiliki label.

### 15.2 Game Accessibility
- Sediakan tombol mute.
- Sediakan reduced motion.
- Jangan bergantung hanya pada warna untuk bahaya.
- Trap punya bentuk visual jelas.
- Flashing effect dibatasi.
- Beri opsi restart mudah.

### 15.3 Text
- Gunakan bahasa santai tetapi jelas.
- Hindari instruksi ambigu pada UI penting.
- Humor boleh dipakai di level, bukan pada error penting.

---

## 16. Performance Requirements

### 16.1 Target Loading
- Landing page interactive < 3 detik pada koneksi standar.
- Game preload menampilkan progress.
- Asset level awal diprioritaskan.
- Asset level lanjutan bisa lazy load.

### 16.2 Asset Optimization
- Sprite gunakan PNG/WebP.
- Background gunakan WebP.
- Audio dikompresi.
- Hindari file audio terlalu besar.
- Pakai sprite sheet untuk karakter.
- Hindari terlalu banyak particle di mobile low-end.

### 16.3 Runtime
- Target 60 FPS desktop.
- Target minimal 30 FPS mobile low-end.
- Physics object dibatasi.
- Destroy object yang tidak dipakai.
- Hindari memory leak saat pindah scene.

### 16.4 Bundle
- Phaser di-load hanya di halaman `/play`.
- Gunakan dynamic import dengan `ssr: false`.
- Jangan import Phaser di server component.

---

## 17. SEO dan Metadata

### 17.1 Title
```txt
Jangan Injak Itu! — Game Platformer Jebakan Absurd
```

### 17.2 Description
```txt
Mainkan game platformer jebakan absurd langsung di browser. Tanpa login, tanpa download, cukup isi nama dan coba kalahkan high score lokal.
```

### 17.3 Open Graph
- Title.
- Description.
- Image preview.
- URL.
- Type: website.

### 17.4 Sitemap
Halaman statis:
- `/`
- `/play`
- `/leaderboard`
- `/how-to-play`
- `/settings`

### 17.5 Robots
Izinkan indexing halaman publik.
Tidak perlu index file internal asset.

---

## 18. Analytics Tanpa Tracking Berat

Untuk MVP, analytics tidak wajib.

Jika ingin analytics ringan:
- Gunakan Vercel Web Analytics.
- Tidak menyimpan data pribadi.
- Tidak perlu cookie custom.

Event internal lokal:
- total play count di localStorage.
- total deaths di localStorage.
- favorite mode di localStorage.

---

## 19. Acceptance Criteria

### 19.1 Landing Page
- [ ] Landing page tampil di mobile dan desktop.
- [ ] CTA “Main Sekarang” mengarah ke `/play`.
- [ ] High score lokal tampil jika ada.
- [ ] Tidak ada horizontal overflow.

### 19.2 Input Nama
- [ ] Modal muncul jika nama belum ada.
- [ ] Nama valid bisa disimpan.
- [ ] Nama invalid menampilkan error.
- [ ] Nama tersimpan setelah refresh.

### 19.3 Gameplay
- [ ] Player bisa bergerak kiri kanan.
- [ ] Player bisa lompat.
- [ ] Collision platform berjalan.
- [ ] Trap bisa membunuh player.
- [ ] Finish door menyelesaikan level.
- [ ] Restart level berfungsi.
- [ ] Pause berfungsi.

### 19.4 Mobile
- [ ] Tombol mobile muncul di HP.
- [ ] Tombol tidak menutupi HUD penting.
- [ ] Game tidak scroll saat tombol ditekan.
- [ ] Canvas tetap masuk layar.

### 19.5 Leaderboard Lokal
- [ ] Skor tersimpan setelah game selesai.
- [ ] Skor diurutkan dari tertinggi.
- [ ] Maksimal 20 skor tersimpan.
- [ ] Reset leaderboard berfungsi.

### 19.6 Deploy
- [ ] Build Next.js berhasil.
- [ ] Deploy Vercel berhasil.
- [ ] Tidak ada runtime error.
- [ ] Asset game termuat di production.

---

## 20. Risiko dan Mitigasi

### 20.1 Risiko: localStorage Dihapus
Mitigasi:
- Jelaskan bahwa skor tersimpan di perangkat.
- Tidak mengklaim leaderboard global.

### 20.2 Risiko: Mobile Lag
Mitigasi:
- Kurangi particle.
- Batasi jumlah obstacle.
- Gunakan sprite sederhana.
- Tambahkan low quality mode.

### 20.3 Risiko: Canvas Tidak Responsif
Mitigasi:
- Pakai Phaser Scale FIT.
- Buat wrapper CSS responsif.
- Test banyak viewport.

### 20.4 Risiko: Hydration Error Next.js
Mitigasi:
- Load Phaser hanya client-side.
- Pakai dynamic import `ssr: false`.
- Jangan akses `window` di server.

### 20.5 Risiko: Gameplay Terlalu Sulit
Mitigasi:
- Level awal mudah.
- Trap lucu tapi masih fair.
- Tambah checkpoint asli.
- Tambah difficulty curve.

---

## 21. Roadmap

### 21.1 Sprint 1 — Foundation
- Setup Next.js.
- Setup Tailwind.
- Setup Phaser.
- Buat landing.
- Buat route `/play`.
- Buat GameCanvas.

### 21.2 Sprint 2 — Core Gameplay
- Player movement.
- Collision.
- Level 1.
- Trap dasar.
- Finish door.
- Restart.

### 21.3 Sprint 3 — Scoring & Storage
- Input nama.
- Score formula.
- localStorage.
- Leaderboard lokal.
- Result modal.

### 21.4 Sprint 4 — Content
- Tambah 5 level.
- Tambah karakter.
- Tambah sound.
- Tambah animasi.

### 21.5 Sprint 5 — Polish
- Responsive testing.
- Mobile controls.
- Accessibility.
- SEO.
- Bug fix.
- Deploy Vercel.

---

## 22. Definisi Selesai

Project dianggap selesai jika:
1. Bisa dimainkan dari link Vercel.
2. Tidak perlu login.
3. Nama pemain bisa diisi.
4. Minimal 5 level playable.
5. Skor tersimpan lokal.
6. Leaderboard lokal berjalan.
7. Responsif di HP dan desktop.
8. Build production berhasil.
9. Tidak ada error console fatal.
10. Dokumentasi setup tersedia.

---

## 23. Catatan Implementasi Penting

### 23.1 Client Component untuk Game
Halaman game harus menggunakan client component untuk akses browser API.

### 23.2 Dynamic Import
Phaser sebaiknya di-load dinamis:
```ts
const GameCanvas = dynamic(() => import("@/components/game/GameCanvas"), {
  ssr: false,
})
```

### 23.3 Jangan Taruh Jawaban Sensitif
Karena tidak ada backend, semua data bisa dilihat user. Untuk game ini tidak masalah karena tidak ada jawaban rahasia.

### 23.4 Build Vercel
Pastikan asset path memakai `/sprites/...`, `/sounds/...`, bukan path relatif yang rusak.

### 23.5 PWA Optional
PWA bisa ditambahkan nanti agar game bisa “Install to Home Screen”, tetapi tidak wajib untuk MVP.

---

## 24. Appendix — Sample Level Data

```ts
export const levels = [
  {
    id: "level-01",
    name: "Tutorial Bohong",
    width: 2400,
    height: 720,
    spawn: { x: 120, y: 520 },
    finish: { x: 2200, y: 520, type: "real-door" },
    platforms: [
      { x: 0, y: 650, width: 900, height: 70, type: "solid" },
      { x: 900, y: 650, width: 220, height: 70, type: "falling", trigger: "on-step" },
      { x: 1120, y: 650, width: 1280, height: 70, type: "solid" }
    ],
    traps: [
      { id: "durian-01", type: "falling-durian", x: 780, y: 120, triggerX: 700 }
    ],
    coins: [
      { x: 400, y: 560 },
      { x: 620, y: 560 }
    ],
    messages: [
      { x: 350, y: 460, text: "Aman kok bro, percaya aja." }
    ]
  }
]
```

---

## 25. Appendix — Sample Storage Utility

```ts
const STORAGE_KEY = "jit.leaderboard.story"

export function saveScore(entry: LocalScoreEntry) {
  if (typeof window === "undefined") return

  const raw = localStorage.getItem(STORAGE_KEY)
  const scores = raw ? JSON.parse(raw) : []

  const nextScores = [...scores, entry]
    .sort((a, b) => b.score - a.score || a.durationMs - b.durationMs)
    .slice(0, 20)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextScores))
}
```

---

## 26. Final Product Statement

**Jangan Injak Itu!** adalah game web ringan, lucu, dan responsif yang bisa dimainkan siapa saja tanpa akun. Fokus produk adalah pengalaman bermain cepat, jebakan absurd, high score lokal, dan kemudahan deployment. MVP harus sederhana tetapi terlihat profesional: landing page bagus, gameplay stabil, mobile controls nyaman, dan skor tersimpan di browser.
