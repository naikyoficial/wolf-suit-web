"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";
import { useMobile }    from "@/hooks/useMobile";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;
const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

type StepId = "intro" | "q1" | "q2" | "q3" | "q4" | "q5" | "data" | "confirmed";

const STEP_ORDER: StepId[] = ["intro", "q1", "q2", "q3", "q4", "q5", "data", "confirmed"];

const QUESTIONS: { id: StepId; num: string; question: string; options: string[] }[] = [
  {
    id: "q1", num: "01",
    question: "¿Tu empresa ya tiene presencia digital?",
    options: ["Tenemos un sitio web activo", "Tenemos algo pero está desactualizado", "No tenemos presencia digital aún"],
  },
  {
    id: "q2", num: "02",
    question: "¿Qué tipo de solución estás buscando?",
    options: ["Sitio Web Corporativo", "Landing Page de Alta Conversión", "Tienda Online (E-commerce)", "Aplicación o Software a Medida", "Posicionamiento SEO", "Aún no lo tengo definido"],
  },
  {
    id: "q3", num: "03",
    question: "¿Cuál es el objetivo central de este proyecto?",
    options: ["Atraer nuevos clientes y generar ventas", "Elevar la imagen y autoridad de marca", "Automatizar procesos internos", "Posicionarme en Google y crecer orgánicamente", "Lanzar una nueva empresa o producto"],
  },
  {
    id: "q4", num: "04",
    question: "¿Cómo definirías a tu empresa hoy?",
    options: ["Es mejor de lo que muestra", "Su imagen no refleja el nivel que tiene", "Está creciendo y necesita una presencia acorde", "Quiere diferenciarse claramente de la competencia", "Está comenzando y quiere hacerlo bien desde el inicio"],
  },
  {
    id: "q5", num: "05",
    question: "¿Con qué urgencia querés avanzar?",
    options: ["Lo antes posible", "Dentro de los próximos 30 días", "Sin una fecha definida aún", "Solo estoy evaluando opciones por ahora"],
  },
];

const NEXT_STEPS = [
  "Analizamos tu empresa, los objetivos que compartiste y el nivel de oportunidad que existe.",
  "Evaluamos si hay una alineación real entre tu proyecto y nuestra forma de trabajar.",
  "Si encontramos esa alineación, nos ponemos en contacto para coordinar una conversación estratégica sin compromiso.",
];

export function Contact() {
  const isMobile = useMobile();

  const slide = {
    // center ALWAYS clears the filter to blur(0px) — this is critical because
    // useMobile() returns false on the first paint (before its effect runs), so
    // the desktop `enter` state with blur(8px) can get applied for one frame. If
    // center omitted `filter`, framer never animates it back and the blur stays
    // stuck forever. Keeping blur(0px) here guarantees it's always reset.
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

  const [startHovered,  setStartHovered]  = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [submitting, setSubmitting]       = useState(false);

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
    borderBottom: "1px solid rgba(212,160,32,.18)",
    padding: "14px 0", fontSize: 14, color: "var(--color-text)",
    outline: "none", fontFamily: "var(--font-body)", letterSpacing: "-.01em",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase" as const,
    color: "rgba(212,160,32,.35)", display: "block", marginBottom: 6,
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 80px",
        background: "#040404",
        position: "relative", zIndex: 10, overflow: "hidden",
      }}
    >
      {/* Atmospheric gold glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(168,108,5,.10) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 100%, rgba(100,60,0,.08) 0%, transparent 70%)",
      }} />

      {/* Faint isotipo background */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600,
        opacity: 0.025,
        pointerEvents: "none",
      }}>
        <Image src="/isotipo.png" alt="" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Gold progress bar */}
      <AnimatePresence>
        {currentQ && (
          <motion.div key="progress"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(212,160,32,.07)" }}
          >
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{
                height: "100%",
                background: GOLD,
                backgroundSize: "280% 100%",
                animation: "metalShimmer 5s ease-in-out infinite",
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
              position: "absolute", top: 28, left: "clamp(24px, 6vw, 80px)",
              background: "none", border: "none",
              color: "rgba(212,160,32,.3)", fontSize: 10, letterSpacing: ".28em",
              textTransform: "uppercase", display: "flex", alignItems: "center",
              gap: 10, padding: 0, fontFamily: "var(--font-body)", transition: "color .25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(212,160,32,.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(212,160,32,.3)")}
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
            style={{ textAlign: "center", maxWidth: 640 }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 52 }}>
              <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,32,.3))" }} />
              <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".52em", textTransform: "uppercase" }}>
                Proceso de selección
              </ShimmerLabel>
              <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,32,.3))" }} />
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 54px)",
              fontWeight: 300, lineHeight: 1.08, letterSpacing: "-.028em",
              marginBottom: 36,
            }}>
              Algunas empresas buscan<br />una página web. Otras buscan<br />
              <span style={{
                background: GOLD, backgroundSize: "260% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", animation: "metalShimmer 8s ease-in-out infinite",
              }}>
                una ventaja real.
              </span>
            </h1>

            <p style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 2, marginBottom: 14, maxWidth: 540, margin: "0 auto 14px" }}>
              Cada proyecto que desarrollamos es completamente personalizado. No trabajamos sobre plantillas ni procesos genéricos. Antes de comenzar necesitamos entender quién sos, qué construiste y hacia dónde querés llevar tu empresa.
            </p>
            <p style={{ fontSize: 13, color: "var(--color-text-4)", lineHeight: 1.95, marginBottom: 56, maxWidth: 440, margin: "0 auto 56px" }}>
              Este proceso toma menos de dos minutos y nos permite evaluar si existe una oportunidad real de generar impacto.
            </p>

            {/* Gold border CTA */}
            <div style={{ display: "inline-block", padding: "1px", background: GOLD, backgroundSize: "280% 100%", animation: "metalShimmer 4s ease-in-out infinite" }}>
              <button
                onClick={() => goTo("q1")}
                onMouseEnter={() => setStartHovered(true)}
                onMouseLeave={() => setStartHovered(false)}
                data-cursor-hover
                style={{
                  display: "inline-flex", alignItems: "center", gap: 22,
                  padding: "18px 48px",
                  background: startHovered ? "var(--color-gold)" : "#060606",
                  color: startHovered ? "#080808" : "var(--color-text)",
                  fontSize: 10, letterSpacing: ".34em", textTransform: "uppercase",
                  border: "none", fontFamily: "var(--font-body)", transition: "background .3s, color .3s",
                }}
              >
                Iniciar evaluación
                <span style={{ display: "inline-flex", alignItems: "center", position: "relative", width: 22, height: 1, background: "currentColor", flexShrink: 0 }}>
                  <span style={{ position: "absolute", right: -1, top: -3, width: 6, height: 6, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                </span>
              </button>
            </div>

            <p style={{ marginTop: 28, fontSize: 10, letterSpacing: ".18em", color: "var(--color-text-4)" }}>
              Respondemos en un plazo máximo de 72 horas.
            </p>
          </motion.div>
        )}

        {/* ─── QUESTIONS ─── */}
        {currentQ && (
          <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ width: "100%", maxWidth: 540 }}
          >
            {/* Question counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 300,
                background: GOLD, backgroundSize: "260% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", animation: "metalShimmer 7s ease-in-out infinite",
                letterSpacing: ".06em",
              }}>
                {currentQ.num}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(212,160,32,.08)" }}>
                <div style={{ width: `${progress * 100}%`, height: "100%", background: "rgba(212,160,32,.3)", transition: "width .5s" }} />
              </div>
              <span style={{ fontSize: 9, letterSpacing: ".3em", color: "rgba(212,160,32,.25)" }}>
                {currentQ.num} / 0{QUESTIONS.length}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.2vw, 42px)",
              fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.022em",
              marginBottom: 44, color: "var(--color-text)",
            }}>
              {currentQ.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {currentQ.options.map((opt, i) => {
                const isSel = selected === opt;
                const isHov = hoveredOpt === opt && !selected;
                return (
                  <motion.button
                    key={opt}
                    initial={isMobile ? { opacity: 0, x: -10 } : { opacity: 0, x: -16, filter: "blur(4px)" }}
                    animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={isMobile
                      ? { duration: 0.22, delay: 0.03 * i, ease: [0.25, 0.46, 0.45, 0.94] as const }
                      : { duration: 0.4, delay: 0.06 * i, ease: EASE }}
                    onClick={() => pickOption(currentQ.id, opt)}
                    onMouseEnter={() => !selected && setHoveredOpt(opt)}
                    onMouseLeave={() => setHoveredOpt(null)}
                    data-cursor-hover
                    style={{
                      width: "100%", padding: "20px 20px 20px 24px",
                      background: isSel
                        ? "rgba(212,160,32,.06)"
                        : isHov ? "rgba(212,160,32,.03)" : "transparent",
                      border: "none",
                      borderBottom: `1px solid rgba(212,160,32,${isSel ? ".15" : isHov ? ".09" : ".05"})`,
                      borderLeft: isSel
                        ? "2px solid rgba(212,160,32,.7)"
                        : isHov ? "2px solid rgba(212,160,32,.3)" : "2px solid transparent",
                      textAlign: "left",
                      color: isSel
                        ? "var(--color-text)"
                        : isHov ? "var(--color-text-2)" : "var(--color-text-3)",
                      fontSize: 14, fontFamily: "var(--font-body)", letterSpacing: "-.01em", lineHeight: 1.4,
                      transition: "background .2s, color .2s, border-color .2s",
                    }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── DATA COLLECTION ─── */}
        {step === "data" && (
          <motion.div key="data" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ width: "100%", maxWidth: 500 }}
          >
            <ShimmerLabel style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", marginBottom: 10 }}>
              Casi listo.
            </ShimmerLabel>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.8vw, 36px)",
              fontWeight: 300, lineHeight: 1.12, letterSpacing: "-.022em",
              marginBottom: 10, color: "var(--color-text)",
            }}>
              Ahora conocemos un poco mejor tu proyecto.
            </h2>
            <p style={{ fontSize: 13, color: "var(--color-text-4)", lineHeight: 1.85, marginBottom: 44 }}>
              Solo necesitamos algunos datos para poder evaluar tu aplicación y contactarte.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                <div>
                  <label style={labelStyle}>Empresa</label>
                  <input required value={company} onChange={e => setCompany(e.target.value)} placeholder="Nombre de tu empresa" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Cargo <span style={{ opacity: .4 }}>(opcional)</span></label>
                  <input value={role} onChange={e => setRole(e.target.value)} placeholder="Tu cargo" style={inputStyle} />
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(212,160,32,.07)" }} />

              <div>
                <label style={{ ...labelStyle, marginBottom: 12, textTransform: "none", fontSize: 13, letterSpacing: "-.005em", color: "rgba(200,188,168,.45)", lineHeight: 1.6 }}>
                  ¿Qué querés que cambie en tu empresa después de este proyecto?
                </label>
                <textarea
                  required value={vision} onChange={e => setVision(e.target.value)} rows={4}
                  placeholder="Escribí libremente. No hay respuestas incorrectas."
                  style={{
                    ...inputStyle, resize: "none",
                    borderBottom: "none",
                    border: "1px solid rgba(212,160,32,.14)",
                    padding: "16px 18px", lineHeight: 1.8, borderRadius: 0,
                    height: 112,
                  }}
                />
              </div>

              <div style={{ paddingTop: 4 }}>
                <div style={{ display: "inline-block", padding: "1px", background: GOLD, backgroundSize: "280% 100%", animation: "metalShimmer 4s ease-in-out infinite" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    onMouseEnter={() => setSubmitHovered(true)}
                    onMouseLeave={() => setSubmitHovered(false)}
                    data-cursor-hover
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 20,
                      padding: "16px 40px",
                      background: submitHovered && !submitting ? "var(--color-gold)" : "#060606",
                      color: submitHovered && !submitting ? "#080808" : "var(--color-text)",
                      fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase",
                      border: "none", fontFamily: "var(--font-body)", transition: "background .3s, color .3s",
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting ? "Enviando…" : "Enviar solicitud"}
                    {!submitting && (
                      <span style={{ display: "inline-flex", alignItems: "center", position: "relative", width: submitHovered ? 30 : 20, height: 1, background: "currentColor", transition: "width .3s", flexShrink: 0 }}>
                        <span style={{ position: "absolute", right: -1, top: -3, width: 6, height: 6, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── CONFIRMATION ─── */}
        {step === "confirmed" && (
          <motion.div key="confirmed" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ textAlign: "center", maxWidth: 580 }}
          >
            {/* Gold vertical line drop */}
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{
                width: 1, height: 56,
                background: "linear-gradient(to bottom, transparent, rgba(212,160,32,.5))",
                margin: "0 auto 40px", transformOrigin: "top",
              }}
            />

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginBottom: 16 }}
            >
              <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase" }}>
                Solicitud recibida
              </ShimmerLabel>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.8vw, 50px)",
                fontWeight: 300, lineHeight: 1.08, letterSpacing: "-.028em",
                marginBottom: 16,
              }}
            >
              Tu aplicación fue recibida.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.9, marginBottom: 56, maxWidth: 440, margin: "0 auto 56px" }}
            >
              Ahora comienza nuestro proceso de evaluación.
            </motion.p>

            <div style={{ textAlign: "left", marginBottom: 52 }}>
              {NEXT_STEPS.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.5 + i * 0.16, ease: EASE }}
                  style={{
                    display: "flex", gap: 24,
                    padding: "22px 0",
                    borderBottom: `1px solid rgba(212,160,32,${i < NEXT_STEPS.length - 1 ? ".07" : "0"})`,
                  }}
                >
                  <span style={{
                    fontSize: 9, letterSpacing: ".35em",
                    background: GOLD, backgroundSize: "260% 100%",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", animation: "metalShimmer 7s ease-in-out infinite",
                    flexShrink: 0, paddingTop: 3,
                  }}>
                    0{i + 1}
                  </span>
                  <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.85 }}>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}>
              <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(212,160,32,.3), transparent)", margin: "0 auto 24px" }} />
              <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.95 }}>
                Trabajamos con una cantidad limitada de proyectos para garantizar el nivel de atención y excelencia que define a SuitWolf.
              </p>
              <p style={{ fontSize: 10, letterSpacing: ".1em", color: "rgba(212,160,32,.25)", marginTop: 12, marginBottom: 40 }}>
                Respondemos cada aplicación en un plazo máximo de 72 horas.
              </p>

              {/* Back to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  border: "1px solid rgba(212,160,32,.22)",
                  color: "rgba(212,160,32,.55)",
                  fontSize: 14,
                  lineHeight: 1,
                  transition: "border-color .3s, color .3s",
                }}>
                  ↑
                </span>
                <span style={{
                  fontSize: 9,
                  letterSpacing: ".32em",
                  textTransform: "uppercase",
                  color: "rgba(200,195,185,.3)",
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
