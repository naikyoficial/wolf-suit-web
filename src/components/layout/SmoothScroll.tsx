"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { LenisContext } from "@/contexts/LenisContext";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

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

    // Lenis caches the max scroll distance (`limit`) from the content height.
    // On article pages the height keeps growing AFTER init — the preloader is
    // still up for ~2.2s and web fonts (display:swap) reflow the text. If Lenis
    // measured early, the wheel scroll locks partway down. Force re-measures as
    // the content settles so the limit always reflects the final height.
    const resize = () => l.resize();
    const timers = [100, 400, 900, 1600, 2600].map((ms) => setTimeout(resize, ms));
    window.addEventListener("load", resize);
    if (document.fonts?.ready) document.fonts.ready.then(resize);
    // Catch any later layout shifts (images, expanding sections).
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", resize);
      ro.disconnect();
      l.destroy();
      setLenis(null);
    };
  }, []);

  // On client-side navigation the layout (and Lenis) stays mounted, so reset the
  // scroll position to the top of the new page and re-measure its height.
  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const t = setTimeout(() => lenis.resize(), 100);
    return () => clearTimeout(t);
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
