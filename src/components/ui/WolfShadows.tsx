"use client";

import { useState, useEffect } from "react";

/* ─── Front-facing wolf SVG ──────────────────────────────────────
   Portrait orientation — wolf charging toward the viewer.
   Heavy blur on distant instances fuses shapes into atmosphere.
   Minimal blur on the closest instance reveals the silhouette.
────────────────────────────────────────────────────────────────── */
function WolfFront({ width }: { width: number }) {
  const h = Math.round(width * (520 / 320));
  return (
    <svg
      viewBox="0 0 320 520"
      width={width}
      height={h}
      fill="currentColor"
      aria-hidden
    >
      {/* ── HEAD ── */}
      <ellipse cx="160" cy="108" rx="80" ry="74" />
      {/* Left ear — sharp triangle */}
      <polygon points="82,64 76,4 122,60" />
      {/* Right ear */}
      <polygon points="238,64 244,4 198,60" />
      {/* Muzzle / snout */}
      <ellipse cx="160" cy="133" rx="52" ry="40" />
      {/* Lower jaw */}
      <ellipse cx="160" cy="156" rx="43" ry="24" />
      {/* Nose bridge */}
      <ellipse cx="160" cy="108" rx="20" ry="15" />

      {/* ── NECK ── */}
      <ellipse cx="160" cy="196" rx="44" ry="43" />

      {/* ── CHEST + SHOULDERS ── */}
      <ellipse cx="64"  cy="244" rx="56" ry="68" />
      <ellipse cx="256" cy="244" rx="56" ry="68" />
      <ellipse cx="160" cy="260" rx="98" ry="82" />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="346" rx="70" ry="73" />

      {/* ── FRONT LEFT LEG ── */}
      <rect x="49"  y="296" width="24" height="118" rx="12"
            transform="rotate(-14 61 296)" />
      <ellipse cx="38"  cy="410" rx="23" ry="14" />

      {/* ── FRONT RIGHT LEG ── */}
      <rect x="247" y="296" width="24" height="118" rx="12"
            transform="rotate(14 259 296)" />
      <ellipse cx="282" cy="410" rx="23" ry="14" />

      {/* ── HAUNCHES ── */}
      <ellipse cx="106" cy="396" rx="50" ry="45" />
      <ellipse cx="214" cy="396" rx="50" ry="45" />

      {/* ── REAR LEGS ── */}
      <rect x="82"  y="430" width="20" height="74" rx="10"
            transform="rotate(-10 92 430)" />
      <ellipse cx="75"  cy="502" rx="20" ry="12" />
      <rect x="218" y="430" width="20" height="74" rx="10"
            transform="rotate(10 228 430)" />
      <ellipse cx="245" cy="502" rx="20" ry="12" />
    </svg>
  );
}

/* ─── Pack — three wolves at increasing depth ───────────────────
   Smallest = most distant (high blur, low opacity)
   Largest  = closest to viewer (sharp, stronger opacity)
────────────────────────────────────────────────────────────────── */
const PACK = [
  {
    width: 155,
    left: "64%",
    bottom: "16%",
    opacity: 0.038,
    blur: 20,
    animDur: "0.63s",
    animDelay: "0.2s",
    fadeDelay: "0.4s",
  },
  {
    width: 290,
    left: "6%",
    bottom: "5%",
    opacity: 0.056,
    blur: 10,
    animDur: "0.56s",
    animDelay: "0.1s",
    fadeDelay: "0.2s",
  },
  {
    width: 455,
    left: "29%",
    bottom: "-4%",
    opacity: 0.080,
    blur: 4,
    animDur: "0.50s",
    animDelay: "0s",
    fadeDelay: "0s",
  },
] as const;

export function WolfShadows() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {PACK.map((w, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: w.left,
            bottom: w.bottom,
            color: "rgb(242, 222, 162)",
            filter: `blur(${w.blur}px)`,
            opacity: visible ? w.opacity : 0,
            transition: `opacity 4s ease ${w.fadeDelay}`,
            willChange: "transform",
            animation: visible
              ? `wolfGallop ${w.animDur} ease-in-out infinite ${w.animDelay}`
              : "none",
          }}
        >
          <WolfFront width={w.width} />
        </div>
      ))}
    </div>
  );
}
