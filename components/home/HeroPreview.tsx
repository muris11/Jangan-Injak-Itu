"use client";

import { motion } from "framer-motion";

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="game-preview neon-panel pixel-panel p-4 sm:p-5"
      aria-hidden="true"
    >
      <div className="mb-3 flex justify-between text-[11px] font-black uppercase tracking-[.15em] text-muted">
        <span>Level 04 · Kambing Marah</span>
        <span className="text-primary">Score 12.450</span>
      </div>
      <div className="absolute left-6 top-16 rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-[11px] font-bold text-danger">
        AWAS BRO!
      </div>
      <div className="preview-skyline" />
      <div className="preview-durian" />
      <div className="preview-door" />
      <div className="preview-player" />
      <div className="preview-floor" />
      <div className="absolute bottom-[4%] left-4 right-4 flex justify-between text-[11px] font-semibold text-muted sm:text-xs">
        <span>← A / D →</span>
        <span>SPACE = LOMPAT</span>
        <span className="text-success">FINISH?</span>
      </div>
    </motion.div>
  );
}
