"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

function FaqRow({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
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
          justifyContent: "space-between",
          gap: 24,
          padding: "clamp(20px, 3vh, 30px) 0",
          background: "transparent",
          border: "none",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2.1vw, 1.8rem)",
            lineHeight: 1.25,
            color: lit ? "rgba(248,245,240,.98)" : "rgba(248,245,240,.62)",
            transition: "color .35s",
          }}
        >
          {q}
        </span>
        <span
          aria-hidden
          style={{
            position: "relative",
            width: 28,
            height: 28,
            flexShrink: 0,
          }}
        >
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 12, height: 1,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.45)",
            transform: "translate(-50%,-50%)",
            transition: "background .35s",
          }} />
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            width: 1, height: 12,
            background: lit ? "var(--color-gold)" : "rgba(248,245,240,.45)",
            transform: `translate(-50%,-50%) ${open ? "scaleY(0)" : "scaleY(1)"}`,
            transition: "background .35s, transform .35s",
          }} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "clamp(14px, 1.02vw, 16px)",
              lineHeight: 1.75,
              color: "var(--color-text-2)",
              margin: 0,
              paddingBottom: "clamp(22px, 3vh, 32px)",
              maxWidth: "46em",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 05 — Preguntas. Las objeciones reales, respondidas sin vueltas.
   Incluye JSON-LD FAQPage para resultados enriquecidos en Google. */
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
        <p className="section-index" style={{ marginBottom: "clamp(40px, 6vh, 72px)" }}>
          05 — Preguntas
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]" style={{ gap: "clamp(40px, 5vw, 100px)", alignItems: "start" }}>
        <div className="lg:sticky lg:top-[120px]">
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.005em",
                color: "var(--color-text)",
                margin: 0,
                marginBottom: "clamp(18px, 2.6vh, 28px)",
              }}
            >
              Lo que vas a querer saber{" "}
              <span style={{ fontStyle: "italic", color: "rgba(178,192,204,.7)" }}>antes de escribirnos.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{
              fontSize: "clamp(13px, 1vw, 15px)",
              lineHeight: 1.7,
              color: "var(--color-text-3)",
              margin: 0,
              maxWidth: "28em",
            }}>
              Si tu pregunta no está acá, la respondemos en la evaluación — sin costo y sin compromiso.
            </p>
          </Reveal>
        </div>

        <Reveal y={24}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
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
