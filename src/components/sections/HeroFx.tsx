"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const GOLD = "rgba(212,160,32,";

/* Cardinal angles for pulsing dots */
const CARDINALS = [0, 72, 144, 216, 288];

export function HeroFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Floating particle system ── */
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

    type Particle = { x: number; y: number; r: number; speed: number; drift: number; op: number; opDir: number };
    const particles: Particle[] = Array.from({ length: 65 }, () => ({
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
        p.op += p.opDir * 0.0035;
        if (p.op > 0.62) p.opDir = -1;
        if (p.op < 0.04) p.opDir =  1;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4 || p.x > w + 4) p.x = Math.random() * w;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${GOLD}${p.op.toFixed(2)})`;
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
    <>
      {/* ── Canvas particles ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          zIndex: 4, pointerEvents: "none",
        }}
      />

      {/* ── Radar sweep — conic gradient that rotates ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%", top: "38%",
          width: "clamp(420px, 56vw, 820px)",
          height: "clamp(420px, 56vw, 820px)",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, transparent 70%, rgba(212,160,32,.04) 86%, rgba(212,160,32,.10) 100%)",
          animation: "spinCW 9s linear infinite",
          zIndex: 3, pointerEvents: "none",
        }}
      />

      {/* ── Geometric SVG rings ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%", top: "38%",
          width: "clamp(420px, 56vw, 820px)",
          height: "clamp(420px, 56vw, 820px)",
          transform: "translate(-50%, -50%)",
          zIndex: 3, pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ overflow: "visible" }}>

          {/* ── Inner ring (clockwise) ── */}
          <circle
            cx="250" cy="250" r="162"
            fill="none"
            stroke={`${GOLD}.14)`}
            strokeWidth=".9"
            strokeDasharray="3.5 13"
            style={{ animation: "spinCW 30s linear infinite", transformOrigin: "250px 250px" }}
          />
          {/* Tick marks on inner ring */}
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const r = 162, len = 7;
            return (
              <line
                key={i}
                x1={250 + Math.cos(a) * r}
                y1={250 + Math.sin(a) * r}
                x2={250 + Math.cos(a) * (r + len)}
                y2={250 + Math.sin(a) * (r + len)}
                stroke={`${GOLD}${i % 4 === 0 ? ".30)" : ".12)"}`}
                strokeWidth={i % 4 === 0 ? ".9" : ".5"}
              />
            );
          })}
          {/* Pulsing dots — pentagonal layout */}
          {CARDINALS.map((deg, i) => {
            const a = (deg - 90) * Math.PI / 180;
            const cx = 250 + Math.cos(a) * 162;
            const cy = 250 + Math.sin(a) * 162;
            return (
              <motion.circle
                key={deg}
                cx={cx} cy={cy} r="2.8"
                fill={`${GOLD}.55)`}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          })}

          {/* ── Middle ring (counter-clockwise) ── */}
          <circle
            cx="250" cy="250" r="228"
            fill="none"
            stroke={`${GOLD}.08)`}
            strokeWidth=".6"
            strokeDasharray="1.5 18"
            style={{ animation: "spinCCW 50s linear infinite", transformOrigin: "250px 250px" }}
          />
          {/* 4 dots on middle ring */}
          {[0, 90, 180, 270].map(deg => {
            const a = deg * Math.PI / 180;
            const cx = 250 + Math.cos(a) * 228;
            const cy = 250 + Math.sin(a) * 228;
            return (
              <motion.circle
                key={deg}
                cx={cx} cy={cy} r="1.8"
                fill={`${GOLD}.35)`}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: deg / 120 }}
              />
            );
          })}

          {/* ── Outer ring (very slow, clockwise) ── */}
          <circle
            cx="250" cy="250" r="305"
            fill="none"
            stroke={`${GOLD}.05)`}
            strokeWidth=".5"
            strokeDasharray="4 28"
            style={{ animation: "spinCW 75s linear infinite", transformOrigin: "250px 250px" }}
          />

          {/* ── Compass cross lines ── */}
          {([[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]).map(([dx, dy], i) => (
            <line
              key={i}
              x1={250} y1={250}
              x2={250 + dx * 160} y2={250 + dy * 160}
              stroke={`${GOLD}${i < 2 ? ".07)" : ".05)"}`}
              strokeWidth=".5"
              strokeDasharray="2 7"
            />
          ))}

          {/* ── Diagonal accent lines ── */}
          {[45, 135].map(deg => {
            const a = deg * Math.PI / 180;
            return (
              <line
                key={deg}
                x1={250 - Math.cos(a) * 100} y1={250 - Math.sin(a) * 100}
                x2={250 + Math.cos(a) * 100} y2={250 + Math.sin(a) * 100}
                stroke={`${GOLD}.04)`}
                strokeWidth=".4"
                strokeDasharray="1.5 9"
              />
            );
          })}

        </svg>
      </div>
    </>
  );
}
