"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayIcon } from "@/components/ui/Icons";

export function HeroCopy() {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
      <div className="mb-6 flex flex-wrap gap-2">
        {["Tanpa Login", "Tanpa Download", "Main di HP", "High Score Lokal"].map((item) => (
          <span className="chip" key={item}><span className="chip-dot" />{item}</span>
        ))}
      </div>
      <p className="mb-3 text-sm font-black uppercase tracking-[.28em] text-secondary">Arcade trap platformer</p>
      <h1 className="display-font hero-title">Jangan<br/>Injak Itu!</h1>
      <p className="gradient-text mt-5 max-w-xl text-lg leading-relaxed sm:text-xl">
        Platformer jebakan absurd yang kelihatannya gampang, tetapi lantainya suka bohong.
      </p>
      <p className="mt-4 max-w-lg text-sm leading-7 text-muted sm:text-base">
        Isi nama, pilih karakter, lalu hindari durian, pintu palsu, kambing marah, dan jebakan lain yang terlalu niat.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link className="primary-button w-full sm:w-auto" href="/play">
          <PlayIcon className="h-5 w-5" />
          Main Sekarang
        </Link>
        <Link className="secondary-button w-full sm:w-auto" href="/how-to-play">Lihat Cara Main</Link>
      </div>
    </motion.div>
  );
}
