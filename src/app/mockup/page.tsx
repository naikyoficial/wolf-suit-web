import Link from "next/link";

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-gold tracking-[0.22em] uppercase mb-8 font-body font-medium">
      {children}
    </p>
  );
}

export default function MockupPage() {
  return (
    <div className="bg-surface text-text">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center px-[--section-px] pt-16">
        <div className="max-w-[--grid-max] mx-auto w-full">

          <p className="text-xs text-gold tracking-[0.25em] uppercase mb-12 font-body">
            Firma Estratégica Digital
          </p>

          <h1
            className="font-display font-light text-text leading-[1.04] mb-10"
            style={{
              fontSize: "var(--type-hero)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Antes de que<br />
            te escuchen,<br />
            <em
              className="not-italic"
              style={{ color: "var(--color-text-3)" }}
            >
              ya decidieron.
            </em>
          </h1>

          <p
            className="text-text-3 font-body max-w-md mb-14"
            style={{
              fontSize: "var(--type-h3)",
              lineHeight: "var(--leading-normal)",
            }}
          >
            Construimos la representación digital de empresas que
            se niegan a competir en precio.
          </p>

          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold text-surface-2 text-sm font-medium tracking-wide rounded-sm transition-all duration-200 hover:-translate-y-px hover:shadow-gold"
          >
            Iniciar proyecto
          </Link>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-[--section-px] flex items-center gap-3"
        >
          <div className="w-10 h-px" style={{ background: "var(--border-medium)" }} />
          <span className="text-xs text-text-4 tracking-[0.15em] uppercase">
            Continuar
          </span>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── MANIFESTO ─────────────────────────────────────────── */}
      <section className="py-[--section-py] px-[--section-px]">
        <div className="max-w-[--grid-max] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-start-4 md:col-span-8 lg:col-start-5 lg:col-span-7">
              <SectionTag>Manifiesto</SectionTag>
              <blockquote
                className="font-display font-light text-text leading-[1.2] mb-10"
                style={{
                  fontSize: "var(--type-h1)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                "Las empresas son juzgadas antes de ser comprendidas."
              </blockquote>
              <div className="w-10 h-px mb-10" style={{ background: "var(--color-silver)" }} />
              <p className="text-text-3 leading-relaxed max-w-prose text-sm">
                La percepción precede a la confianza. La confianza precede a la decisión.
                La decisión precede al crecimiento. Por eso, todo lo que hacemos existe
                para construir una única cosa: el nivel de percepción que tu empresa merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── MÉTODO ────────────────────────────────────────────── */}
      <section className="py-[--section-py] px-[--section-px]" style={{ background: "var(--color-surface-1)" }}>
        <div className="max-w-[--grid-max] mx-auto">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
              <SectionTag>Método</SectionTag>
              <h2
                className="font-display font-light text-text leading-tight"
                style={{
                  fontSize: "var(--type-h1)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Un proceso diseñado para la excelencia.
              </h2>
            </div>

            <div className="col-span-12 md:col-start-6 md:col-span-7">
              {[
                {
                  n: "01",
                  title: "Diagnóstico estratégico",
                  desc: "Analizamos la brecha entre cómo te percibe el mercado hoy y cómo deberías ser percibido.",
                },
                {
                  n: "02",
                  title: "Arquitectura de percepción",
                  desc: "Definimos el relato visual y la experiencia que convierte esa brecha en ventaja competitiva.",
                },
                {
                  n: "03",
                  title: "Construcción de referencia",
                  desc: "Ejecutamos con la precisión de una firma internacional. Cada detalle es intencional.",
                },
                {
                  n: "04",
                  title: "Entrega y evolución",
                  desc: "Entregamos un sistema vivo. Tu empresa crece; tu presencia digital crece con ella.",
                },
              ].map((step, i, arr) => (
                <div
                  key={step.n}
                  className="flex gap-10 py-9"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                  }}
                >
                  <span
                    className="text-xs font-mono tracking-widest pt-0.5 shrink-0 w-6"
                    style={{ color: "var(--color-silver-dim)" }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-text font-medium mb-2 text-sm tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-text-3 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── TRANSFORMACIONES ──────────────────────────────────── */}
      <section className="py-[--section-py] px-[--section-px]">
        <div className="max-w-[--grid-max] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionTag>Transformaciones</SectionTag>
              <h2
                className="font-display font-light text-text leading-tight max-w-xl"
                style={{
                  fontSize: "var(--type-h1)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Lo que cambia cuando trabajamos juntos.
              </h2>
            </div>
            <p className="text-text-4 text-xs max-w-[200px] text-right hidden md:block leading-relaxed">
              No diseñamos páginas.<br />
              Transformamos percepciones.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{
              gap: "1px",
              background: "var(--border-default)",
            }}
          >
            {[
              {
                title: "Percepción de liderazgo",
                body: "Tu empresa deja de competir por precio porque el mercado la percibe como referente.",
                outcome: "De una empresa más, a la firma que define el estándar.",
              },
              {
                title: "Confianza instantánea",
                body: "El usuario confía antes de leer una sola línea. La experiencia visual hace el trabajo.",
                outcome: "De tener que convencer, a ser la opción obvia.",
              },
              {
                title: "Autoridad digital",
                body: "Tu presencia transmite el nivel de excelencia que tus clientes esperan en cada contacto.",
                outcome: "De parecer profesional, a ser percibido como el mejor.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-6 p-10"
                style={{ background: "var(--color-surface)" }}
              >
                <h3
                  className="font-display font-light text-text leading-snug"
                  style={{ fontSize: "var(--type-h3)" }}
                >
                  {item.title}
                </h3>
                <p className="text-text-3 text-sm leading-relaxed flex-1">
                  {item.body}
                </p>
                <div
                  className="pt-6"
                  style={{ borderTop: "1px solid var(--border-subtle)" }}
                >
                  <p
                    className="text-xs tracking-wide font-display italic"
                    style={{ color: "var(--color-silver-dim)" }}
                  >
                    {item.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── TRABAJO ───────────────────────────────────────────── */}
      <section className="py-[--section-py] px-[--section-px]" style={{ background: "var(--color-surface-1)" }}>
        <div className="max-w-[--grid-max] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <SectionTag>Trabajo</SectionTag>
              <h2
                className="font-display font-light text-text leading-tight"
                style={{
                  fontSize: "var(--type-h1)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Proyectos seleccionados.
              </h2>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "1px", background: "var(--border-default)" }}
          >
            {[
              { industry: "Tecnología B2B", tag: "Experiencia digital", year: "2026" },
              { industry: "Consultoría estratégica", tag: "Identidad + Web", year: "2026" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between p-10 cursor-pointer"
                style={{
                  background: "var(--color-surface-2)",
                  aspectRatio: "4/3",
                }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs text-text-4 tracking-wide">
                    {item.industry}
                  </span>
                  <span className="text-xs text-text-4">{item.year}</span>
                </div>

                <div>
                  <p className="text-xs text-text-4 tracking-wide mb-3">
                    {item.tag}
                  </p>
                  <div
                    className="h-px w-8"
                    style={{ background: "var(--color-silver)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── AUTORIDAD ─────────────────────────────────────────── */}
      <section className="py-[--section-py] px-[--section-px]">
        <div className="max-w-[--grid-max] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-start-3 md:col-span-8 text-center">
              <SectionTag>Autoridad</SectionTag>
              <blockquote
                className="font-display font-light text-text-2 leading-snug mb-8"
                style={{
                  fontSize: "var(--type-h2)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                "Suitwolf transformó la forma en que nuestros
                clientes nos perciben desde el primer segundo."
              </blockquote>
              <p className="text-text-4 text-xs tracking-[0.12em] uppercase">
                — Nombre Apellido, Director General · Empresa
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "var(--border-subtle)" }} />

      {/* ── APLICACIÓN ────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-[--section-py] px-[--section-px]"
        style={{ background: "var(--color-surface-1)" }}
      >
        <div className="max-w-[--grid-max] mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <SectionTag>Aplicación</SectionTag>
              <h2
                className="font-display font-light text-text leading-tight mb-6"
                style={{
                  fontSize: "var(--type-h1)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Seleccionamos los proyectos en los que trabajamos.
              </h2>
              <p className="text-text-3 text-sm leading-relaxed">
                No buscamos clientes. Buscamos empresas que comprendan
                que la percepción es el activo más valioso que pueden construir.
              </p>
            </div>

            <div className="col-span-12 md:col-start-7 md:col-span-6">
              <form className="flex flex-col gap-5">
                {[
                  { label: "Nombre", placeholder: "Tu nombre completo", type: "text" },
                  { label: "Email", placeholder: "tu@empresa.com", type: "email" },
                  { label: "Empresa", placeholder: "Nombre de tu empresa", type: "text" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <label className="text-xs text-text-4 tracking-[0.12em] uppercase">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="h-12 px-4 bg-transparent text-text text-sm placeholder:text-text-4 rounded-sm transition-colors duration-200"
                      style={{ border: "1px solid var(--border-default)" }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-text-4 tracking-[0.12em] uppercase">
                    Tu proyecto
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu empresa y qué quieres lograr."
                    className="px-4 py-3 bg-transparent text-text text-sm placeholder:text-text-4 rounded-sm resize-none transition-colors duration-200"
                    style={{ border: "1px solid var(--border-default)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 h-12 px-7 bg-gold text-surface-2 text-sm font-medium tracking-wide rounded-sm hover:-translate-y-px hover:shadow-gold transition-all duration-200 self-start cursor-pointer"
                >
                  Enviar solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
