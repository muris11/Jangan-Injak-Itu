import type { LevelDefinition } from "@/types/game";

export const multiplayerLevels: LevelDefinition[] = [
  {
    id: "multi-1",
    name: "Balapan Perdana",
    prankMessage: "10 pemain start bareng, yang pertama finish menang!",
    worldWidth: 4800,
    floorSegments: [
      { x: 0, width: 600 },
      { x: 750, width: 400 },
      { x: 1300, width: 300 },
      { x: 1700, width: 500 },
      { x: 2300, width: 300 },
      { x: 2700, width: 400 },
      { x: 3200, width: 300, falling: true },
      { x: 3600, width: 500 },
      { x: 4200, width: 600 },
    ],
    platforms: [
      { x: 600, y: 520, width: 120 },
      { x: 1150, y: 480, width: 200 },
      { x: 1600, y: 540, width: 100 },
      { x: 2000, y: 500, width: 160, moving: true },
      { x: 2500, y: 460, width: 100 },
      { x: 3000, y: 520, width: 120 },
    ],
    spikes: [
      { x: 820, y: 609 }, { x: 1780, y: 609 },
      { x: 2800, y: 609 }, { x: 3800, y: 609 },
    ],
    coins: [
      { x: 600, y: 500 }, { x: 1150, y: 460 },
      { x: 1600, y: 520 }, { x: 2000, y: 470 },
      { x: 2500, y: 440 }, { x: 3000, y: 490 },
    ],
    durians: [
      { x: 1400, triggerX: 1200 },
      { x: 2400, triggerX: 2200 },
    ],
    goats: [
      { x: 1800, y: 595, minX: 1700, maxX: 2100 },
    ],
  },
  {
    id: "multi-2",
    name: "Jurang Kepanikan",
    prankMessage: "Semakin cepat, semakin banyak jebakan.",
    worldWidth: 5400,
    floorSegments: [
      { x: 0, width: 400 }, { x: 500, width: 200 },
      { x: 800, width: 300 }, { x: 1200, width: 250 },
      { x: 1550, width: 350 }, { x: 2000, width: 200 },
      { x: 2300, width: 400 }, { x: 2800, width: 200, falling: true },
      { x: 3100, width: 300 }, { x: 3500, width: 200 },
      { x: 3800, width: 500 }, { x: 4400, width: 200 },
      { x: 4700, width: 700 },
    ],
    platforms: [
      { x: 400, y: 530, width: 100 }, { x: 700, y: 480, width: 120 },
      { x: 1050, y: 520, width: 160 }, { x: 1450, y: 460, width: 100, moving: true },
      { x: 1900, y: 540, width: 140 }, { x: 2600, y: 480, width: 100 },
      { x: 3300, y: 520, width: 120, moving: true }, { x: 4200, y: 480, width: 100 },
      { x: 4500, y: 540, width: 200 },
    ],
    spikes: [
      { x: 550, y: 609 }, { x: 850, y: 609 }, { x: 1250, y: 609 },
      { x: 2100, y: 609 }, { x: 2850, y: 609 }, { x: 4500, y: 609 },
    ],
    coins: [
      { x: 400, y: 510 }, { x: 700, y: 460 }, { x: 1050, y: 500 },
      { x: 1900, y: 520 }, { x: 2600, y: 460 }, { x: 3300, y: 500 },
    ],
    durians: [
      { x: 1000, triggerX: 850 },
      { x: 3000, triggerX: 2800 },
    ],
    dark: true,
  },
  {
    id: "multi-3",
    name: "Final Bencana",
    prankMessage: "Tidak ada yang aman di sini. Gas pol!",
    worldWidth: 6200,
    floorSegments: [
      { x: 0, width: 500 }, { x: 650, width: 300 },
      { x: 1100, width: 200 }, { x: 1400, width: 400 },
      { x: 1900, width: 250 }, { x: 2300, width: 300, falling: true },
      { x: 2700, width: 200 }, { x: 3000, width: 350 },
      { x: 3450, width: 200 }, { x: 3750, width: 300 },
      { x: 4150, width: 250 }, { x: 4500, width: 400 },
      { x: 5000, width: 200 }, { x: 5300, width: 900 },
    ],
    platforms: [
      { x: 500, y: 500, width: 160 }, { x: 950, y: 460, width: 100 },
      { x: 1300, y: 540, width: 120 }, { x: 1750, y: 480, width: 100 },
      { x: 2200, y: 520, width: 140, moving: true }, { x: 2600, y: 460, width: 100 },
      { x: 3350, y: 520, width: 120 }, { x: 3650, y: 460, width: 100, moving: true },
      { x: 4050, y: 540, width: 140 }, { x: 4900, y: 480, width: 100 },
    ],
    spikes: [
      { x: 700, y: 609 }, { x: 1150, y: 609 }, { x: 1950, y: 609 },
      { x: 2750, y: 609 }, { x: 3500, y: 609 }, { x: 4200, y: 609 },
      { x: 4600, y: 609 }, { x: 5100, y: 609 },
    ],
    coins: [
      { x: 500, y: 480 }, { x: 1300, y: 520 },
      { x: 2200, y: 490 }, { x: 3350, y: 500 },
      { x: 4050, y: 520 }, { x: 4900, y: 460 },
    ],
    durians: [
      { x: 1600, triggerX: 1400 }, { x: 3200, triggerX: 3000 },
      { x: 4800, triggerX: 4600 },
    ],
    goats: [
      { x: 2900, y: 645, minX: 2800, maxX: 3200 },
    ],
    gravityZone: { startX: 3800, endX: 4200 },
  },
];

export const totalMultiplayerLevels = multiplayerLevels.length;
