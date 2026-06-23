"use client";

import { useEffect, useRef, useState } from "react";

export function HeroFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, rafId = 0, visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Spawn only in the right 55% — wolf territory
    const spawnX = () => w * 0.45 + Math.random() * w * 0.55;

    // 11 particles (≈70% fewer than original 38) — sparse, slow, atmospheric
    type P = { x: number; y: number; r: number; speed: number; drift: number; op: number; opDir: number };
    const particles: P[] = Array.from({ length: 11 }, () => ({
      x:     spawnX(),
      y:     Math.random() * h,
      r:     Math.random() * 0.9 + 0.2,
      speed: Math.random() * 0.10 + 0.02,
      drift: (Math.random() - 0.5) * 0.04,
      op:    Math.random() * 0.10 + 0.02,
      opDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const tick = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y  -= p.speed;
        p.x  += p.drift;
        p.op += p.opDir * 0.0012;
        if (p.op > 0.16) p.opDir = -1;
        if (p.op < 0.01) p.opDir =  1;
        if (p.y < -4) { p.y = h + 4; p.x = spawnX(); }
        if (p.x < w * 0.44 || p.x > w + 4) p.x = spawnX();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,160,32,${p.op.toFixed(2)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]!.isIntersecting;
      if (visible) rafId = requestAnimationFrame(tick);
      else cancelAnimationFrame(rafId);
    }, { threshold: 0.01 });
    observer.observe(canvas);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [show]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 4, pointerEvents: "none" }}
    />
  );
}
