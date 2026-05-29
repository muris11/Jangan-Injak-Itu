import type { Metadata } from "next";
import { Suspense } from "react";
import { LeaderboardClient } from "@/components/leaderboard/LeaderboardClient";

export const metadata: Metadata = { title: "Leaderboard Lokal" };

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<main className="container-game min-h-[70svh] py-14 text-muted">Membuka ranking...</main>}>
      <LeaderboardClient />
    </Suspense>
  );
}
