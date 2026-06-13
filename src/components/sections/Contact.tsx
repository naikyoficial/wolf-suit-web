"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(178,192,204,.18)",
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

const FIELDS = [
  { label: "Nombre", placeholder: "Tu nombre completo", type: "text" },
  { label: "Email",  placeholder: "tu@empresa.com",     type: "email" },
  { label: "Empresa",placeholder: "Nombre de tu empresa", type: "text" },
];

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
            <Reveal y={20} blur={4}>
              <p style={{ fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--color-silver)", marginBottom: 18 }}>
                Aplicación
              </p>
            </Reveal>
            <Reveal delay={0.1} y={32} style={{ marginBottom: 24 }}>
              <SplitWords
                as="h2"
                delay={0.1}
                stagger={0.06}
                style={{
                  fontSize: "clamp(34px,3.8vw,52px)",
                  lineHeight: 1.08,
                  letterSpacing: "-.02em",
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                }}
              >
                El primer paso hacia una presencia que diferencia.
              </SplitWords>
            </Reveal>
            <Reveal delay={0.25} y={24} blur={6}>
              <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.95, maxWidth: 400 }}>
                No buscamos clientes. Buscamos empresas que entiendan
                que su presencia digital es el argumento más poderoso
                que hacen antes de que alguien las conozca.
                <br /><br />
                Contanos quién sos y qué querés construir.
                Si hay alineación, te respondemos en 72 horas.
              </p>
            </Reveal>
          </div>

          {/* ── Right: Form — staggered field reveal ── */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
            onSubmit={e => e.preventDefault()}
          >
            {FIELDS.map(f => (
              <motion.div
                key={f.label}
                variants={{
                  hidden:  { opacity: 0, y: 32, filter: "blur(8px)" },
                  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
                }}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <label style={labelStyle}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={inputStyle} />
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden:  { opacity: 0, y: 32, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
              }}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <label style={labelStyle}>Tu proyecto</label>
              <textarea rows={3} placeholder="Contanos brevemente qué quiere lograr tu empresa." style={{ ...inputStyle, resize: "none", height: 80 }} />
            </motion.div>

            <motion.div
              variants={{
                hidden:  { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
              }}
            >
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
                  border: "1px solid rgba(178,192,204,.4)",
                  background: btnHovered ? "var(--color-silver)" : "transparent",
                  color: btnHovered ? "#111" : "var(--color-text)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background .35s, color .35s",
                }}
              >
                Iniciar proceso
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", width: btnHovered ? 34 : 22, height: 1, background: "currentColor", transition: "width .3s", flexShrink: 0 }}>
                  <span style={{ position: "absolute", right: -1, top: -3, width: 7, height: 7, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                </span>
              </button>
            </motion.div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
