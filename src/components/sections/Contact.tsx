"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(201,164,90,.18)",
  padding: "12px 0",
  fontSize: 14,
  color: "var(--color-text)",
  outline: "none",
  width: "100%",
  fontFamily: "var(--font-body)",
  transition: "border-color .3s",
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: ".22em",
  textTransform: "uppercase" as const,
  color: "rgba(236,232,223,.35)",
};

export function Contact() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      id="contact"
      className="relative flex items-center"
      style={{ minHeight: "100vh", padding: "100px 8vw", background: "rgba(5,5,5,.98)", zIndex: 10 }}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start" }}>

          {/* ── Left: Copy ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 18 }}
            >
              Aplicación
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="font-display font-light"
              style={{ fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 24 }}
            >
              Seleccionamos los proyectos en los que creemos.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.95, maxWidth: 400 }}
            >
              No buscamos clientes. Buscamos empresas que comprendan
              que la percepción es el activo más valioso que pueden construir.
              <br /><br />
              Si tu empresa está lista para jugar en otra categoría,
              comenzá el proceso.
            </motion.p>
          </div>

          {/* ── Right: Form ── */}
          <motion.form
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
            onSubmit={e => e.preventDefault()}
          >
            {(["Nombre", "Email", "Empresa"] as const).map((label, i) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={i === 1 ? "email" : "text"}
                  placeholder={i === 0 ? "Tu nombre completo" : i === 1 ? "tu@empresa.com" : "Nombre de tu empresa"}
                  style={inputStyle}
                />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={labelStyle}>Tu proyecto</label>
              <textarea
                rows={3}
                placeholder="Contanos brevemente qué quiere lograr tu empresa."
                style={{ ...inputStyle, resize: "none", height: 80 }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                marginTop: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "15px 30px",
                border: "1px solid rgba(201,164,90,.4)",
                background: btnHovered ? "var(--color-gold)" : "transparent",
                color: btnHovered ? "#111" : "var(--color-text)",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background .35s, color .35s",
                alignSelf: "flex-start",
              }}
            >
              Iniciar proceso
              {/* Arrow */}
              <span style={{ position: "relative", display: "inline-flex", alignItems: "center", width: btnHovered ? 34 : 22, height: 1, background: "currentColor", transition: "width .3s", flexShrink: 0 }}>
                <span style={{ position: "absolute", right: -1, top: -3, width: 7, height: 7, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
              </span>
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
