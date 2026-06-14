"use client";

import { useEffect, useRef } from "react";

export function AtmosphericBg() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth)  * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.background =
        `radial-gradient(circle 600px at ${x}% ${y}%, rgba(212,160,32,.07) 0%, transparent 70%)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* Base gradient */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,160,32,.08) 0%, transparent 65%), linear-gradient(180deg, #060606 0%, #040404 60%, #060606 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        ref={glowRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, transition: "background .14s ease" }}
      />
    </>
  );
}
