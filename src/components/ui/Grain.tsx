"use client";

import { useEffect, useRef, useState } from "react";

export function Grain() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // The per-frame re-seed of an SVG fractalNoise filter is far too expensive
    // for mobile GPUs — keep a static grain there, animate only on desktop.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    let seed = 0;
    let frame = 0;
    let rafId: number;

    const tick = () => {
      frame++;
      if (frame % 3 === 0) {           // ~20 fps grain flicker
        seed = (seed + 1) % 80;
        turbRef.current?.setAttribute("seed", String(seed));
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animate]);

  return (
    <div
      aria-hidden
      className="grain-overlay fixed inset-0 pointer-events-none"
      style={{ zIndex: 9992, opacity: 0.055, mixBlendMode: "overlay" }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.62"
              numOctaves="4"
              seed="0"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feBlend in="SourceGraphic" in2="gray" mode="overlay" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
