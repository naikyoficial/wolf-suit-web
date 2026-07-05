"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

type StepId = "intro" | "q1" | "q2" | "q3" | "q4" | "q5" | "data" | "confirmed";

const STEP_ORDER: StepId[] = ["intro", "q1", "q2", "q3", "q4", "q5", "data", "confirmed"];

type Option = { label: string; hint?: string };

const QUESTIONS: { id: StepId; num: string; question: string; options: Option[] }[] = [
  {
    id: "q1", num: "01",
    question: "¿Tu empresa ya tiene presencia digital?",
    options: [
      { label: "Sí, tenemos un sitio web activo" },
      { label: "Tenemos algo, pero está desactualizado" },
      { label: "Solo tenemos redes sociales" },
      { label: "No, arrancamos desde cero" },
    ],
  },
  {
    id: "q2", num: "02",
    question: "¿Qué tipo de solución estás buscando?",
    options: [
      { label: "Sitio Web Corporativo", hint: "La presencia que te posiciona como referente" },
      { label: "Landing Page de Impacto", hint: "Página de alta conversión para captar leads" },
      { label: "Tienda Online Premium", hint: "E-commerce con experiencia de compra de lujo" },
      { label: "Presencia Personal", hint: "Portfolio y personal branding con autoridad" },
      { label: "SEO & Visibilidad Web", hint: "Posicionamiento orgánico en Google" },
      { label: "Aplicaciones Web", hint: "Herramientas y sistemas digitales a medida" },
    ],
  },
  {
    id: "q3", num: "03",
    question: "¿Cuál es el objetivo central de este proyecto?",
    options: [
      { label: "Proyectar autoridad y posicionarnos como referentes" },
      { label: "Generar más leads y acelerar las ventas" },
      { label: "Vender productos online" },
      { label: "Aparecer primero cuando nos buscan en Google" },
      { label: "Automatizar y escalar con una herramienta a medida" },
      { label: "Construir una marca personal sólida" },
    ],
  },
  {
    id: "q4", num: "04",
    question: "¿Cómo definirías a tu empresa hoy?",
    options: [
      { label: "Un emprendimiento que está arrancando" },
      { label: "Un profesional independiente" },
      { label: "Una empresa en crecimiento" },
      { label: "Una marca ya consolidada" },
    ],
  },
  {
    id: "q5", num: "05",
    question: "¿Con qué urgencia querés avanzar?",
    options: [
      { label: "Lo antes posible" },
      { label: "En las próximas semanas" },
      { label: "En los próximos meses" },
      { label: "Estoy explorando opciones" },
    ],
  },
];

const NEXT_STEPS = [
  "Analizamos tu empresa, los objetivos que compartiste y el nivel de oportunidad que existe.",
  "Evaluamos si hay una alineación real entre tu proyecto y nuestra forma de trabajar.",
  "Si la encontramos, te contactamos para coordinar una conversación estratégica sin compromiso.",
];

/* Eyebrow reutilizable — línea dorada + label mono, estilo section-index */
function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      justifyContent: center ? "center" : "flex-start",
    }}>
      <span aria-hidden style={{
        width: 34, height: 1,
        background: "linear-gradient(to right, rgba(212,160,32,.75), rgba(212,160,32,.1))",
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        letterSpacing: ".32em", textTransform: "uppercase",
        color: "var(--color-text-3)",
      }}>
        {children}
      </span>
      {center && (
        <span aria-hidden style={{
          width: 34, height: 1,
          background: "linear-gradient(to left, rgba(212,160,32,.75), rgba(212,160,32,.1))",
          flexShrink: 0,
        }} />
      )}
    </div>
  );
}

export function Contact() {
  const isMobile = useMobile();

  const slide = {
    enter: (d: number) => isMobile
      ? { opacity: 0, x: d * 28, filter: "blur(0px)" }
      : { opacity: 0, x: d * 40, filter: "blur(8px)" },
    center: isMobile
      ? { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const } }
      : { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
    exit: (d: number) => isMobile
      ? { opacity: 0, x: d * -28, filter: "blur(0px)", transition: { duration: 0.18 } }
      : { opacity: 0, x: d * -40, filter: "blur(8px)", transition: { duration: 0.3 } },
  };

  const [step, setStep]         = useState<StepId>("intro");
  const [dir, setDir]           = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredOpt, setHoveredOpt] = useState<string | null>(null);
  const [answers, setAnswers]   = useState<Record<string, string>>({});

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [company, setCompany] = useState("");
  const [role,    setRole]    = useState("");
  const [vision,  setVision]  = useState("");

  const [submitting, setSubmitting] = useState(false);

  const goTo = (next: StepId) => {
    const from = STEP_ORDER.indexOf(step);
    const to   = STEP_ORDER.indexOf(next);
    setDir(to >= from ? 1 : -1);
    setSelected(null);
    setHoveredOpt(null);
    setStep(next);
  };

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) goTo(STEP_ORDER[idx - 1]!);
  };

  const pickOption = (questionId: StepId, option: string) => {
    if (selected) return;
    setSelected(option);
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    const qIdx = QUESTIONS.findIndex(q => q.id === questionId);
    const next: StepId = qIdx < QUESTIONS.length - 1 ? QUESTIONS[qIdx + 1]!.id : "data";
    setTimeout(() => goTo(next), isMobile ? 220 : 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, role, vision, answers }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[Contact] API error", res.status, body);
      }
    } catch (err) {
      console.error("[Contact] Network error", err);
    }
    setSubmitting(false);
    goTo("confirmed");
  };

  const currentQ = QUESTIONS.find(q => q.id === step);
  const qIdx     = currentQ ? QUESTIONS.indexOf(currentQ) : -1;
  const progress = currentQ ? (qIdx + 1) / QUESTIONS.length : 0;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(255,255,255,.12)",
    padding: "13px 0", fontSize: 15, color: "var(--color-text)",
    outline: "none", fontFamily: "var(--font-body)", letterSpacing: "-.01em",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".26em",
    textTransform: "uppercase" as const, color: "var(--color-text-4)",
    display: "block", marginBottom: 8,
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "110px 24px 90px",
        background: "#060504",
        position: "relative", zIndex: 10, overflow: "hidden",
      }}
    >
      {/* Atmospheric gold glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 68% 52% at 50% 32%, rgba(150,100,30,.09) 0%, transparent 64%), radial-gradient(ellipse 40% 30% at 50% 100%, rgba(90,55,10,.07) 0%, transparent 70%)",
      }} />

      {/* Perimeter vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 42%, rgba(3,2,1,.6) 100%)",
      }} />

      {/* Faint isotipo background */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 620, height: 620, opacity: 0.022, pointerEvents: "none",
      }}>
        <Image src="/isotipo.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Gold progress bar */}
      <AnimatePresence>
        {currentQ && (
          <motion.div key="progress"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(212,160,32,.08)" }}
          >
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{
                height: "100%", background: GOLD,
                backgroundSize: "200% 100%",
                animation: "heroSheen 9s ease-in-out infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <AnimatePresence>
        {step !== "intro" && step !== "confirmed" && (
          <motion.button key="back"
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            onClick={goBack}
            data-cursor-hover
            style={{
              position: "absolute", top: 30, left: "clamp(24px, 6vw, 80px)",
              background: "none", border: "none",
              color: "rgba(212,160,32,.4)", fontSize: 10, letterSpacing: ".26em",
              textTransform: "uppercase", display: "flex", alignItems: "center",
              gap: 10, padding: 0, fontFamily: "var(--font-mono)", transition: "color .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(212,160,32,.85)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(212,160,32,.4)")}
          >
            <span style={{ fontSize: 14, lineHeight: 1 }}>←</span>
            Volver
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={dir}>

        {/* ─── INTRO ─── */}
        {step === "intro" && (
          <motion.div key="intro" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ textAlign: "center", maxWidth: 680, position: "relative", zIndex: 1 }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(36px, 6vh, 56px)" }}>
              <Eyebrow center>Proceso de selección</Eyebrow>
            </div>

            <h1 style={{
              fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
              lineHeight: 1.08, letterSpacing: "-.035em",
              color: "var(--color-text)",
              margin: "0 0 clamp(26px, 4vh, 38px)",
            }}>
              Algunas empresas buscan una página web.<br />
              Otras buscan{" "}
              <span style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontWeight: 400, color: "#D9B36A",
              }}>
                una ventaja real.
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(14px, 1.05vw, 16px)", color: "var(--color-text-2)",
              lineHeight: 1.8, maxWidth: 560, margin: "0 auto clamp(14px, 2vh, 18px)",
            }}>
              Cada proyecto que desarrollamos es completamente personalizado. No trabajamos sobre plantillas ni procesos genéricos. Antes de comenzar necesitamos entender quién sos, qué construiste y hacia dónde querés llevar tu empresa.
            </p>
            <p style={{
              fontSize: "clamp(12.5px, 0.95vw, 14px)", color: "var(--color-text-4)",
              lineHeight: 1.8, maxWidth: 460, margin: "0 auto clamp(40px, 6vh, 58px)",
            }}>
              Este proceso toma menos de dos minutos y nos permite evaluar si existe una oportunidad real de generar impacto.
            </p>

            <button
              onClick={() => goTo("q1")}
              data-cursor-hover
              className="cta-gold"
              style={{
                display: "inline-flex", alignItems: "center", gap: 18,
                padding: "clamp(16px, 1.6vw, 20px) clamp(38px, 4vw, 54px)",
                fontFamily: "var(--font-mono)", fontWeight: 500,
                fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Iniciar evaluación
              <Arrow />
            </button>

            <p style={{
              marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 9.5,
              letterSpacing: ".2em", textTransform: "uppercase", color: "var(--color-text-4)",
            }}>
              Respondemos en un plazo máximo de 72 horas
            </p>
          </motion.div>
        )}

        {/* ─── QUESTIONS ─── */}
        {currentQ && (
          <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ width: "100%", maxWidth: 600, position: "relative", zIndex: 1 }}
          >
            {/* Counter + progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(30px, 5vh, 46px)" }}>
              <span style={{
                fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 700,
                fontSize: 20, color: "#D9B36A", lineHeight: 1,
              }}>
                {currentQ.num}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.09)", position: "relative" }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${progress * 100}%`,
                  background: "linear-gradient(to right, rgba(212,160,32,.7), rgba(212,160,32,.35))",
                  transition: "width .5s",
                }} />
              </div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: ".24em", color: "var(--color-text-4)",
              }}>
                {currentQ.num} / 0{QUESTIONS.length}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              lineHeight: 1.12, letterSpacing: "-.03em",
              marginBottom: "clamp(28px, 4.5vh, 44px)", color: "var(--color-text)",
            }}>
              {currentQ.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQ.options.map((opt, i) => {
                const isSel = selected === opt.label;
                const isHov = hoveredOpt === opt.label && !selected;
                const active = isSel || isHov;
                return (
                  <motion.button
                    key={opt.label}
                    initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, x: -14, filter: "blur(4px)" }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={isMobile
                      ? { duration: 0.22, delay: 0.03 * i, ease: [0.25, 0.46, 0.45, 0.94] as const }
                      : { duration: 0.4, delay: 0.05 * i, ease: EASE }}
                    onClick={() => pickOption(currentQ.id, opt.label)}
                    onMouseEnter={() => !selected && setHoveredOpt(opt.label)}
                    onMouseLeave={() => setHoveredOpt(null)}
                    data-cursor-hover
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18,
                      padding: opt.hint ? "15px 18px 15px 22px" : "17px 18px 17px 22px",
                      background: isSel ? "rgba(212,160,32,.06)" : isHov ? "rgba(212,160,32,.03)" : "rgba(255,255,255,.015)",
                      border: `1px solid ${isSel ? "rgba(212,160,32,.5)" : isHov ? "rgba(212,160,32,.3)" : "rgba(255,255,255,.08)"}`,
                      borderRadius: 4,
                      textAlign: "left", cursor: "pointer",
                      transition: "background .25s, border-color .25s",
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                      <span style={{
                        fontFamily: "var(--font-body)", fontWeight: opt.hint ? 600 : 500,
                        fontSize: opt.hint ? 15 : 14.5,
                        letterSpacing: "-.01em", lineHeight: 1.3,
                        color: active ? "var(--color-text)" : "var(--color-text-2)",
                        transition: "color .25s",
                      }}>
                        {opt.label}
                      </span>
                      {opt.hint && (
                        <span style={{
                          fontSize: 12.5, lineHeight: 1.45,
                          color: active ? "var(--color-text-3)" : "var(--color-text-4)",
                          transition: "color .25s",
                        }}>
                          {opt.hint}
                        </span>
                      )}
                    </span>
                    <span aria-hidden style={{
                      position: "relative", display: "inline-flex", alignItems: "center",
                      width: active ? 24 : 14, height: 1, flexShrink: 0,
                      background: active ? "#D9B36A" : "rgba(255,255,255,.2)",
                      transition: "width .3s, background .25s",
                    }}>
                      <span style={{
                        position: "absolute", right: -1, top: -2.5, width: 5, height: 5,
                        borderRight: `1px solid ${active ? "#D9B36A" : "rgba(255,255,255,.2)"}`,
                        borderTop: `1px solid ${active ? "#D9B36A" : "rgba(255,255,255,.2)"}`,
                        transform: "rotate(45deg)", transition: "border-color .25s",
                      }} />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── DATA COLLECTION ─── */}
        {step === "data" && (
          <motion.div key="data" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1 }}
          >
            <div style={{ marginBottom: 14 }}>
              <Eyebrow>Casi listo</Eyebrow>
            </div>
            <h2 style={{
              fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
              lineHeight: 1.14, letterSpacing: "-.03em",
              margin: "0 0 12px", color: "var(--color-text)",
            }}>
              Ahora conocemos mejor tu proyecto.
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.8, margin: "0 0 clamp(32px, 5vh, 46px)" }}>
              Solo necesitamos algunos datos para evaluar tu aplicación y contactarte.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 22 }}>
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 22 }}>
                <div>
                  <label style={labelStyle}>Empresa</label>
                  <input required value={company} onChange={e => setCompany(e.target.value)} placeholder="Nombre de tu empresa" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Cargo <span style={{ opacity: .5 }}>(opcional)</span></label>
                  <input value={role} onChange={e => setRole(e.target.value)} placeholder="Tu cargo" style={inputStyle} />
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,.06)" }} />

              <div>
                <label style={{ ...labelStyle, textTransform: "none", fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "-.005em", color: "var(--color-text-2)", lineHeight: 1.6, marginBottom: 12 }}>
                  ¿Qué querés que cambie en tu empresa después de este proyecto?
                </label>
                <textarea
                  required value={vision} onChange={e => setVision(e.target.value)} rows={4}
                  placeholder="Escribí libremente. No hay respuestas incorrectas."
                  style={{
                    ...inputStyle, resize: "none",
                    borderBottom: "none",
                    border: "1px solid rgba(255,255,255,.1)",
                    padding: "15px 18px", lineHeight: 1.75, borderRadius: 4, height: 116,
                  }}
                />
              </div>

              <div style={{ paddingTop: 6, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor-hover
                  className="cta-gold"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 16,
                    padding: "16px 40px",
                    fontFamily: "var(--font-mono)", fontWeight: 500,
                    fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase",
                    cursor: submitting ? "default" : "pointer",
                    opacity: submitting ? 0.55 : 1,
                  }}
                >
                  {submitting ? "Enviando…" : "Enviar solicitud"}
                  {!submitting && <Arrow />}
                </button>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9.5,
                  letterSpacing: ".18em", textTransform: "uppercase", color: "var(--color-text-4)",
                }}>
                  Respondemos en 72 horas
                </span>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── CONFIRMATION ─── */}
        {step === "confirmed" && (
          <motion.div key="confirmed" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ textAlign: "center", maxWidth: 600, position: "relative", zIndex: 1 }}
          >
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{
                width: 1, height: 56,
                background: "linear-gradient(to bottom, transparent, rgba(212,160,32,.55))",
                margin: "0 auto 38px", transformOrigin: "top",
              }}
            />

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}
            >
              <Eyebrow center>Solicitud recibida</Eyebrow>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 600,
                fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
                lineHeight: 1.08, letterSpacing: "-.035em",
                margin: "0 0 16px", color: "var(--color-text)",
              }}
            >
              Tu aplicación fue{" "}
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, color: "#D9B36A" }}>
                recibida.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ fontSize: 14.5, color: "var(--color-text-3)", lineHeight: 1.85, margin: "0 auto clamp(44px, 7vh, 60px)", maxWidth: 440 }}
            >
              Ahora comienza nuestro proceso de evaluación.
            </motion.p>

            <div style={{ textAlign: "left", marginBottom: 48 }}>
              {NEXT_STEPS.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.5 + i * 0.16, ease: EASE }}
                  style={{
                    display: "flex", gap: 22, padding: "22px 0",
                    borderBottom: `1px solid rgba(255,255,255,${i < NEXT_STEPS.length - 1 ? ".07" : "0"})`,
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 700,
                    fontSize: 15, color: "#D9B36A", flexShrink: 0, lineHeight: 1.4,
                  }}>
                    0{i + 1}
                  </span>
                  <p style={{ fontSize: 13.5, color: "var(--color-text-3)", lineHeight: 1.8, margin: 0 }}>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}>
              <p style={{ fontSize: 12.5, color: "var(--color-text-4)", lineHeight: 1.9, margin: "0 auto", maxWidth: 460 }}>
                Trabajamos con una cantidad limitada de proyectos para garantizar el nivel de atención y excelencia que define a Suitwolf.
              </p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                data-cursor-hover
                style={{
                  display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8,
                  background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 40,
                }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 38, height: 38, borderRadius: "50%",
                  border: "1px solid rgba(212,160,32,.28)",
                  color: "rgba(212,160,32,.6)", fontSize: 14, lineHeight: 1,
                }}>
                  ↑
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: ".3em", textTransform: "uppercase", color: "var(--color-text-4)",
                }}>
                  Volver al inicio
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}

/* Flecha del CTA — hereda currentColor de .cta-gold */
function Arrow() {
  return (
    <span aria-hidden style={{
      position: "relative", display: "inline-flex", alignItems: "center",
      width: 20, height: 1, background: "currentColor", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", right: -1, top: -3, width: 6, height: 6,
        borderRight: "1px solid currentColor", borderTop: "1px solid currentColor",
        transform: "rotate(45deg)",
      }} />
    </span>
  );
}
