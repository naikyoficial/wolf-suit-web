"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useConsent } from "@/contexts/ConsentContext";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CookieBanner() {
  const { consent, accept, reject } = useConsent();

  return (
    <AnimatePresence>
      {consent === "pending" && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="dialog"
          aria-live="polite"
          aria-label="Consentimiento de cookies"
          style={{
            position: "fixed",
            left: "clamp(16px, 3vw, 32px)",
            right: "clamp(16px, 3vw, 32px)",
            bottom: "clamp(16px, 3vh, 32px)",
            zIndex: 300,
            maxWidth: 720,
            marginLeft: "auto",
            padding: "clamp(20px, 2.4vw, 28px)",
            borderRadius: 10,
            border: "1px solid rgba(217,179,106,.32)",
            background: "linear-gradient(160deg, rgba(20,17,12,.42) 0%, rgba(10,8,6,.55) 100%)",
            backdropFilter: "blur(28px) saturate(1.2)",
            WebkitBackdropFilter: "blur(28px) saturate(1.2)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,.65)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              margin: "0 0 14px",
            }}
          >
            Privacidad
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--color-text-2)",
              margin: "0 0 20px",
            }}
          >
            Usamos cookies esenciales para que el sitio funcione y, con tu permiso,
            cookies analíticas (Google Analytics) para entender cómo se navega el sitio
            y mejorarlo. Podés cambiar tu elección cuando quieras. Más info en nuestra{" "}
            <Link
              href="/cookies"
              style={{ color: "var(--color-gold)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              política de cookies
            </Link>{" "}
            y{" "}
            <Link
              href="/privacidad"
              style={{ color: "var(--color-gold)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              política de privacidad
            </Link>
            .
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={reject}
              data-cursor-hover
              style={{
                padding: "10px 22px",
                border: "1px solid rgba(245,239,223,.2)",
                borderRadius: 3,
                background: "transparent",
                color: "var(--color-text-2)",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color .3s, color .3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,239,223,.4)";
                e.currentTarget.style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245,239,223,.2)";
                e.currentTarget.style.color = "var(--color-text-2)";
              }}
            >
              Solo esenciales
            </button>
            <button
              type="button"
              onClick={accept}
              data-cursor-hover
              className="cta-primary"
              style={{
                padding: "10px 22px",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                borderRadius: 3,
              }}
            >
              Aceptar todo
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
