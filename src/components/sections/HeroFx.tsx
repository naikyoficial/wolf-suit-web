"use client";

import { useEffect, useRef } from "react";

export function HeroFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type P = { x: number; y: number; r: number; speed: number; drift: number; op: number; opDir: number };
    const particles: P[] = Array.from({ length: 65 }, () => ({
      x:     Math.random() * w,
      y:     Math.random() * h,
      r:     Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.32 + 0.06,
      drift: (Math.random() - 0.5) * 0.12,
      op:    Math.random() * 0.45 + 0.08,
      opDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y  -= p.speed;
        p.x  += p.drift;
        p.op += p.opDir * 0.004;
        if (p.op > 0.62) p.opDir = -1;
        if (p.op < 0.04) p.opDir =  1;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4 || p.x > w + 4) p.x = Math.random() * w;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,160,32,${p.op.toFixed(2)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        zIndex: 4, pointerEvents: "none",
      }}
    />
  );
}
