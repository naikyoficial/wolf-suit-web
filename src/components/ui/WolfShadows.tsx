"use client";

import { useRef, useEffect, useState } from "react";

/* ─── Single wolf SVG built from simple shapes ─────────────────
   Heavy blur at render time fuses the shapes into a smooth silhouette.
   Wolf faces right, mid-gallop.
──────────────────────────────────────────────────────────────── */
function WolfShape({ width }: { width: number }) {
  return (
    <svg
      viewBox="0 0 300 180"
      width={width}
      height={Math.round(width * 0.6)}
      fill="currentColor"
      aria-hidden
    >
      {/* Body */}
      <ellipse cx="150" cy="96" rx="112" ry="30" />
      {/* Neck */}
      <ellipse cx="246" cy="80" rx="22" ry="26" />
      {/* Head */}
      <circle cx="266" cy="63" r="27" />
      {/* Ear */}
      <polygon points="252,42 261,15 275,42" />
      {/* Snout */}
      <ellipse cx="290" cy="70" rx="18" ry="12" />
      {/* Tail — curves up from rear */}
      <path d="M 42,88 C 26,80 10,63 7,49 C 3,35 11,25 20,23 C 24,22 28,25 27,29 C 18,33 16,45 22,56 C 29,70 47,80 54,85 Z" />
      {/* Rear leg — forward (left in gallop) */}
      <rect x="96"  y="112" width="16" height="55" rx="8" transform="rotate(-14 104 112)" />
      {/* Rear leg — backward (right in gallop) */}
      <rect x="70"  y="114" width="16" height="55" rx="8" transform="rotate(18 78 114)" />
      {/* Front leg — forward */}
      <rect x="210" y="116" width="16" height="55" rx="8" transform="rotate(-12 218 116)" />
      {/* Front leg — backward */}
      <rect x="188" y="114" width="16" height="57" rx="8" transform="rotate(16 196 114)" />
    </svg>
  );
}

/* ─── Wolf instances — large=distant, small=close ── */
const WOLVES = [
  { width: 620, left:  -6, top: 36, opacity: 0.032, blur: 18, parallax: 0.06 },
  { width: 410, left:  16, top: 42, opacity: 0.048, blur: 12, parallax: 0.10 },
  { width: 245, left:  38, top: 48, opacity: 0.068, blur:  7, parallax: 0.16 },
];

export function WolfShadows() {
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const wolfRefs = [ref0, ref1, ref2];

  const [visible, setVisible] = useState(false);

  /* Fade in after preloader exits */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3800);
    return () => clearTimeout(t);
  }, []);

  /* Parallax on scroll */
  useEffect(() => {
    const handle = () => {
      const sy = window.scrollY;
      wolfRefs.forEach((ref, i) => {
        const wolf = WOLVES[i];
        if (!ref.current || !wolf) return;
        const offset = sy * wolf.parallax;
        ref.current.style.transform = `translateY(calc(-50% + ${offset}px))`;
      });
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {WOLVES.map((w, i) => (
        <div
          key={i}
          ref={wolfRefs[i]}
          style={{
            position: "absolute",
            left: `${w.left}%`,
            top: `${w.top}%`,
            transform: "translateY(-50%)",
            opacity: visible ? w.opacity : 0,
            filter: `blur(${w.blur}px)`,
            color: "rgb(235, 215, 170)",
            transition: "opacity 3.5s ease",
            willChange: "transform",
          }}
        >
          <WolfShape width={w.width} />
        </div>
      ))}
    </div>
  );
}
