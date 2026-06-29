"use client";

import Link from "next/link";
import { useState } from "react";

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
    <section style={{
      marginTop: "clamp(56px,8vh,96px)",
      padding: "clamp(40px,6vw,72px)",
      background: "rgba(212,160,32,.04)",
      border: "1px solid rgba(212,160,32,.14)",
      textAlign: "center",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD, backgroundSize: "260% 100%",
        animation: "metalShimmer 6s ease-in-out infinite",
        opacity: 0.4,
      }} />
      <p style={{
        fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase",
        color: "rgba(212,160,32,.5)", marginBottom: 20,
      }}>
        ¿Listo para el siguiente paso?
      </p>
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(26px,3vw,44px)",
        fontWeight: 300, lineHeight: 1.1,
        letterSpacing: "-.025em",
        color: "var(--color-text)",
        marginBottom: 16,
      }}>
        Transformá la presencia digital de tu empresa
      </h3>
      <p style={{
        fontSize: 14, color: "var(--color-text-3)",
        lineHeight: 1.85, maxWidth: 440, margin: "0 auto 36px",
      }}>
        Analizamos tu situación específica y te decimos con honestidad si podemos generar un impacto real.
      </p>
      <div style={{
        display: "inline-block",
        padding: "1px",
        background: GOLD,
        backgroundSize: "280% 100%",
        animation: "metalShimmer 5s ease-in-out infinite",
      }}>
        <Link
          href="/#contact"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 20,
            padding: "18px 44px",
            background: hov ? "var(--color-gold)" : "#060606",
            color: hov ? "#080808" : "var(--color-text)",
            fontSize: 10, letterSpacing: ".32em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "background .38s, color .38s",
          }}
        >
          Solicitar evaluación
          <span style={{
            position: "relative", display: "inline-flex", alignItems: "center",
            width: 20, height: 1, background: "currentColor", flexShrink: 0,
          }}>
            <span style={{
              position: "absolute", right: -1, top: -3,
              width: 6, height: 6,
              borderRight: "1px solid currentColor",
              borderTop: "1px solid currentColor",
              transform: "rotate(45deg)",
            }} />
          </span>
        </Link>
      </div>
    </section>
  );
}
