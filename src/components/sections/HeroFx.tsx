"use client";

import { useEffect, useRef } from "react";

/* Mist blob descriptor */
type Mist = {
  style: React.CSSProperties;
};

const MIST_BLOBS: Mist[] = [
  {
    style: {
      position: "absolute",
      width: "70vw", height: "50vh",
      bottom: "-8%", left: "-14%",
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(168,108,8,.20) 0%, rgba(140,85,4,.08) 40%, transparent 72%)",
      filter: "blur(56px)",
      animation: "mist1 22s ease-in-out infinite",
      opacity: 0.8,
    },
  },
  {
    style: {
      position: "absolute",
      width: "56vw", height: "44vh",
      top: "18%", right: "-18%",
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(148,90,4,.16) 0%, rgba(120,70,0,.06) 45%, transparent 72%)",
      filter: "blur(64px)",
      animation: "mist2 28s ease-in-out infinite",
      animationDelay: "-10s",
      opacity: 0.7,
    },
  },
];

export function HeroFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const COUNT = isTouch ? 28 : 55;

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

    type P = { x: number; y: number; r: number; speed: number; drift: number; op: number; opDir: number };
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * w,
      y:     Math.random() * h,
      r:     Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.28 + 0.05,
      drift: (Math.random() - 0.5) * 0.10,
      op:    Math.random() * 0.42 + 0.08,
      opDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const tick = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y  -= p.speed;
        p.x  += p.drift;
        p.op += p.opDir * 0.004;
        if (p.op > 0.58) p.opDir = -1;
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

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]!.isIntersecting;
      if (visible) { rafId = requestAnimationFrame(tick); }
      else { cancelAnimationFrame(rafId); }
    }, { threshold: 0.01 });
    observer.observe(canvas);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Mist / nebula blobs ── */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}
      >
        {MIST_BLOBS.map((m, i) => (
          <div key={i} style={m.style} />
        ))}
      </div>

      {/* ── Floating gold particles ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          zIndex: 4, pointerEvents: "none",
        }}
      />
    </>
  );
}
