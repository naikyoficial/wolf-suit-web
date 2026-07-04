"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/content";

/* Contador — anima de 0 al valor cuando entra en viewport */
function CountUp({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState("0");
  const numeric = parseInt(target, 10);

  useEffect(() => {
    if (!inView) return;
    const skip =
      numeric === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = skip ? 0 : 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = dur === 0 ? 1 : Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(p === 1 ? target : String(Math.round(numeric * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix && (
        <span style={{ fontSize: "0.55em", verticalAlign: "0.32em", marginLeft: "0.04em" }}>{suffix}</span>
      )}
    </span>
  );
}

/* Banda de estándares — números duros que respaldan la promesa. */
export function Standards() {
  return (
    <section
      aria-label="Estándares de Suitwolf"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        background: "#0A0A0A",
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px)",
        }}
      >
        {STANDARDS.map((st, i) => (
          <Reveal
            key={st.label}
            delay={i * 0.08}
            className={i > 0 ? "lg:border-l" : undefined}
            style={{
              padding: "clamp(36px, 6vh, 64px) clamp(14px, 2vw, 36px)",
              borderLeftColor: "rgba(255,255,255,.07)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5.4vw, 5rem)",
                lineHeight: 1,
                margin: 0,
                marginBottom: 12,
                background: "linear-gradient(180deg, #F0CC50 0%, #D4A020 55%, #A87214 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <CountUp target={st.value} suffix={st.suffix} />
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(10px, 0.85vw, 12px)",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,.75)",
                margin: 0,
                marginBottom: 8,
              }}
            >
              {st.label}
            </p>
            <p
              style={{
                fontSize: "clamp(12px, 0.9vw, 13px)",
                lineHeight: 1.55,
                color: "var(--color-text-4)",
                margin: 0,
              }}
            >
              {st.note}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
