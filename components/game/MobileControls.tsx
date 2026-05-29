/* eslint-disable react-hooks/set-state-in-effect -- Pointer capability exists only after browser mount. */
"use client";

import { useEffect, useState } from "react";
import { dispatchControl } from "@/game/controls";

export function MobileControls({ opacity }: { opacity: number }) {
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    setTouchDevice(window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);
  }, []);

  if (!touchDevice) return null;

  const hold = (action: "left" | "right", pressed: boolean) => dispatchControl({ action, pressed });
  const jump = (pressed: boolean) => dispatchControl({ action: "jump", pressed });

  return (
    <div className="mobile-controls" style={{ opacity }} aria-label="Kontrol sentuh">
      <div className="mobile-control-cluster">
        <button type="button" className="mobile-control-button"
          onPointerDown={() => hold("left", true)} onPointerUp={() => hold("left", false)}
          onPointerLeave={() => hold("left", false)} onPointerCancel={() => hold("left", false)}
          aria-label="Bergerak ke kiri">←</button>
        <button type="button" className="mobile-control-button"
          onPointerDown={() => hold("right", true)} onPointerUp={() => hold("right", false)}
          onPointerLeave={() => hold("right", false)} onPointerCancel={() => hold("right", false)}
          aria-label="Bergerak ke kanan">→</button>
      </div>
      <button type="button" className="mobile-control-button jump"
        onPointerDown={() => jump(true)} onPointerUp={() => jump(false)}
        onPointerLeave={() => jump(false)} onPointerCancel={() => jump(false)}
        aria-label="Lompat">JUMP</button>
    </div>
  );
}
