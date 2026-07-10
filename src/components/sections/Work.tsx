"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { WORKS, type WorkProject } from "@/content";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

const GOLD =
  "linear-gradient(95deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)";

/* ─── Pantalla placeholder de marca (cuando aún no hay captura) ──── */
function PlaceholderScreen({ s }: { s: WorkProject }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px, 1.8vh, 18px)",
        padding: 24,
        textAlign: "center",
        background:
          "radial-gradient(120% 90% at 50% 24%, rgba(212,160,32,.13) 0%, transparent 56%), linear-gradient(162deg, #16120b 0%, #0b0a08 100%)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: "rgba(200,193,180,.5)",
        }}
      >
        {s.category}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          background: GOLD,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {s.name}
      </span>
      <span style={{ width: 40, height: 1, background: "rgba(212,160,32,.4)" }} />
    </div>
  );
}

/* ─── Maqueta con marco de navegador ────────────────────────────── */
function ProjectFrame({ s }: { s: WorkProject }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 40px 90px -42px rgba(0,0,0,.85)",
        background: "rgba(10,9,8,.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Barra del navegador */}
      <div
        className="work-browser-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 clamp(10px, 2vw, 16px)",
          height: "clamp(32px, 4.4vw, 40px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          background: "rgba(255,255,255,.02)",
        }}
      >
        <div style={{ display: "flex", gap: "clamp(5px, 0.9vw, 7px)", flexShrink: 0 }}>
          {["rgba(224,104,91,.7)", "rgba(233,180,76,.7)", "rgba(79,180,119,.7)"].map((c) => (
            <span
              key={c}
              className="work-browser-dot"
              style={{
                width: "clamp(7px, 1vw, 9px)",
                height: "clamp(7px, 1vw, 9px)",
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 320,
            margin: "0 auto",
            height: "clamp(18px, 2.4vw, 22px)",
            borderRadius: 6,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(9.5px, 1.2vw, 11px)",
              letterSpacing: ".02em",
              color: "rgba(200,193,180,.55)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.domain}
          </span>
        </div>
      </div>

      {/* Pantalla */}
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        {s.cover ? (
          <Image
            src={s.cover}
            alt={`Vista del proyecto ${s.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
              transform: `scale(${s.coverScale ?? 1})`,
              transformOrigin: "top center",
            }}
          />
        ) : (
          <PlaceholderScreen s={s} />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Fila de proyecto (layout editorial alternado) ─────────────── */
function ProjectRow({ s, reverse }: { s: WorkProject; reverse: boolean }) {
  return (
    <Reveal y={32}>
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: "clamp(24px, 4vw, 64px)", alignItems: "center" }}
      >
        {/* Visual */}
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          <ProjectFrame s={s} />
        </div>

        {/* Texto */}
        <div
          className={reverse ? "lg:order-1" : "lg:order-2"}
          style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 22px)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(10px, 1.05vw, 11px)",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              margin: 0,
            }}
          >
            {s.category}
          </p>

          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3.4vw, 2.6rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            {s.name}
          </h3>

          <p
            style={{
              fontSize: "clamp(15px, 1.05vw, 16px)",
              lineHeight: 1.72,
              color: "var(--color-text-2)",
              margin: 0,
              maxWidth: "34em",
            }}
          >
            {s.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(7px, 1vw, 10px)", marginTop: 2 }}>
            {s.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(9.5px, 1vw, 10.5px)",
                  letterSpacing: ".08em",
                  color: "var(--color-text-3)",
                  padding: "clamp(5px, 0.9vw, 7px) clamp(9px, 1.4vw, 13px)",
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,.09)",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {s.url && (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              Ver proyecto
              <span
                aria-hidden
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  width: 20,
                  height: 1,
                  background: "currentColor",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: -1,
                    top: -2.5,
                    width: 5,
                    height: 5,
                    borderRight: "1px solid currentColor",
                    borderTop: "1px solid currentColor",
                    transform: "rotate(45deg)",
                  }}
                />
              </span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Sección ───────────────────────────────────────────────────── */
export function Work() {
  return (
    <section id="trabajos" style={{ position: "relative", overflow: "hidden" }}>
      {/* Imagen de fondo */}
      <Image
        src="/background-trabajos.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />

      {/* Overlay oscuro */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)", zIndex: 1 }} />

      {/* Viñeta perimetral */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(110% 90% at 50% 50%, transparent 40%, rgba(0,0,0,.72) 100%)",
        }}
      />

      {/* Fade superior */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "55%",
          background: "linear-gradient(to bottom, rgba(6,5,4,1) 0%, rgba(6,5,4,.7) 42%, transparent 100%)",
        }}
      />

      {/* Fade inferior */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          pointerEvents: "none",
          height: "55%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(6,5,4,.78) 50%, rgba(6,5,4,1) 100%)",
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--section-py) var(--section-px)",
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
        }}
      >
        <Reveal>
          <p className="section-index" style={{ marginBottom: "clamp(32px, 6vh, 68px)" }}>
            04 — Trabajos
          </p>
        </Reveal>

        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vh, 96px)" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                margin: "0 0 clamp(14px, 2vh, 20px)",
              }}
            >
              Una muestra de{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#D9B36A" }}>
                lo que construimos.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                fontSize: "clamp(15px, 1.05vw, 16px)",
                lineHeight: 1.7,
                color: "var(--color-text-2)",
                margin: "0 auto",
                maxWidth: "40em",
              }}
            >
              Cada proyecto, pensado a medida y construido desde cero para el objetivo de su cliente.
            </p>
          </Reveal>
        </div>

        {/* Filas de proyectos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px, 10vh, 128px)" }}>
          {WORKS.map((s, i) => (
            <ProjectRow key={s.name} s={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
