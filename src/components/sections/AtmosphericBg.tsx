"use client";

import { useEffect, useRef } from "react";

export function AtmosphericBg() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Grid parallax on scroll */
    const grid = document.getElementById("ws-bg-grid");
    const handleScroll = () => {
      if (!grid) return;
      grid.style.transform = `perspective(1000px) rotateX(74deg) translateY(${-30 + window.scrollY * 0.018}%)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    /* Cursor spotlight — gold radial glow follows mouse */
    const handleMouse = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth)  * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.background =
        `radial-gradient(circle 700px at ${x}% ${y}%, rgba(178,192,204,.09) 0%, transparent 70%)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      {/* Base radial + linear gradient */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(178,192,204,.14) 0%, transparent 65%), linear-gradient(180deg, #060606 0%, #040404 60%, #060606 100%)",
        }}
      />

      {/* Cursor-driven spotlight */}
      <div
        ref={glowRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, transition: "background .12s ease" }}
      />

      {/* Perspective gold grid */}
      <div
        id="ws-bg-grid"
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(178,192,204,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(178,192,204,.9) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(1000px) rotateX(74deg) translateY(-30%)",
          transformOrigin: "top center",
          willChange: "transform",
        }}
      />

      {/* Orb 1 */}
      <div aria-hidden className="fixed rounded-full pointer-events-none" style={{ zIndex: 3, width: 440, height: 440, background: "rgba(178,192,204,.1)", filter: "blur(90px)", mixBlendMode: "screen", top: -80, left: -120, animation: "orb1 22s ease-in-out infinite" }} />
      {/* Orb 2 */}
      <div aria-hidden className="fixed rounded-full pointer-events-none" style={{ zIndex: 3, width: 300, height: 300, background: "rgba(255,255,255,.04)", filter: "blur(90px)", mixBlendMode: "screen", bottom: "5%", right: -60, animation: "orb2 18s ease-in-out infinite" }} />
    </>
  );
}
