"use client";

import { useEffect, useState } from "react";

export function LandscapeOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile) return;

    const mq = window.matchMedia("(orientation: portrait)");
    const handler = () => setShow(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="landscape-overlay">
      <div className="landscape-icon">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <g className="landscape-phone-group">
            <rect x="30" y="12" width="40" height="76" rx="7"
              stroke="#FFE44D" strokeWidth="3.5" fill="none" />
            <circle cx="50" cy="80" r="3" fill="#FFE44D" />
            <rect x="45" y="18" width="10" height="4" rx="1.5" fill="#FFE44D" opacity="0.3" />
          </g>
          <path className="landscape-arrow-path"
            d="M78 20 A35 35 0 1 1 40 10"
            stroke="#00E5FF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path className="landscape-arrow-head"
            d="M75 18 L79 10 L83 18"
            stroke="#00E5FF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="landscape-text">Putar HP ke posisi landscape</p>
      <p className="landscape-sub">Rotate your phone to landscape mode</p>
    </div>
  );
}
