"use client";

import { useState } from "react";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [hov, setHov] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  return (
    <section style={{
      position: "relative",
      margin: "clamp(48px,7vh,80px) clamp(1.5rem,8vw,7.5rem)",
      border: "1px solid rgba(212,160,32,.12)",
      overflow: "hidden",
    }}>
      {/* Shimmer top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: GOLD, backgroundSize: "260% 100%",
        animation: "metalShimmer 8s ease-in-out infinite",
        opacity: 0.4,
      }} />

      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(168,108,5,.07) 0%, transparent 70%)",
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px,4vw,56px)",
        padding: "clamp(40px,6vw,72px)",
        alignItems: "center",
        position: "relative", zIndex: 1,
      }}
        className="newsletter-grid"
      >
        {/* Left */}
        <div>
          <p style={{
            fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
            color: "rgba(212,160,32,.5)", marginBottom: 20,
          }}>
            Actualizaciones
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px,3vw,44px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-.025em",
            color: "var(--color-text)",
            marginBottom: 16,
          }}>
            Recibí contenido exclusivo para llevar tu empresa al{" "}
            <span style={{
              background: GOLD,
              backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "metalShimmer 8s ease-in-out infinite",
            }}>
              siguiente nivel.
            </span>
          </h2>
          <p style={{
            fontSize: 13,
            color: "var(--color-text-3)",
            lineHeight: 1.8,
          }}>
            Estrategias, insights y recursos prácticos directamente en tu correo.
          </p>
        </div>

        {/* Right */}
        <div>
          {sent ? (
            <p style={{
              fontSize: 14,
              color: "rgba(212,160,32,.7)",
              letterSpacing: ".05em",
            }}>
              ¡Gracias! Te escribimos pronto.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: 0 }}>
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(212,160,32,.18)",
                    borderRight: "none",
                    padding: "16px 20px",
                    fontSize: 13,
                    color: "var(--color-text)",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                  }}
                />
                <button
                  type="submit"
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    padding: "16px 24px",
                    background: hov ? "var(--color-gold)" : "rgba(212,160,32,.12)",
                    border: "1px solid rgba(212,160,32,.4)",
                    color: hov ? "#080808" : "rgba(212,160,32,.8)",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "background .35s, color .35s",
                    flexShrink: 0,
                  }}
                >
                  →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .newsletter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
