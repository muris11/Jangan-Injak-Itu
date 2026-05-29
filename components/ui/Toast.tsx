"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -8, x: "-50%" }}
          className="toast"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
