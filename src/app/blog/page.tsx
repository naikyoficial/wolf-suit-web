import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog — Diseño Web, SEO y Estrategia Digital",
  description:
    "Artículos sobre diseño web profesional, SEO, e-commerce y estrategia digital para empresas que quieren crecer. Contenido práctico, sin relleno.",
  alternates: { canonical: "https://suitwolf.com/blog" },
  openGraph: {
    title: "Blog de SuitWolf — Diseño Web y Estrategia Digital",
    description:
      "Artículos sobre diseño web profesional, SEO, e-commerce y estrategia digital para empresas que quieren crecer.",
    url: "https://suitwolf.com/blog",
  },
};

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "#060504", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{
        position: "relative",
        padding: "clamp(72px,10vh,120px) clamp(1.5rem,8vw,7.5rem) clamp(56px,7vh,88px)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px,5vw,80px)",
        alignItems: "center",
      }}
        className="blog-hero"
      >
        {/* Atmosphere */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(168,108,5,.08) 0%, transparent 70%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15,
          backgroundImage: "radial-gradient(circle, rgba(212,160,32,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* Bottom border */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(212,160,32,.12), transparent)",
        }} />

        {/* Left: text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{
              fontSize: 9, letterSpacing: ".48em", textTransform: "uppercase",
              background: GOLD, backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", animation: "metalShimmer 10s ease-in-out infinite",
            }}>
              Blog
            </span>
            <div style={{ width: 28, height: 1, background: "rgba(212,160,32,.3)" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(38px,5vw,72px)",
            fontWeight: 300,
            lineHeight: 1.06,
            letterSpacing: "-.028em",
            color: "var(--color-text)",
            marginBottom: 24,
          }}>
            Conocimiento que construye{" "}
            <span style={{
              background: GOLD, backgroundSize: "260% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", animation: "metalShimmer 7s ease-in-out infinite",
              fontStyle: "italic",
            }}>
              resultados.
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(13px,1.1vw,16px)",
            color: "var(--color-text-3)",
            lineHeight: 1.8,
            marginBottom: 36,
            maxWidth: 380,
          }}>
            Estrategias, tendencias y metodologías para empresas que buscan liderar en el mundo digital.
          </p>

          <a
            href="#articulos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 28px",
              border: "1px solid rgba(212,160,32,.35)",
              color: "rgba(240,235,225,.75)",
              fontSize: 9,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color .3s, color .3s",
            }}
          >
            Explorar artículos
            <span style={{
              display: "inline-flex", alignItems: "center", position: "relative",
              width: 18, height: 1, background: "currentColor", flexShrink: 0,
            }}>
              <span style={{
                position: "absolute", right: -1, top: -3,
                width: 5, height: 5,
                borderRight: "1px solid currentColor",
                borderTop: "1px solid currentColor",
                transform: "rotate(45deg)",
              }} />
            </span>
          </a>
        </div>

        {/* Right: decorative placeholder (user adds image later) */}
        <div style={{
          position: "relative", zIndex: 1,
          height: "clamp(280px,38vh,460px)",
          border: "1px solid rgba(212,160,32,.08)",
          background: "radial-gradient(ellipse 80% 70% at 60% 40%, rgba(168,108,5,.1) 0%, rgba(6,5,4,1) 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
          className="blog-hero-image"
        >
          {/* Decorative text */}
          <div style={{ textAlign: "center", userSelect: "none", opacity: 0.35 }}>
            {["IDENTIDAD", "PERCEPCIÓN", "EXCELENCIA"].map((word, i) => (
              <p key={word} style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14px,1.5vw,20px)",
                fontWeight: 300,
                letterSpacing: ".35em",
                color: "rgba(212,160,32,.6)",
                margin: "8px 0",
                animationDelay: `${i * 0.3}s`,
              }}>
                {word}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Cards + Newsletter ── */}
      <div id="articulos">
        <BlogContent posts={posts} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-hero { grid-template-columns: 1fr !important; }
          .blog-hero-image { display: none !important; }
        }
      `}</style>
    </main>
  );
}
