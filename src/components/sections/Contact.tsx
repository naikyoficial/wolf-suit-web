"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerLabel } from "@/components/ui/ShimmerLabel";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

type StepId = "intro" | "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "data" | "confirmed";

const STEP_ORDER: StepId[] = ["intro", "q1", "q2", "q3", "q4", "q5", "q6", "data", "confirmed"];

const QUESTIONS: { id: StepId; num: string; question: string; options: string[] }[] = [
  { id: "q1", num: "01", question: "¿Tu empresa ya tiene un sitio web?", options: ["Sí", "No"] },
  { id: "q2", num: "02", question: "¿Qué querés construir?", options: ["Sitio web corporativo", "Landing Page", "Plataforma personalizada", "Ecommerce", "No estoy seguro todavía"] },
  { id: "q3", num: "03", question: "¿Cuál es el principal objetivo de este proyecto?", options: ["Conseguir más clientes", "Mejorar la imagen de la empresa", "Posicionarnos como una marca premium", "Lanzar una nueva empresa", "Modernizar nuestra presencia digital", "Otro"] },
  { id: "q4", num: "04", question: "Hoy sentís que tu empresa...", options: ["Es mejor de lo que parece", "Tiene una imagen desactualizada", "No transmite el nivel que realmente tiene", "Está creciendo y necesita acompañar ese crecimiento", "Todavía no tiene presencia digital"] },
  { id: "q5", num: "05", question: "¿Cuándo te gustaría comenzar?", options: ["Lo antes posible", "Dentro de este mes", "En los próximos meses", "Solo estoy investigando opciones"] },
  { id: "q6", num: "06", question: "¿Qué tan importante es este proyecto para tu empresa?", options: ["Es una decisión estratégica", "Muy importante", "Importante", "Estamos evaluando alternativas"] },
];

const NEXT_STEPS = [
  "Analizamos tu empresa y los objetivos que compartiste.",
  "Evaluamos si existe una oportunidad real para generar una transformación significativa.",
  "Si encontramos una alineación entre tu proyecto y nuestra forma de trabajar, nos pondremos en contacto para coordinar una conversación estratégica.",
];

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 32, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
  exit:  (d: number) => ({ opacity: 0, x: d * -32, filter: "blur(6px)", transition: { duration: 0.28 } }),
};

export function Contact() {
  const [step, setStep]         = useState<StepId>("intro");
  const [dir, setDir]           = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredOpt, setHoveredOpt] = useState<string | null>(null);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [company, setCompany] = useState("");
  const [role,    setRole]    = useState("");
  const [vision,  setVision]  = useState("");

  const [startHovered,  setStartHovered]  = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

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
    const qIdx  = QUESTIONS.findIndex(q => q.id === questionId);
    const next: StepId = qIdx < QUESTIONS.length - 1 ? QUESTIONS[qIdx + 1]!.id : "data";
    setTimeout(() => goTo(next), 380);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goTo("confirmed");
  };

  const currentQ = QUESTIONS.find(q => q.id === step);
  const qIdx     = currentQ ? QUESTIONS.indexOf(currentQ) : -1;
  const progress = currentQ ? (qIdx + 1) / QUESTIONS.length : 0;

  const inputBase: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(178,192,204,.14)",
    padding: "13px 0", fontSize: 14, color: "var(--color-text)",
    outline: "none", fontFamily: "var(--font-body)", letterSpacing: "-.01em",
  };

  const labelBase: React.CSSProperties = {
    fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" as const,
    color: "rgba(178,192,204,.32)", display: "block", marginBottom: 4,
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 80px", background: "rgba(5,5,5,.98)",
        position: "relative", zIndex: 10, overflow: "hidden",
      }}
    >
      {/* Progress line */}
      <AnimatePresence>
        {currentQ && (
          <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(178,192,204,.06)" }}
          >
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ height: "100%", background: "linear-gradient(90deg, #566070, #C0D8E8, #566070)", backgroundSize: "200% 100%", animation: "labelShimmer 3s linear infinite" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <AnimatePresence>
        {step !== "intro" && step !== "confirmed" && (
          <motion.button key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={goBack}
            style={{
              position: "absolute", top: 28, left: "clamp(24px, 6vw, 80px)",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(178,192,204,.35)", fontSize: 11, letterSpacing: ".22em",
              textTransform: "uppercase", display: "flex", alignItems: "center",
              gap: 10, padding: 0, fontFamily: "var(--font-body)", transition: "color .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(178,192,204,.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(178,192,204,.35)")}
          >
            ← Volver
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={dir}>

        {/* ─── INTRO ─── */}
        {step === "intro" && (
          <motion.div key="intro" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ textAlign: "center", maxWidth: 620 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 44 }}>
              <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(178,192,204,.28))" }} />
              <ShimmerLabel style={{ fontSize: 9, letterSpacing: ".5em", textTransform: "uppercase" }}>Proceso de selección</ShimmerLabel>
              <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(178,192,204,.28))" }} />
            </div>

            <h1 className="font-display" style={{ fontSize: "clamp(28px, 3.8vw, 50px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.025em", marginBottom: 32 }}>
              Algunas empresas buscan una página web.<br />
              Otras buscan una ventaja competitiva.
            </h1>

            <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.95, marginBottom: 14 }}>
              Cada proyecto que desarrollamos es completamente personalizado. No trabajamos sobre plantillas ni procesos genéricos. Antes de comenzar necesitamos entender quién sos, qué construiste y hacia dónde querés llevar tu empresa.
            </p>
            <p style={{ fontSize: 13, color: "var(--color-text-4)", lineHeight: 1.95, marginBottom: 52 }}>
              Este proceso toma menos de dos minutos y nos permite evaluar si existe una oportunidad real de generar impacto.
            </p>

            <div style={{ display: "inline-block", padding: "1px", background: "linear-gradient(90deg, #3A4A5A 0%, #7A8E9E 22%, #C8D8E8 46%, #EEF4FA 52%, #C8D8E8 58%, #7A8E9E 78%, #3A4A5A 100%)", backgroundSize: "280% 100%", animation: "metalShimmer 4s ease-in-out infinite" }}>
              <button
                onClick={() => goTo("q1")}
                onMouseEnter={() => setStartHovered(true)}
                onMouseLeave={() => setStartHovered(false)}
                style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "16px 42px", background: startHovered ? "var(--color-silver)" : "#060606", color: startHovered ? "#111" : "var(--color-text)", fontSize: 10, letterSpacing: ".32em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", transition: "background .3s, color .3s" }}
              >
                Comenzar proceso de selección
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── QUESTIONS ─── */}
        {currentQ && (
          <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ width: "100%", maxWidth: 500 }}
          >
            <p style={{ fontSize: 10, letterSpacing: ".42em", color: "rgba(178,192,204,.28)", marginBottom: 38, textTransform: "uppercase" }}>
              {currentQ.num} <span style={{ opacity: .5 }}>/ 06</span>
            </p>

            <h2 className="font-display" style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 300, lineHeight: 1.12, letterSpacing: "-.02em", marginBottom: 44 }}>
              {currentQ.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {currentQ.options.map((opt, i) => {
                const isSel = selected === opt;
                const isHov = hoveredOpt === opt && !selected;
                return (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, delay: 0.04 * i, ease: EASE }}
                    onClick={() => pickOption(currentQ.id, opt)}
                    onMouseEnter={() => !selected && setHoveredOpt(opt)}
                    onMouseLeave={() => setHoveredOpt(null)}
                    style={{
                      width: "100%", padding: "18px 0 18px 22px",
                      background: isSel ? "rgba(178,192,204,.05)" : isHov ? "rgba(178,192,204,.025)" : "transparent",
                      border: "none", borderBottom: "1px solid rgba(178,192,204,.07)",
                      borderLeft: isSel ? "2px solid rgba(200,220,244,.55)" : isHov ? "2px solid rgba(178,192,204,.2)" : "2px solid transparent",
                      textAlign: "left", cursor: selected ? "default" : "pointer",
                      color: isSel ? "var(--color-text)" : isHov ? "var(--color-text-2)" : "var(--color-text-3)",
                      fontSize: 14, fontFamily: "var(--font-body)", letterSpacing: "-.01em", lineHeight: 1.4,
                      transition: "background .18s, color .18s, border-color .18s",
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
            style={{ width: "100%", maxWidth: 480 }}
          >
            <ShimmerLabel style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", marginBottom: 12 }}>
              Gracias.
            </ShimmerLabel>
            <h2 className="font-display" style={{ fontSize: "clamp(20px, 2.6vw, 32px)", fontWeight: 300, lineHeight: 1.14, letterSpacing: "-.02em", marginBottom: 10 }}>
              Ahora conocemos un poco mejor tu proyecto.
            </h2>
            <p style={{ fontSize: 13, color: "var(--color-text-4)", lineHeight: 1.85, marginBottom: 44 }}>
              Solo necesitamos algunos datos para poder evaluar tu aplicación.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={labelBase}>Nombre completo</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre completo" style={inputBase} />
              </div>
              <div>
                <label style={labelBase}>Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" style={inputBase} />
              </div>
              <div>
                <label style={labelBase}>Empresa</label>
                <input required value={company} onChange={e => setCompany(e.target.value)} placeholder="Nombre de tu empresa" style={inputBase} />
              </div>
              <div>
                <label style={labelBase}>Cargo <span style={{ opacity: .4 }}>(opcional)</span></label>
                <input value={role} onChange={e => setRole(e.target.value)} placeholder="Tu cargo" style={inputBase} />
              </div>

              <div style={{ height: 1, background: "rgba(178,192,204,.06)", margin: "4px 0" }} />

              <div>
                <label style={{ ...labelBase, marginBottom: 14, textTransform: "none", fontSize: 12, letterSpacing: "-.005em", color: "rgba(178,192,204,.52)", lineHeight: 1.6 }}>
                  ¿Qué querés que cambie en tu empresa después de este proyecto?
                </label>
                <textarea
                  required value={vision} onChange={e => setVision(e.target.value)} rows={4}
                  placeholder="Escribí libremente. No hay respuestas incorrectas."
                  style={{ ...inputBase, resize: "none", height: 108, borderBottom: "none", border: "1px solid rgba(178,192,204,.1)", padding: "14px 16px", lineHeight: 1.78, borderRadius: 0 }}
                />
              </div>

              <div style={{ paddingTop: 6 }}>
                <div style={{ display: "inline-block", padding: "1px", background: "linear-gradient(90deg, #3A4A5A 0%, #7A8E9E 22%, #C8D8E8 46%, #EEF4FA 52%, #C8D8E8 58%, #7A8E9E 78%, #3A4A5A 100%)", backgroundSize: "280% 100%", animation: "metalShimmer 4s ease-in-out infinite" }}>
                  <button
                    type="submit"
                    onMouseEnter={() => setSubmitHovered(true)}
                    onMouseLeave={() => setSubmitHovered(false)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 18, padding: "15px 36px", background: submitHovered ? "var(--color-silver)" : "#060606", color: submitHovered ? "#111" : "var(--color-text)", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", transition: "background .3s, color .3s" }}
                  >
                    Solicitar evaluación
                    <span style={{ display: "inline-flex", alignItems: "center", position: "relative", width: submitHovered ? 30 : 20, height: 1, background: "currentColor", transition: "width .3s", flexShrink: 0 }}>
                      <span style={{ position: "absolute", right: -1, top: -3, width: 6, height: 6, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* ─── CONFIRMATION ─── */}
        {step === "confirmed" && (
          <motion.div key="confirmed" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
            style={{ textAlign: "center", maxWidth: 560 }}
          >
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, ease: EASE }}
              style={{ width: 1, height: 52, background: "linear-gradient(to bottom, transparent, rgba(178,192,204,.3))", margin: "0 auto 36px", transformOrigin: "top" }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="font-display"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.025em", marginBottom: 14 }}
            >
              Tu aplicación fue recibida.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontSize: 14, color: "var(--color-text-3)", lineHeight: 1.85, marginBottom: 56 }}
            >
              Ahora comienza nuestro proceso de evaluación.
            </motion.p>

            <div style={{ textAlign: "left", marginBottom: 52 }}>
              {NEXT_STEPS.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.45 + i * 0.15, ease: EASE }}
                  style={{ display: "flex", gap: 22, padding: "20px 0", borderBottom: "1px solid rgba(178,192,204,.06)" }}
                >
                  <span style={{ fontSize: 10, letterSpacing: ".3em", color: "rgba(178,192,204,.28)", flexShrink: 0, paddingTop: 2 }}>0{i + 1}</span>
                  <p style={{ fontSize: 13, color: "var(--color-text-3)", lineHeight: 1.8 }}>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
              <div style={{ width: 32, height: 1, background: "rgba(178,192,204,.12)", margin: "0 auto 20px" }} />
              <p style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.9 }}>
                Trabajamos con una cantidad limitada de proyectos para garantizar<br />
                el nivel de atención y excelencia que define a SuitWolf.
              </p>
              <p style={{ fontSize: 11, color: "rgba(178,192,204,.22)", marginTop: 10, letterSpacing: ".06em" }}>
                Respondemos cada aplicación en un plazo máximo de 72 horas.
              </p>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}
