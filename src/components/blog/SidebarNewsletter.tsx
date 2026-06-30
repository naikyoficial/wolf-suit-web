"use client";

import { useState } from "react";

export function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [hov, setHov] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  return (
    <div>
      <p style={{
        fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
        color: "rgba(212,160,32,.55)", marginBottom: 16,
      }}>
        Suscríbete al blog
      </p>
      <p style={{
        fontSize: 13, color: "rgba(200,195,185,.6)", lineHeight: 1.7, marginBottom: 20,
      }}>
        Recibí estrategias, insights y recursos prácticos directamente en tu correo para hacer crecer tu empresa.
      </p>

      {sent ? (
        <p style={{ fontSize: 13, color: "rgba(212,160,32,.7)", letterSpacing: ".03em" }}>
          ¡Gracias! Te escribimos pronto.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 0 }}>
          <input
            type="email"
            required
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1, minWidth: 0,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(212,160,32,.18)",
              borderRight: "none",
              padding: "13px 16px",
              fontSize: 12,
              color: "var(--color-text)",
              outline: "none",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            type="submit"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            aria-label="Suscribirme"
            style={{
              padding: "0 18px",
              background: hov ? "var(--color-gold)" : "rgba(212,160,32,.12)",
              border: "1px solid rgba(212,160,32,.4)",
              color: hov ? "#080808" : "rgba(212,160,32,.85)",
              fontSize: 15,
              cursor: "pointer",
              transition: "background .35s, color .35s",
              flexShrink: 0,
            }}
          >
            →
          </button>
        </form>
      )}
    </div>
  );
}
