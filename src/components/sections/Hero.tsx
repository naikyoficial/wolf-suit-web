"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

export function Hero() {
  const isoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!isoRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      isoRef.current.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{ minHeight: "calc(100dvh - 4rem)", padding: "80px 5vw" }}
    >
      {/* ── ISOTIPO ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.4, ease: EASE }}
        style={{ position: "relative", width: 360, height: 360, marginBottom: 44 }}
      >
        {/* Breathing glow behind logo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: -80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,164,90,.28) 0%, rgba(201,164,90,.06) 45%, transparent 70%)",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />

        {/* Parallax wrapper (mouse tilt) */}
        <div ref={isoRef} style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* Orbital rings */}
          <svg
            viewBox="0 0 472 472"
            fill="none"
            aria-hidden
            style={{
              position: "absolute",
              inset: -56,
              width: "calc(100% + 112px)",
              height: "calc(100% + 112px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2c070" />
                <stop offset="50%" stopColor="#c9a45a" />
                <stop offset="100%" stopColor="#8a6828" />
              </linearGradient>
            </defs>
            {/* Outer orbit — slow rotate */}
            <g style={{ animation: "spin 28s linear infinite", transformOrigin: "236px 236px" }}>
              <circle cx="236" cy="236" r="228" stroke="url(#rg)" strokeWidth="1" opacity=".28" />
              <polygon points="236,6 240,17 236,28 232,17" fill="#c9a45a" opacity=".75" />
              <line x1="236" y1="446" x2="236" y2="466" stroke="#c9a45a" strokeWidth="1" opacity=".45" />
              <line x1="8"   y1="236" x2="24"  y2="236" stroke="#c9a45a" strokeWidth="1" opacity=".35" />
              <line x1="448" y1="236" x2="464" y2="236" stroke="#c9a45a" strokeWidth="1" opacity=".35" />
            </g>
            {/* Inner orbit — counter-rotate */}
            <g style={{ animation: "spin 42s linear infinite reverse", transformOrigin: "236px 236px" }}>
              <circle cx="236" cy="236" r="206" stroke="url(#rg)" strokeWidth=".6" strokeDasharray="4 18" opacity=".18" />
            </g>
          </svg>

          {/* Real isotipo PNG */}
          <Image
            src="/isotipo.png"
            alt="Wolf Suit — Isotipo"
            width={360}
            height={360}
            priority
            style={{
              position: "relative",
              zIndex: 2,
              filter:
                "drop-shadow(0 0 32px rgba(201,164,90,.35)) drop-shadow(0 0 8px rgba(201,164,90,.2))",
            }}
          />
        </div>
      </motion.div>

      {/* ── WORDMARK ─────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.1, ease: EASE }}
        className="font-display font-semibold"
        style={{
          fontSize: "clamp(36px, 5.5vw, 68px)",
          letterSpacing: ".38em",
          background: "linear-gradient(135deg, #e2c070 0%, #c9a45a 45%, #9a7a3a 75%, #c9a45a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        WOLF SUIT
      </motion.p>

      {/* ── DIAMOND SEPARATOR ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        style={{
          width: 5,
          height: 5,
          background: "var(--color-gold)",
          transform: "rotate(45deg)",
          margin: "14px auto",
        }}
      />

      {/* ── TAG ──────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        style={{
          fontSize: 11,
          letterSpacing: ".32em",
          textTransform: "uppercase",
          color: "var(--color-text-3)",
          marginBottom: 56,
        }}
      >
        Diseño · Estrategia · Tecnología
      </motion.p>

      {/* ── SCROLL CUE ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(201,164,90,.45)",
          fontSize: 10,
          letterSpacing: ".25em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(to bottom, rgba(201,164,90,.45), transparent)",
          }}
        />
        <span>Continuar</span>
      </motion.div>
    </section>
  );
}
