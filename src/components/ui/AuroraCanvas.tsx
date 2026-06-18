"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { cx: 0.12, cy: 0.20, rx: 0.60, ry: 0.38, r: 40,  g: 100, b: 200, a: 0.18, sx: 0.00020, sy: 0.00015, px: 0.0, py: 1.2 },
  { cx: 0.80, cy: 0.52, rx: 0.58, ry: 0.28, r: 15,  g: 60,  b: 165, a: 0.16, sx: 0.00018, sy: 0.00022, px: 2.1, py: 3.4 },
  { cx: 0.50, cy: 0.08, rx: 0.72, ry: 0.42, r: 140, g: 175, b: 215, a: 0.08, sx: 0.00014, sy: 0.00010, px: 4.2, py: 0.8 },
  { cx: 0.92, cy: 0.38, rx: 0.46, ry: 0.34, r: 25,  g: 75,  b: 175, a: 0.15, sx: 0.00022, sy: 0.00025, px: 1.3, py: 5.0 },
  { cx: 0.06, cy: 0.72, rx: 0.52, ry: 0.30, r: 60,  g: 130, b: 200, a: 0.10, sx: 0.00016, sy: 0.00019, px: 3.6, py: 2.2 },
  { cx: 0.55, cy: 0.90, rx: 0.56, ry: 0.25, r: 100, g: 150, b: 205, a: 0.12, sx: 0.00019, sy: 0.00017, px: 0.9, py: 4.1 },
];

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();

    let animId: number;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";

      for (const b of BLOBS) {
        const x  = (b.cx + Math.sin(t * b.sx + b.px) * 0.26) * w;
        const y  = (b.cy + Math.sin(t * b.sy + b.py) * 0.18) * h;
        const rx = b.rx * w * 0.55;
        const ry = b.ry * h * 0.55;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1, ry / rx);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        grad.addColorStop(0,    `rgba(${b.r},${b.g},${b.b},${b.a})`);
        grad.addColorStop(0.45, `rgba(${b.r},${b.g},${b.b},${b.a * 0.35})`);
        grad.addColorStop(1,    `rgba(${b.r},${b.g},${b.b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        filter: "blur(24px)",
      }}
    />
  );
}
