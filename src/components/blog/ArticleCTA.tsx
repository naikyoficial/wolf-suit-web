"use client";

import Link from "next/link";
import { useState } from "react";
import { WolfMark } from "./WolfMark";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function ArticleCTA({ variant = "mid" }: { variant?: "mid" | "end" }) {
  const [hov, setHov] = useState(false);

  if (variant === "mid") {
    return (
      <aside style={{
        margin: "clamp(40px,6vh,64px) 0",
        padding: "clamp(28px,4vw,44px)",
        background: "rgba(212,160,32,.04)",
        border: "1px solid rgba(212,160,32,.14)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: GOLD, backgroundSize: "260% 100%",
          animation: "metalShimmer 8s ease-in-out infinite",
          opacity: 0.35,
        }} />
        <p style={{
          fontSize: 9, letterSpacing: ".38em", textTransform: "uppercase",
          color: "rgba(212,160,32,.55)", marginBottom: 12,
        }}>
          SuitWolf Studio
        </p>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20px,2.2vw,28px)",
          fontWeight: 300, lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "var(--color-text)",
          marginBottom: 20,
        }}>
          ¿Querés aplicar esto a tu empresa?
        </p>
        <Link
          href="/#contact"
          style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase",
            color: "rgba(212,160,32,.8)", textDecoration: "none",
            transition: "color .3s",
          }}
        >
          Solicitar evaluación gratuita
          <span style={{
            display: "inline-flex", alignItems: "center", position: "relative",
            width: 20, height: 1, background: "currentColor", flexShrink: 0,
          }}>
            <span style={{
              position: "absolute", right: -1, top: -3,
              width: 5, height: 5,
              borderRight: "1px solid currentColor",
              borderTop: "1px solid currentColor",
              transform: "rotate(45deg)",
            }} />
          </span>
        </Link>
      </aside>
    );
  }

  return (
    <section className="article-end-cta" style={{
      marginTop: "clamp(48px,7vh,80px)",
      padding: "clamp(32px,3.5vw,48px)",
      background: "linear-gradient(110deg, rgba(212,160,32,.06) 0%, rgba(212,160,32,.02) 55%, transparent 100%)",
      border: "1px solid rgba(212,160,32,.16)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "clamp(24px,3vw,48px)",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD, backgroundSize: "260% 100%",
        animation: "metalShimmer 6s ease-in-out infinite",
        opacity: 0.45,
      }} />

      {/* Left: text + button */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 460 }}>
        <p style={{
          fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
          color: "rgba(212,160,32,.55)", marginBottom: 14,
        }}>
          SuitWolf Studio
        </p>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px,2.2vw,32px)",
          fontWeight: 300, lineHeight: 1.18,
          letterSpacing: "-.022em",
          color: "var(--color-text)",
          marginBottom: 24,
        }}>
          ¿Listo para llevar tu presencia digital al siguiente nivel?
        </h3>
        <Link
          href="/#contact"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            padding: "15px 32px",
            border: `1px solid ${hov ? "rgba(212,160,32,.6)" : "rgba(212,160,32,.3)"}`,
            background: hov ? "var(--color-gold)" : "transparent",
            color: hov ? "#080808" : "rgba(240,230,210,.9)",
            fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "background .35s, color .35s, border-color .35s",
          }}
        >
          Hablemos de tu proyecto
          <span style={{
            position: "relative", display: "inline-flex", alignItems: "center",
            width: 18, height: 1, background: "currentColor", flexShrink: 0,
          }}>
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

      {/* Right: decorative wolf */}
      <div className="article-end-cta-art" aria-hidden style={{
        position: "relative", zIndex: 1, flexShrink: 0,
        width: 150, height: 150,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse 80% 80% at 50% 45%, rgba(168,108,5,.18) 0%, transparent 70%)",
      }}>
        <WolfMark size={92} opacity={0.55} />
      </div>
    </section>
  );
}
