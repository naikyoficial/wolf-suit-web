"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafRef  = useRef<number>(0);

  const [active,  setActive]  = useState(false); // hovering interactive
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    /* Lerp ring toward mouse each frame */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.11);
      if (ringRef.current) {
        const s = active ? 28 : 19;
        ringRef.current.style.transform = `translate(${ring.current.x - s}px, ${ring.current.y - s}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* Detect hover on interactive elements */
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    const bind = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [active, visible]);

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "var(--color-gold)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: "opacity .4s",
          willChange: "transform",
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width:  active ? 56 : 38,
          height: active ? 56 : 38,
          borderRadius: "50%",
          border: `1px solid rgba(201,164,90,${active ? .85 : .45})`,
          pointerEvents: "none",
          zIndex: 99997,
          opacity: visible ? 1 : 0,
          transition: "opacity .4s, width .35s cubic-bezier(.16,1,.3,1), height .35s cubic-bezier(.16,1,.3,1), border-color .35s",
          mixBlendMode: "exclusion",
          willChange: "transform",
        }}
      />
    </>
  );
}
