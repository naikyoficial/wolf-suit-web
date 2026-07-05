"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

function ServiceRow({
  s,
  open,
  onToggle,
}: {
  s: (typeof SERVICES)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const [hov, setHov] = useState(false);
  const lit = hov || open;

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cursor-hover
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 2vw, 36px)",
          padding: "clamp(20px, 3vh, 32px) 0",
          background: "transparent",
          border: "none",
          textAlign: "left",
          position: "relative",
        }}
      >
        {/* Índice */}
        <span
          aria-hidden
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".18em",
            color: lit ? "var(--color-gold)" : "rgba(212,160,32,.35)",
            transition: "color .3s",
            flexShrink: 0,
            width: "2.2em",
          }}
        >
          {s.index}
        </span>

        {/* Título */}
        <motion.span
          animate={{ x: lit ? 10 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "clamp(1.15rem, 2.2vw, 2rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: lit ? "rgba(248,245,240,.98)" : "rgba(248,245,240,.58)",
            transition: "color .3s",
            flex: 1,
          }}
        >
          {s.title}
        </motion.span>

        {/* Categoría — desktop */}
        <span
          className="hidden md:block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: lit ? "rgba(200,193,180,.65)" : "rgba(200,193,180,.28)",
            transition: "color .3s",
            flexShrink: 0,
          }}
        >
          {s.category}
        </span>

        {/* +/− */}
        <span
          aria-hidden
          style={{
            position: "relative",
            width: 30,
            height: 30,
            flexShrink: 0,
            border: `1px solid ${lit ? "rgba(212,160,32,.5)" : "rgba(255,255,255,.1)"}`,
            borderRadius: "50%",
            transition: "border-color .3s, background .3s",
            background: open ? "rgba(212,160,32,.08)" : "transparent",
          }}
        >
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 10, height: 1,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.45)",
            transform: "translate(-50%,-50%)",
            transition: "background .3s",
          }} />
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 1, height: 10,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.45)",
            transform: `translate(-50%,-50%) ${open ? "scaleY(0)" : "scaleY(1)"}`,
            transition: "background .3s, transform .35s",
          }} />
        </span>
      </button>

      {/* Panel expandido */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]"
              style={{
                gap: "clamp(24px, 3vw, 60px)",
                padding: "0 0 clamp(26px, 4vh, 44px) 0",
              }}
            >
              <div className="md:pl-[68px]">
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  margin: "0 0 12px",
                }}>
                  {s.subtitle}
                </p>
                <p style={{
                  fontSize: "clamp(14px, 1.02vw, 16px)",
                  lineHeight: 1.72,
                  color: "var(--color-text-2)",
                  margin: 0,
                }}>
                  {s.desc}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.deliverables.map((d) => (
                  <span key={d} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span aria-hidden style={{ width: 14, height: 1, background: "rgba(212,160,32,.55)", flexShrink: 0, transform: "translateY(-4px)" }} />
                    <span style={{ fontSize: "clamp(13px, 0.92vw, 14.5px)", color: "var(--color-text-2)", lineHeight: 1.5 }}>
                      {d}
                    </span>
                  </span>
                ))}
                <Link
                  href="/evaluacion"
                  data-cursor-hover
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: ".24em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  Empezar
                  <span aria-hidden style={{ width: 16, height: 1, background: "currentColor", position: "relative", display: "inline-block" }}>
                    <span style={{
                      position: "absolute", right: -1, top: -3,
                      width: 5, height: 5,
                      borderRight: "1px solid currentColor",
                      borderTop: "1px solid currentColor",
                      transform: "rotate(45deg)",
                    }} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="servicios"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/background-servicios.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />

      {/* Overlay oscuro */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.56)",
        zIndex: 1,
      }} />

      {/* Viñeta perimetral */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(110% 90% at 50% 50%, transparent 38%, rgba(0,0,0,.7) 100%)",
      }} />

      {/* Fade superior */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, zIndex: 1, pointerEvents: "none",
        height: "58%",
        background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.72) 40%, transparent 100%)",
      }} />

      {/* Fade inferior */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: "none",
        height: "55%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.78) 50%, rgba(6,5,4,1) 100%)",
      }} />

      {/* Contenido */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}>
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 68px)" }}>
          03 — Servicios
        </p>
      </Reveal>

      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
        style={{ gap: "clamp(20px, 3vw, 60px)", alignItems: "end", marginBottom: "clamp(40px, 7vh, 80px)" }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            ¿Qué podemos construir<br />
            <span style={{ color: "rgba(178,192,204,.55)", fontWeight: 400 }}>para tu empresa?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontSize: "clamp(13px, 0.98vw, 15px)",
            lineHeight: 1.7,
            color: "var(--color-text-3)",
            margin: 0,
          }}>
            Cada proyecto es único — adaptamos el alcance a tu situación específica.
            Si no sabés qué necesitás, la evaluación lo define.
          </p>
        </Reveal>
      </div>

      <Reveal y={20}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.index}
              s={s}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </Reveal>
      </div>
    </section>
  );
}
