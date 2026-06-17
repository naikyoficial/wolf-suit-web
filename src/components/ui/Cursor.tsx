"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ringRef    = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const mouse      = useRef({ x: -200, y: -200 });
  const pos        = useRef({ x: -200, y: -200 });
  const hoveredRef = useRef(false);
  const rafRef     = useRef<number>(0);

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.08);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.08);
      const r = hoveredRef.current ? 14 : 20;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - r}px, ${pos.current.y - r}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
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
  }, [visible, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width:  hovered ? 28 : 40,
          height: hovered ? 28 : 40,
          borderRadius: "50%",
          border: `1px solid ${hovered ? "rgba(212,160,32,.70)" : "rgba(240,235,225,.20)"}`,
          background: hovered ? "rgba(212,160,32,.06)" : "transparent",
          pointerEvents: "none",
          zIndex: 99997,
          opacity: visible ? 1 : 0,
          transition: "opacity .5s, width .45s cubic-bezier(.16,1,.3,1), height .45s cubic-bezier(.16,1,.3,1), border-color .35s, background .35s",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 4, height: 4,
          borderRadius: "50%",
          background: hovered ? "rgba(212,160,32,.9)" : "rgba(240,235,225,.75)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: "opacity .5s, background .3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
