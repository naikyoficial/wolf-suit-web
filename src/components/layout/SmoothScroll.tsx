"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LenisContext } from "@/contexts/LenisContext";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Native scroll on mobile is better — Lenis adds jank on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const l = new Lenis({ lerp: 0.12 });
    setLenis(l);

    let rafId: number;
    function raf(time: number) {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
