import type { GameSettings } from "@/types/game";

export type SoundKind = "jump" | "coin" | "hit" | "finish" | "click" | "high-score";

export function playTone(kind: SoundKind, settings: GameSettings): void {
  if (settings.muted || typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const map: Record<SoundKind, { frequency: number; duration: number; type: OscillatorType }> = {
      jump: { frequency: 350, duration: 0.08, type: "square" },
      coin: { frequency: 740, duration: 0.11, type: "triangle" },
      hit: { frequency: 120, duration: 0.17, type: "sawtooth" },
      finish: { frequency: 520, duration: 0.24, type: "triangle" },
      click: { frequency: 260, duration: 0.04, type: "square" },
      "high-score": { frequency: 880, duration: 0.3, type: "triangle" },
    };
    const tone = map[kind];
    oscillator.type = tone.type;
    oscillator.frequency.value = tone.frequency;
    gain.gain.value = settings.sfxVolume * 0.13;
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + tone.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + tone.duration);
    oscillator.addEventListener("ended", () => void context.close());
  } catch {
    // Audio is enhancement only; gameplay must continue if blocked.
  }
}
