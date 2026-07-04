"use client";

import { useState } from "react";
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
    <div style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
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
          gap: "clamp(16px, 2.4vw, 40px)",
          padding: "clamp(22px, 3.4vh, 38px) 0",
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
            fontSize: "clamp(11px, 0.9vw, 13px)",
            color: lit ? "var(--color-gold)" : "rgba(212,160,32,.42)",
            transition: "color .35s",
            flexShrink: 0,
            width: "2.2em",
          }}
        >
          {s.index}
        </span>

        {/* Título */}
        <motion.span
          animate={{ x: lit ? 14 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.7rem, 3.8vw, 3.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: lit ? "rgba(248,245,240,.98)" : "rgba(248,245,240,.6)",
            transition: "color .35s",
            flex: 1,
            fontStyle: open ? "italic" : "normal",
          }}
        >
          {s.title}
        </motion.span>

        {/* Categoría — solo desktop */}
        <span
          className="hidden md:block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".26em",
            textTransform: "uppercase",
            color: lit ? "rgba(200,193,180,.7)" : "rgba(200,193,180,.35)",
            transition: "color .35s",
            flexShrink: 0,
          }}
        >
          {s.category}
        </span>

        {/* Icono +/− */}
        <span
          aria-hidden
          style={{
            position: "relative",
            width: 34,
            height: 34,
            flexShrink: 0,
            border: `1px solid ${lit ? "rgba(212,160,32,.65)" : "rgba(255,255,255,.14)"}`,
            borderRadius: "50%",
            transition: "border-color .35s, background .35s",
            background: open ? "rgba(212,160,32,.1)" : "transparent",
          }}
        >
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 12, height: 1,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.55)",
            transform: "translate(-50%,-50%)",
            transition: "background .35s",
          }} />
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 1, height: 12,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.55)",
            transform: `translate(-50%,-50%) ${open ? "scaleY(0)" : "scaleY(1)"}`,
            transition: "background .35s, transform .35s",
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
            transition={{ duration: 0.55, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]"
              style={{
                gap: "clamp(24px, 3vw, 64px)",
                padding: "0 0 clamp(28px, 4vh, 48px) 0",
              }}
            >
              <div className="md:pl-[72px]">
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: ".26em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  margin: "0 0 14px",
                }}>
                  {s.subtitle}
                </p>
                <p style={{
                  fontSize: "clamp(14px, 1.05vw, 16px)",
                  lineHeight: 1.75,
                  color: "var(--color-text-2)",
                  margin: 0,
                  maxWidth: "38em",
                }}>
                  {s.desc}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "flex-start" }}>
                {s.deliverables.map((d) => (
                  <span key={d} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span aria-hidden style={{ width: 16, height: 1, background: "rgba(212,160,32,.6)", flexShrink: 0, transform: "translateY(-4px)" }} />
                    <span style={{ fontSize: "clamp(13px, 0.95vw, 15px)", color: "var(--color-text-2)", lineHeight: 1.5 }}>
                      {d}
                    </span>
                  </span>
                ))}
                <Link
                  href="/evaluacion"
                  data-cursor-hover
                  style={{
                    marginTop: 10,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: ".26em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  Empezar
                  <span aria-hidden style={{ width: 18, height: 1, background: "currentColor", position: "relative", display: "inline-block" }}>
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

/* 03 — Servicios. Accordion editorial: títulos serif enormes, índices mono,
   panel con entregables concretos. */
export function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="servicios"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 72px)" }}>
          03 — Servicios
        </p>
      </Reveal>

      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
        style={{ gap: "clamp(20px, 3vw, 64px)", alignItems: "end", marginBottom: "clamp(40px, 7vh, 90px)" }}
      >
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            ¿Qué podemos construir
            <br />
            <span style={{ fontStyle: "italic", color: "rgba(178,192,204,.7)" }}>para tu empresa?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{
            fontSize: "clamp(13px, 1vw, 15px)",
            lineHeight: 1.7,
            color: "var(--color-text-3)",
            margin: 0,
            maxWidth: "30em",
          }}>
            Cada proyecto es único — adaptamos el alcance a tu situación específica.
            Si no sabés qué necesitás, la evaluación lo define.
          </p>
        </Reveal>
      </div>

      <Reveal y={24}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
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
    </section>
  );
}
