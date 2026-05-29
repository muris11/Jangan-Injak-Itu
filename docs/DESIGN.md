# design.md — Jangan Injak Itu!

> Dokumen desain UI/UX lengkap untuk game web “Jangan Injak Itu!”: responsive, mobile-first, arcade, lucu, absurd, dan siap diimplementasikan dengan Next.js, Tailwind CSS 4, Phaser 3, Framer Motion, dan localStorage.

---

## 1. Design Direction

### 1.1 Konsep Visual
Desain menggunakan gaya **Pixel Arcade Indonesia + Neon Chaos**. Visual harus terasa:
- lucu,
- cepat,
- energetic,
- chaotic,
- memorable,
- cocok untuk game jebakan,
- ramah mobile,
- tidak terlalu serius,
- mudah dipahami dalam 3 detik.

### 1.2 Kata Kunci Visual
- Arcade.
- Pixel.
- Neon.
- Absurd.
- Prank.
- Rage game.
- Local humor.
- Cepat.
- Gagal lagi.
- Coba lagi.

### 1.3 Mood
Game harus memberi rasa:
- “wah rame banget,”
- “ini game lucu,”
- “kelihatannya gampang,”
- “eh kok kena jebakan,”
- “gue mau coba lagi.”

### 1.4 Design Principles
1. **Mobile-first**: desain mulai dari layar HP.
2. **One clear action**: setiap layar punya CTA utama.
3. **Fast readability**: teks pendek dan jelas.
4. **High contrast**: game harus terlihat jelas.
5. **Big touch targets**: tombol nyaman disentuh.
6. **No clutter during gameplay**: HUD ringkas.
7. **Juicy feedback**: setiap aksi punya feedback visual/audio.
8. **Consistent chaos**: lucu dan ramai, tapi tetap terstruktur.

---

## 2. Brand Identity

### 2.1 Nama
**Jangan Injak Itu!**

### 2.2 Brand Personality
- Nakal.
- Lucu.
- Cepat.
- Sedikit ngeselin.
- Ramah.
- Tidak formal.
- Tidak toxic.

### 2.3 Voice and Tone
Gunakan bahasa santai:
- “Awas bro, lantainya ngambek.”
- “Kena jebakan lagi.”
- “Pintu itu mencurigakan.”
- “High score baru!”
- “Coba sekali lagi?”

Jangan gunakan bahasa kasar berlebihan.

### 2.4 UI Copy Rules
- Maksimal 1–2 kalimat per blok.
- CTA harus langsung.
- Error harus jelas.
- Humor digunakan pada level dan result.
- Instruksi utama jangan dibuat membingungkan.

Contoh:
```txt
Benar:
Masukkan nama dulu, bro.

Kurang baik:
Mohon melakukan proses identifikasi nama pengguna untuk melanjutkan sesi permainan.
```

---

## 3. Color System

### 3.1 Palette Utama

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-bg` | `#090A1A` | Background utama |
| `--color-bg-soft` | `#12142B` | Card, panel |
| `--color-surface` | `#1A1D3A` | Modal, HUD |
| `--color-primary` | `#FFE44D` | CTA utama, highlight |
| `--color-primary-dark` | `#E7B900` | Hover CTA |
| `--color-secondary` | `#00E5FF` | Accent cyan |
| `--color-purple` | `#9B5CFF` | Neon glow |
| `--color-danger` | `#FF3B5C` | Trap, error |
| `--color-success` | `#39FF88` | Menang, benar |
| `--color-warning` | `#FF9F1C` | Warning |
| `--color-text` | `#FFFFFF` | Teks utama |
| `--color-text-muted` | `#B8B9D6` | Teks sekunder |
| `--color-border` | `#32365F` | Border |

### 3.2 Background
Gunakan gradient:
```css
background:
  radial-gradient(circle at top left, rgba(155, 92, 255, 0.25), transparent 32rem),
  radial-gradient(circle at bottom right, rgba(0, 229, 255, 0.16), transparent 28rem),
  #090A1A;
```

### 3.3 CTA Color
CTA utama:
- background: kuning neon.
- text: hampir hitam.
- hover: kuning lebih gelap.
- shadow: glow kuning.

### 3.4 Danger Color
Trap dan warning:
- merah neon.
- jangan hanya mengandalkan warna; tambahkan bentuk spike, icon, atau animasi.

### 3.5 Color Accessibility
- Teks putih di background gelap.
- Teks kuning di background gelap boleh.
- Teks hitam di tombol kuning.
- Hindari teks merah kecil di background gelap tanpa kontras.

---

## 4. Typography

### 4.1 Font
Rekomendasi:
- Display: `Bungee`, `Press Start 2P`, atau font pixel lokal.
- Body: `Inter`, `Geist`, atau `Nunito Sans`.

Jika ingin performa bagus:
- Pakai `next/font`.
- Self-host font.
- Jangan import dari CDN runtime.

### 4.2 Font Pairing
| Elemen | Font | Weight |
|---|---|---|
| Logo | Pixel/Arcade font | 700 |
| Heading | Bungee/Geist | 700–900 |
| Body | Geist/Inter | 400–500 |
| Button | Geist/Inter | 700 |
| HUD | Pixel/monospace | 600–700 |

### 4.3 Type Scale Mobile
| Token | Size | Line Height |
|---|---:|---:|
| `text-xs` | 12px | 16px |
| `text-sm` | 14px | 20px |
| `text-base` | 16px | 24px |
| `text-lg` | 18px | 28px |
| `text-xl` | 20px | 28px |
| `text-2xl` | 24px | 32px |
| `text-3xl` | 30px | 36px |
| `hero-mobile` | 40px | 44px |

### 4.4 Type Scale Desktop
| Token | Size | Line Height |
|---|---:|---:|
| `hero-desktop` | 72px | 78px |
| `h1` | 56px | 64px |
| `h2` | 40px | 48px |
| `h3` | 28px | 36px |
| `body` | 16px | 26px |
| `caption` | 13px | 18px |

### 4.5 Text Shadow
Judul game boleh menggunakan shadow:
```css
text-shadow:
  0 0 12px rgba(255, 228, 77, .4),
  3px 3px 0 rgba(0,0,0,.65);
```

---

## 5. Spacing System

### 5.1 Base Unit
Gunakan 4px scale.

| Token | Size |
|---|---:|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |
| 20 | 80px |
| 24 | 96px |

### 5.2 Page Padding
Mobile:
```txt
padding-x: 16px
```

Tablet:
```txt
padding-x: 24px
```

Desktop:
```txt
padding-x: 40px–64px
```

### 5.3 Section Spacing
Mobile:
```txt
section-y: 64px
```

Desktop:
```txt
section-y: 96px–128px
```

---

## 6. Radius and Border

### 6.1 Radius Tokens
| Token | Size | Usage |
|---|---:|---|
| `radius-sm` | 8px | small chips |
| `radius-md` | 12px | input |
| `radius-lg` | 16px | button |
| `radius-xl` | 24px | card |
| `radius-2xl` | 32px | hero panels |
| `radius-full` | 999px | pill |

### 6.2 Border Style
Gunakan border pixel-neon:
```css
border: 1px solid rgba(255,255,255,.12);
box-shadow:
  inset 0 1px 0 rgba(255,255,255,.08),
  0 20px 60px rgba(0,0,0,.35);
```

### 6.3 Pixel Border Optional
Untuk card game:
```css
box-shadow:
  0 0 0 2px #32365F,
  0 0 0 5px rgba(0,229,255,.12),
  8px 8px 0 rgba(0,0,0,.45);
```

---

## 7. Layout System

### 7.1 Global Container
```css
.container-game {
  width: min(100% - 32px, 1180px);
  margin-inline: auto;
}
```

Desktop:
```css
width: min(100% - 80px, 1280px);
```

### 7.2 Grid
Mobile:
- 1 column.

Tablet:
- 2 columns.

Desktop:
- 12-column grid.

### 7.3 Z-Index
| Layer | z-index |
|---|---:|
| Background particles | 0 |
| Main content | 10 |
| Navbar | 50 |
| Game HUD | 80 |
| Mobile controls | 90 |
| Modal overlay | 100 |
| Toast | 120 |

---

## 8. Responsive Breakpoints

### 8.1 Tailwind Breakpoints
Gunakan default:
```txt
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Tambahkan custom jika perlu:
```css
@theme {
  --breakpoint-xs: 360px;
  --breakpoint-3xl: 1920px;
}
```

### 8.2 Mobile 320–430px
Prioritas:
- CTA full width.
- Hero text ringkas.
- Game canvas masuk layar.
- HUD compact.
- Tombol touch besar.
- Tidak ada horizontal scroll.

### 8.3 Tablet 768–1024px
Prioritas:
- Layout 2 kolom.
- Card lebih lega.
- Game canvas lebar.
- Controls touch tetap tersedia jika perangkat touch.

### 8.4 Desktop 1024px+
Prioritas:
- Hero split.
- Game frame centered.
- Leaderboard di samping atau bawah.
- HUD lengkap.
- Keyboard hint terlihat.

### 8.5 Large Desktop
Prioritas:
- Jangan terlalu melebar.
- Maksimal container 1280–1440px.
- Background boleh lebih dekoratif.
- Game canvas tetap punya maksimal width.

---

## 9. Page Design

## 9.1 Landing Page

### Layout Mobile
```txt
[Navbar]
[Hero Title]
[Subtitle]
[CTA Main]
[CTA Secondary]
[Game Preview Card]
[Feature Chips]
[How It Works]
[Local Leaderboard Preview]
[Footer]
```

### Layout Desktop
```txt
Navbar
┌─────────────────────┬──────────────────────┐
│ Hero Copy           │ Game Preview          │
│ CTA                 │ Fake Gameplay Frame   │
│ Badges              │ Local Score Preview   │
└─────────────────────┴──────────────────────┘
Feature Section
How to Play
Trap Showcase
Footer
```

### Hero Copy
Headline:
```txt
Jangan Injak Itu!
```

Subheadline:
```txt
Platformer jebakan absurd yang kelihatannya gampang, tapi lantainya suka bohong.
```

CTA:
```txt
Main Sekarang
```

Secondary:
```txt
Lihat Cara Main
```

Badges:
- Tanpa Login.
- Tanpa Download.
- Main di HP.
- High Score Lokal.

### Hero Visual
Komponen hero visual:
- Card frame mirip game.
- Player pixel.
- Lantai retak.
- Durian jatuh.
- Pintu finish glowing.
- Score HUD palsu.
- Tombol “Awas!” kecil.

### Landing Acceptance
- Hero terlihat dalam viewport pertama.
- CTA tidak tertutup.
- Tidak ada horizontal scroll.
- Background tidak mengganggu teks.
- Preview tetap proporsional di mobile.

---

## 9.2 Play Page

### Layout Mobile Portrait
```txt
[Top HUD: Score | Level | Pause]
[Canvas/Game Area]
[Left Controls]       [Jump Button]
```

### Layout Desktop
```txt
[Navbar compact]
[Game Header]
┌────────────────────────────┐
│        Game Canvas          │
└────────────────────────────┘
[Keyboard Hints] [Score Info]
```

### Requirements
- Navbar tidak terlalu tinggi.
- Game canvas menjadi fokus.
- Background luar canvas gelap.
- Saat bermain, elemen landing tidak tampil.
- Mobile controls overlay tetapi tidak menghalangi pemain.

### Game Frame
```css
.game-frame {
  aspect-ratio: 16 / 9;
  width: min(100%, 1100px);
  border-radius: 24px;
  overflow: hidden;
}
```

Mobile:
```css
.game-frame {
  aspect-ratio: 16 / 10;
  width: 100%;
}
```

---

## 9.3 Leaderboard Page

### Content
- Title: “Leaderboard Lokal”
- Subtitle: “Skor ini tersimpan di browser perangkat kamu.”
- Tabs: Story, Endless, One Life, Speedrun.
- Table ranking.
- Empty state.
- Reset button.

### Mobile Layout
Gunakan card list, bukan table penuh.

Card:
```txt
#1 Muris
Score 12.450
Level 8/10 · Death 17x · 04:12
```

### Desktop Layout
Gunakan table:
| Rank | Nama | Skor | Mode | Level | Death | Waktu |

### Empty State
```txt
Belum ada skor.
Main dulu, nanti nama kamu muncul di sini.
```

---

## 9.4 How To Play Page

### Sections
1. Cara main.
2. Kontrol desktop.
3. Kontrol mobile.
4. Sistem skor.
5. Tips menang.
6. Tentang penyimpanan skor lokal.

### Tone
Buat santai:
```txt
Jangan terlalu percaya lantai, pintu, koin, atau tulisan “aman”.
```

---

## 9.5 Settings Page

### Sections
- Player.
- Audio.
- Visual.
- Data lokal.

### Controls
- Input nama.
- Character select.
- Slider music volume.
- Slider SFX volume.
- Toggle mute.
- Toggle reduced motion.
- Reset leaderboard.
- Reset semua data.

### Danger Zone
Gunakan warna merah tetapi tetap jelas.
Konfirmasi reset wajib ada.

---

## 10. Component Design

## 10.1 Button

### Variants
- Primary.
- Secondary.
- Ghost.
- Danger.
- Pixel.

### Primary Button
```css
background: #FFE44D;
color: #090A1A;
border-radius: 16px;
font-weight: 800;
box-shadow: 0 0 24px rgba(255, 228, 77, .35);
```

### Sizes
| Size | Height | Padding |
|---|---:|---|
| sm | 36px | 12px |
| md | 44px | 16px |
| lg | 52px | 22px |
| xl | 60px | 28px |

Mobile CTA:
- width 100%.
- height minimal 52px.

### States
Default:
- normal.

Hover:
- translateY(-1px).
- shadow bigger.

Active:
- translateY(1px).
- shadow smaller.

Disabled:
- opacity 50%.
- cursor not allowed.

---

## 10.2 Card

### Base Card
```css
background: rgba(26,29,58,.75);
border: 1px solid rgba(255,255,255,.12);
border-radius: 24px;
backdrop-filter: blur(16px);
```

### Game Card
Lebih playful:
- border cyan.
- glow tipis.
- pixel shadow.
- decorative corner.

### Feature Card
Isi:
- Icon.
- Title.
- Description.
- Optional badge.

---

## 10.3 Modal

### Name Modal
Content:
- Title: “Nama kamu siapa, bro?”
- Input.
- Error text.
- Button “Gas Main”.
- Helper: “Nama cuma disimpan di browser kamu.”

Mobile:
- bottom sheet style jika layar kecil.
- width 100%.
- rounded top 24px.

Desktop:
- centered modal.
- max width 420px.

### Result Modal
Content:
- Win/lose state.
- Player name.
- Score besar.
- Level.
- Death.
- Time.
- CTA main lagi.
- CTA leaderboard.
- CTA share.

---

## 10.4 HUD

### Desktop HUD
```txt
Score 12.450 | Level 4/10 | Death 7x | Time 01:24 | Pause
```

### Mobile HUD
```txt
12.450   L4   01:24   [II]
```

### HUD Rules
- Tidak mengambil banyak tinggi.
- Selalu terbaca.
- Gunakan background semi-transparent.
- Fixed di dalam game area atau overlay atas.

---

## 10.5 Mobile Controls

### Layout
Kiri bawah:
- left button.
- right button.

Kanan bawah:
- jump button besar.

### Size
- Button minimal 64px pada mobile.
- Gap minimal 12px.
- Opacity 75–90%.
- Active state lebih terang.

### CSS
```css
.mobile-controls {
  position: fixed;
  inset-inline: 0;
  bottom: max(16px, env(safe-area-inset-bottom));
  pointer-events: none;
}

.mobile-controls button {
  pointer-events: auto;
  touch-action: none;
}
```

---

## 10.6 Toast

Toast dipakai untuk:
- “High score baru!”
- “Skor berhasil disimpan lokal.”
- “Data lokal direset.”
- “Hasil disalin.”

Position:
- Mobile: top center.
- Desktop: bottom right.

Duration:
- 2–3 detik.

---

## 11. Game Visual Design

### 11.1 World Style
- Background parallax sederhana.
- Platform pixel.
- Trap jelas.
- Finish door glowing.
- Koin berputar.
- Durian jatuh lucu.
- Kambing punya animasi charge.

### 11.2 Player Style
Player harus:
- kecil tapi terbaca.
- punya idle animation.
- punya run animation.
- punya jump frame.
- punya hurt animation.
- punya victory pose.

### 11.3 Trap Style
Trap harus:
- terlihat sedikit mencurigakan.
- punya anticipation frame.
- tidak muncul terlalu random tanpa clue.
- memberi efek lucu saat kena.

### 11.4 FX
Gunakan efek:
- screen shake kecil saat kena trap.
- dust saat landing.
- coin sparkle.
- door glow.
- confetti saat menang.
- red flash ringan saat mati.

### 11.5 Reduced Motion
Jika reduced motion aktif:
- Matikan screen shake.
- Kurangi particle.
- Kurangi flashing.
- Animasi tetap minimal.

---

## 12. Scene Design

### 12.1 Boot Scene
Fungsi:
- setup config.
- detect device.
- initialize settings.
- lanjut ke preload.

Visual:
- background gelap.
- logo kecil.

### 12.2 Preload Scene
Fungsi:
- load asset.
- tampilkan progress bar.

Visual:
```txt
Loading jebakan...
████████░░ 80%
```

### 12.3 Menu Scene
Jika menu ada di Phaser:
- Start.
- Character select.
- Mode select.

Namun untuk integrasi Next.js, menu bisa di React, sedangkan Phaser fokus gameplay.

### 12.4 Level Scene
Fungsi:
- render level.
- player physics.
- trap trigger.
- score.
- finish.

### 12.5 Game Over Scene
Bisa diganti React result modal.
Phaser mengirim event ke React:
```ts
gameEvents.emit("game-over", result)
```

---

## 13. Interaction Design

### 13.1 Feedback Saat Tombol Ditekan
- Button scale 0.98.
- Sound click kecil.
- Glow berubah.

### 13.2 Feedback Saat Player Lompat
- Dust kecil di kaki.
- Sound boing.
- Jump animation.

### 13.3 Feedback Saat Kena Trap
- Freeze 100ms.
- Screen shake kecil.
- Player hurt frame.
- Text: “Lah kok bisa?”
- Respawn.

### 13.4 Feedback Saat Finish
- Door flash.
- Confetti.
- Victory sound.
- Score breakdown.

### 13.5 Feedback Saat High Score
- Text besar.
- Crown icon.
- Glow kuning.
- Confetti.

---

## 14. Responsive Game Canvas Strategy

### 14.1 Base Resolution
Gunakan base logical resolution:
```ts
width: 1280
height: 720
```

### 14.2 Desktop Scale
- Fit inside container.
- Maintain 16:9.
- Center horizontally.
- Max width 1100–1280px.

### 14.3 Mobile Scale
Pilihan:
1. Gunakan 16:10 agar lebih tinggi.
2. Camera mengikuti player.
3. HUD compact.
4. Controls overlay di luar area gameplay jika memungkinkan.

### 14.4 Phaser Scale Config
```ts
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1280,
  height: 720,
  parent: "game-container"
}
```

### 14.5 Camera
- Camera follow player.
- Bounds sesuai level.
- Smooth follow.
- Zoom bisa berbeda per device.

Desktop:
```ts
camera.setZoom(1)
```

Mobile:
```ts
camera.setZoom(0.9)
```

Test manual diperlukan agar level tidak terasa terlalu kecil.

---

## 15. Tailwind Implementation

### 15.1 Global Theme
```css
@import "tailwindcss";

@theme {
  --color-bg: #090A1A;
  --color-bg-soft: #12142B;
  --color-surface: #1A1D3A;
  --color-primary: #FFE44D;
  --color-secondary: #00E5FF;
  --color-purple: #9B5CFF;
  --color-danger: #FF3B5C;
  --color-success: #39FF88;
  --color-muted: #B8B9D6;
}
```

### 15.2 Body
```css
html {
  scroll-behavior: smooth;
}

body {
  min-height: 100svh;
  background: #090A1A;
  color: white;
  overflow-x: hidden;
}
```

### 15.3 Safe Viewport
Gunakan `svh` untuk mobile:
```css
.min-safe-screen {
  min-height: 100svh;
}
```

### 15.4 Touch
```css
.game-touch-area {
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
```

---

## 16. Animation Guidelines

### 16.1 Landing Animation
Gunakan:
- Hero title fade-up.
- CTA pop.
- Preview card float.
- Trap icons wiggle.

Durasi:
- 300–700ms.
- Jangan terlalu lama.

### 16.2 Game UI Animation
- Result modal: scale + fade.
- Score count-up.
- Badge unlock: bounce.
- Toast: slide in.

### 16.3 Motion Rules
- Tidak semua elemen harus bergerak.
- Fokus pada feedback penting.
- Reduced motion harus dihormati.

### 16.4 Framer Motion Example
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
>
  Main Sekarang
</motion.div>
```

---

## 17. Sound Design

### 17.1 Sound List
| Event | Sound |
|---|---|
| Button click | click-soft.wav |
| Jump | jump-boing.wav |
| Coin | coin.wav |
| Trap hit | bonk.wav |
| Death | fail.wav |
| Finish level | finish.wav |
| High score | high-score.wav |
| Victory | victory.wav |

### 17.2 Music
- Loop pendek 30–60 detik.
- Arcade upbeat.
- Volume default 40%.
- Bisa dimute.

### 17.3 Audio UX
- Jangan autoplay musik sebelum interaksi user.
- Setelah user klik main, audio boleh mulai.
- Simpan setting mute di localStorage.

---

## 18. Iconography

### 18.1 Style
- Pixel icon.
- Stroke tebal.
- Bentuk sederhana.
- Cocok di ukuran kecil.

### 18.2 Icon Set
- Play.
- Pause.
- Restart.
- Volume.
- Muted.
- Trophy.
- Crown.
- Skull.
- Clock.
- Lightning.
- Door.
- Warning.

### 18.3 Usage
- Icon ditemani label untuk tombol penting.
- Icon-only boleh untuk pause/mute tetapi harus punya aria-label.

---

## 19. Empty, Error, and Loading States

### 19.1 Loading Game
Text:
```txt
Loading jebakan...
```

Subtext random:
```txt
Lantai sedang belajar bohong.
Durian sedang dipanaskan.
Kambing sedang charging.
```

### 19.2 Empty Leaderboard
```txt
Belum ada skor.
Main dulu, nanti nama kamu nongkrong di sini.
```

### 19.3 localStorage Error
```txt
Browser kamu memblokir penyimpanan lokal. Game tetap bisa dimainkan, tapi skor tidak akan tersimpan.
```

### 19.4 Asset Error
```txt
Asset game gagal dimuat. Coba refresh halaman.
```

### 19.5 Unsupported Browser
```txt
Browser kamu kurang mendukung game ini. Coba pakai Chrome, Edge, Firefox, atau Safari terbaru.
```

---

## 20. Accessibility Detail

### 20.1 Keyboard Navigation
- Semua tombol React bisa difokuskan.
- Fokus terlihat.
- Modal trap focus.
- Escape menutup modal jika aman.

### 20.2 ARIA
- Modal memakai `role="dialog"`.
- Button icon memakai `aria-label`.
- Score update tidak perlu terlalu sering diumumkan screen reader.
- Result modal bisa memakai `aria-live="polite"`.

### 20.3 Color Contrast
- Text utama minimal kontras baik.
- Text kecil jangan memakai muted terlalu gelap.
- Tombol danger punya label jelas.

### 20.4 Motion
- Respect `prefers-reduced-motion`.
- Toggle manual di settings.

### 20.5 Touch Accessibility
- Target minimal 44px, ideal 56–64px.
- Tidak ada tombol terlalu rapat.
- Hindari gesture kompleks.

---

## 21. Page-by-Page Component Checklist

### 21.1 Home
- [ ] Navbar.
- [ ] Logo.
- [ ] Hero title.
- [ ] Subtitle.
- [ ] CTA main.
- [ ] CTA how-to.
- [ ] Preview game.
- [ ] Feature chips.
- [ ] Trap showcase.
- [ ] Leaderboard preview.
- [ ] Footer.

### 21.2 Play
- [ ] Client-only GameCanvas.
- [ ] Name modal.
- [ ] Character select.
- [ ] HUD.
- [ ] Mobile controls.
- [ ] Pause overlay.
- [ ] Result modal.
- [ ] Error boundary.

### 21.3 Leaderboard
- [ ] Mode tabs.
- [ ] Ranking list.
- [ ] Empty state.
- [ ] Reset button.
- [ ] Explanation local storage.

### 21.4 How To Play
- [ ] Control guide.
- [ ] Scoring guide.
- [ ] Trap warning.
- [ ] Tips.
- [ ] CTA play.

### 21.5 Settings
- [ ] Name edit.
- [ ] Character select.
- [ ] Audio settings.
- [ ] Reduced motion.
- [ ] Reset data.

---

## 22. Responsive QA Matrix

### 22.1 Width 320px
- CTA tidak kepotong.
- Modal tidak keluar layar.
- Game controls tetap bisa ditekan.
- Tidak ada horizontal scroll.

### 22.2 Width 375px
- Hero readable.
- Game frame fit.
- Jump button tidak menutup player.

### 22.3 Width 430px
- Mobile layout lega.
- Leaderboard card nyaman.

### 22.4 Width 768px
- Tablet layout 2 kolom.
- Game frame centered.
- Touch controls optional.

### 22.5 Width 1024px
- Desktop layout aktif.
- Game frame maksimal.
- Keyboard hints tampil.

### 22.6 Width 1440px
- Container tidak terlalu lebar.
- Visual tetap fokus.

### 22.7 Height 568px
- HUD compact.
- Controls tidak menumpuk.
- Modal bisa scroll jika perlu.

### 22.8 iOS Safari
- Gunakan `100svh`.
- Safe area diperhatikan.
- Tidak ada bounce scroll saat game.

### 22.9 Android Chrome
- Touch controls stabil.
- Audio mulai setelah interaksi.
- Canvas tidak blur berlebihan.

---

## 23. UI Content

### 23.1 Landing Copy
```txt
Jangan Injak Itu!

Platformer jebakan absurd yang kelihatannya gampang, tapi lantainya suka bohong.

Tanpa login. Tanpa download. Cukup isi nama, main, dan coba jangan emosi.
```

### 23.2 Feature Copy
```txt
Jebakan Absurd
Lantai jatuh, pintu kabur, durian turun, dan kambing yang punya masalah pribadi.

High Score Lokal
Skor tersimpan di browser kamu. Cocok buat main gantian bareng teman.

Main di Mana Aja
HP, laptop, desktop, semuanya bisa. Yang penting jangan injak sembarangan.
```

### 23.3 Button Copy
- Main Sekarang.
- Gas Main.
- Coba Lagi.
- Lihat Leaderboard.
- Share Skor.
- Reset Level.
- Ganti Nama.
- Simpan.

### 23.4 Result Copy
Win:
```txt
Kamu menang!
Tapi jangan bangga dulu, lantainya masih dendam.
```

Lose:
```txt
Kena lagi, bro.
Jebakannya memang niat banget.
```

High score:
```txt
High Score Baru!
Nama kamu resmi jadi legenda lokal.
```

---

## 24. Visual Components Specification

### 24.1 Logo
Logo text:
```txt
Jangan Injak Itu!
```

Style:
- Bold.
- Pixel shadow.
- Yellow primary.
- Small warning sign optional.

### 24.2 Trap Showcase Card
Card menampilkan:
- Icon trap.
- Nama trap.
- Deskripsi pendek.

Contoh:
```txt
Lantai Pengkhianat
Kelihatannya solid, tapi mentalnya rapuh.
```

### 24.3 Score Badge
Score badge:
- Background gelap.
- Border kuning.
- Icon trophy.
- Score besar.

### 24.4 Character Card
States:
- Default.
- Hover.
- Selected.
- Locked optional future.

Selected:
- Border primary.
- Glow.
- Check mark.

---

## 25. Implementation Notes for Developers

### 25.1 Prevent SSR Issue
Jangan akses `window`, `document`, `localStorage`, atau `Phaser` di server component.

### 25.2 Client Boundary
Komponen berikut harus client:
- GameCanvas.
- NameModal.
- MobileControls.
- LocalLeaderboard.
- Settings forms.

### 25.3 Phaser Lifecycle
Saat komponen unmount:
```ts
game.destroy(true)
```

### 25.4 Resize Handling
- Listen resize.
- Update wrapper.
- Phaser Scale Manager menangani fit.
- Jangan membuat instance game baru setiap resize.

### 25.5 Event Bridge
Gunakan event emitter:
```ts
gameEvents.on("score-update", setScore)
gameEvents.on("game-over", openResultModal)
```

---

## 26. CSS Utility Examples

### 26.1 Neon Panel
```css
.neon-panel {
  background: rgba(18, 20, 43, .78);
  border: 1px solid rgba(0, 229, 255, .24);
  box-shadow:
    0 0 40px rgba(0, 229, 255, .10),
    inset 0 1px 0 rgba(255,255,255,.08);
  backdrop-filter: blur(18px);
}
```

### 26.2 Pixel Button
```css
.pixel-button {
  box-shadow:
    0 6px 0 #B88700,
    0 0 24px rgba(255, 228, 77, .35);
}

.pixel-button:active {
  transform: translateY(4px);
  box-shadow:
    0 2px 0 #B88700,
    0 0 16px rgba(255, 228, 77, .25);
}
```

### 26.3 Game Background
```css
.game-bg {
  background:
    linear-gradient(180deg, rgba(9,10,26,.2), rgba(9,10,26,1)),
    radial-gradient(circle at 20% 10%, rgba(155,92,255,.28), transparent 30rem),
    radial-gradient(circle at 80% 70%, rgba(0,229,255,.18), transparent 28rem),
    #090A1A;
}
```

---

## 27. Asset Guidelines

### 27.1 Sprite
- Gunakan sprite sheet.
- Ukuran karakter konsisten.
- Export @2x untuk ketajaman.
- Nama file lowercase kebab-case.

Contoh:
```txt
player-bro-idle.png
player-bro-run.png
trap-durian.png
door-finish.png
```

### 27.2 Audio
- Format `.mp3` atau `.ogg`.
- Ukuran kecil.
- Loop musik tidak lebih dari 2 MB untuk MVP.
- SFX pendek.

### 27.3 Images
- Background WebP.
- Preview image WebP.
- Icon SVG jika bukan pixel sprite.

---

## 28. Microcopy Random

### 28.1 Loading Text
- “Loading jebakan…”
- “Lantai sedang pura-pura aman…”
- “Kambing sedang pemanasan…”
- “Pintu finish sedang kabur…”

### 28.2 Death Text
- “Lah.”
- “Bro, itu jebakan.”
- “Kok percaya?”
- “Lantainya tidak setia.”
- “Durian 1, kamu 0.”
- “Kambingnya personal banget.”

### 28.3 Restart Text
- “Coba Lagi”
- “Balas Dendam”
- “Gas Ulang”
- “Sekali Lagi”

---

## 29. Final Visual Acceptance Criteria

### 29.1 Mobile
- [ ] Semua CTA bisa ditekan mudah.
- [ ] Game tidak keluar layar.
- [ ] Mobile controls tidak menutupi HUD.
- [ ] Text minimal 14px kecuali label kecil.
- [ ] Tidak ada horizontal scroll.
- [ ] Modal nyaman di layar kecil.

### 29.2 Desktop
- [ ] Hero terlihat premium.
- [ ] Canvas centered.
- [ ] Keyboard hints jelas.
- [ ] Tidak ada layout terlalu melebar.
- [ ] Background dekoratif tidak mengganggu.

### 29.3 Game
- [ ] Player terlihat jelas.
- [ ] Trap terlihat jelas.
- [ ] Finish door terlihat sebagai goal.
- [ ] Score terbaca.
- [ ] Death feedback terasa.
- [ ] Win feedback memuaskan.

### 29.4 Brand
- [ ] Lucu tapi tetap rapi.
- [ ] Arcade tapi tidak norak berlebihan.
- [ ] Warna konsisten.
- [ ] Typography konsisten.
- [ ] Copywriting konsisten.

---

## 30. Final Design Summary

Desain **Jangan Injak Itu!** harus terasa seperti game arcade web yang ringan, lucu, dan cepat dimainkan. UI dibuat gelap-neon agar game terlihat hidup, tombol dibuat besar agar nyaman di HP, dan game canvas harus responsif di semua perangkat. Fokus utama bukan kompleksitas fitur, tetapi pengalaman bermain yang langsung seru: isi nama, pilih karakter, main, kena jebakan, ketawa, ulang lagi, lalu kejar high score lokal.
