import type { GameMode } from "@/types/game";

export const modes: Array<{ id: GameMode; name: string; label: string; description: string }> = [
  { id: "story", name: "Story Trap", label: "10 Level", description: "Selesaikan seluruh prank dari lantai pengkhianat sampai boss." },
  { id: "endless", name: "Endless Chaos", label: "Survival", description: "Bergerak sejauh mungkin sebelum jebakan merobohkan harapan." },
  { id: "one-life", name: "One Life", label: "Hardcore", description: "Satu kesalahan, langsung tamat. Bonus skor lebih tinggi." },
  { id: "speedrun", name: "Speedrun", label: "Time Attack", description: "Tamatkan 10 level secepat mungkin dengan penalti kematian." },
  { id: "multi", name: "Multiplayer", label: "Online", description: "Balapan real-time dengan hingga 10 pemain. Yang pertama finish menang!" },
];

export const trapShowcase = [
  { name: "Lantai Pengkhianat", text: "Kelihatannya kokoh, tetapi jatuh tepat saat kamu percaya." },
  { name: "Durian Orbit", text: "Jatuh dari atas ketika kamu terlalu sibuk mengejar koin." },
  { name: "Pintu Kabur", text: "Glowing bukan berarti tujuan yang benar." },
  { name: "Kambing Pribadi", text: "Menyerudukmu seperti ada masalah dari masa lalu." },
];
