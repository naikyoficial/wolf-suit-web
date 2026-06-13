"use client";

import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let w = (canvas.width  = parent.offsetWidth);
    let h = (canvas.height = parent.offsetHeight);

    const COUNT     = Math.min(Math.floor((w * h) / 14000), 110);
    const LINK_DIST = Math.min(w, h) * 0.16;
    const MOUSE_R   = 170;

    const mouse = { x: -9999, y: -9999 };

    interface Particle { x: number; y: number; vx: number; vy: number; r: number; alpha: number; }
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * w,
      y:     Math.random() * h,
      vx:    (Math.random() - 0.5) * 0.22,
      vy:    (Math.random() - 0.5) * 0.22,
      r:     Math.random() * 1.1 + 0.4,
      alpha: Math.random() * 0.38 + 0.18,
    }));

    let animId: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_R && md > 0) {
          p.x += (mdx / md) * 0.07;
          p.y += (mdy / md) * 0.07;
        }
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a  = particles[i]!;
          const b  = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(178,205,225,${(1 - d / LINK_DIST) * 0.16})`;
            ctx.lineWidth   = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        const mdx   = mouse.x - p.x;
        const mdy   = mouse.y - p.y;
        const md    = Math.sqrt(mdx * mdx + mdy * mdy);
        const boost = md < MOUSE_R ? (1 - md / MOUSE_R) * 0.55 : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + boost * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,240,${Math.min(p.alpha + boost * 0.38, 0.95)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => {
      w = canvas.width  = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
    };

    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    onResize);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width:  "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
