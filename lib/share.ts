import type { GameResult } from "@/types/game";
import { formatScore } from "@/lib/storage";

export function createShareText(result: GameResult): string {
  return [
    "Aku main Jangan Injak Itu!",
    `Nama: ${result.playerName}`,
    `Skor: ${formatScore(result.score)}`,
    `Level: ${result.completedLevels}/${result.mode === "endless" ? "∞" : "10"}`,
    `Mati: ${result.deaths}x`,
    "",
    "Berani kalahin skor aku?",
  ].join("\n");
}

export async function shareResult(result: GameResult): Promise<"shared" | "copied" | "failed"> {
  const text = createShareText(result);
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: "Jangan Injak Itu!", text });
      return "shared";
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return "copied";
    }
  } catch {
    return "failed";
  }
  return "failed";
}
