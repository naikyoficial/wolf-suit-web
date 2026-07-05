"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

function FaqRow({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
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
          justifyContent: "space-between",
          gap: 24,
          padding: "clamp(18px, 2.8vh, 28px) 0",
          background: "transparent",
          border: "none",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            color: lit ? "rgba(248,245,240,.96)" : "rgba(248,245,240,.58)",
            transition: "color .3s",
          }}
        >
          {q}
        </span>
        <span
          aria-hidden
          style={{ position: "relative", width: 26, height: 26, flexShrink: 0 }}
        >
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 10, height: 1,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.38)",
            transform: "translate(-50%,-50%)",
            transition: "background .3s",
          }} />
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 1, height: 10,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.38)",
            transform: `translate(-50%,-50%) ${open ? "scaleY(0)" : "scaleY(1)"}`,
            transition: "background .3s, transform .35s",
          }} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "clamp(14px, 1.02vw, 15.5px)",
              lineHeight: 1.75,
              color: "var(--color-text-2)",
              margin: 0,
              paddingBottom: "clamp(20px, 2.8vh, 30px)",
              maxWidth: "48em",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        padding: "var(--section-py) var(--section-px)",
        maxWidth: "var(--grid-max)",
        margin: "0 auto",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Reveal>
        <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 68px)" }}>
          06 — Preguntas
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]" style={{ gap: "clamp(40px, 5vw, 96px)", alignItems: "start" }}>
        <div className="lg:sticky lg:top-[120px]">
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                lineHeight: 1.16,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: 0,
                marginBottom: "clamp(16px, 2.4vh, 26px)",
              }}
            >
              Lo que vas a querer saber{" "}
              <span style={{
                display: "inline-block",
                fontStyle: "italic",
                fontWeight: 400,
                background: GOLD,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                antes de escribirnos.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{
              fontSize: "clamp(13px, 0.95vw, 15px)",
              lineHeight: 1.7,
              color: "var(--color-text-3)",
              margin: 0,
            }}>
              Si tu pregunta no está acá, la respondemos en la evaluación — sin costo y sin compromiso.
            </p>
          </Reveal>
        </div>

        <Reveal y={20}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {FAQS.map((f, i) => (
              <FaqRow
                key={f.q}
                q={f.q}
                a={f.a}
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
