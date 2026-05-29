import type { Metadata } from "next";
import { Suspense } from "react";
import { PlayClient } from "@/components/game/PlayClient";

export const metadata: Metadata = {
  title: "Main",
  description: "Pilih karakter dan mainkan game platformer jebakan absurd tanpa login.",
};

export default function PlayPage() {
  return (
    <Suspense fallback={<main className="container-game grid min-h-[70svh] place-items-center text-muted">Menyiapkan jebakan...</main>}>
      <PlayClient />
    </Suspense>
  );
}
