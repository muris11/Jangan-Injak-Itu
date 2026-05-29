import type { Character } from "@/types/game";

export const characters: Character[] = [
  { id: "bro", name: "Si Bro Pixel", description: "Pahlawan kaos kuning yang terlalu percaya lantai.", bodyColor: 0xffe44d, accentColor: 0x00e5ff },
  { id: "oren", name: "Kucing Oren", description: "Lincah, lucu, dan sering bikin masalah sendiri.", bodyColor: 0xff9f1c, accentColor: 0xffffff },
  { id: "ayam", name: "Ayam Kabur", description: "Tidak takut trap, hanya takut digoreng.", bodyColor: 0xfff2cc, accentColor: 0xff3b5c },
  { id: "tahu", name: "Tahu Bulat", description: "Bulat, nekat, dan belum tentu aman mendarat.", bodyColor: 0xffd477, accentColor: 0xff3b5c },
  { id: "helm", name: "Helm Proyek", description: "Safety first, nasib belakangan.", bodyColor: 0x00e5ff, accentColor: 0xffe44d },
];

export function getCharacter(id: string | null | undefined): Character {
  return characters.find((character) => character.id === id) ?? characters[0];
}
