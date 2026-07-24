import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SEO } from "@/config/seo";
import { BLOG_POSTS } from "@/config/blog";

const URL = `${SEO.url}/blog`;

export const metadata: Metadata = {
  title: "Blog de Diseño y Desarrollo Web | Suitwolf",
  description:
    "Guías y artículos sobre diseño web, desarrollo a medida, conversión y SEO para empresas que se toman en serio su presencia digital.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Blog de Diseño y Desarrollo Web | Suitwolf",
    description:
      "Guías sobre diseño web, desarrollo a medida, conversión y SEO para empresas exigentes.",
    url: URL,
    type: "website",
  },
};

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogHub() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="relative" style={{ background: "var(--color-surface)" }}>
      {/* Encabezado */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(48px, 8vh, 96px) var(--section-px) clamp(32px, 5vh, 56px)",
        }}
      >
        <Breadcrumbs
          items={[
            { name: "Inicio", url: SEO.url },
            { name: "Blog", url: URL },
          ]}
        />
        <div style={{ marginTop: "clamp(32px, 5vh, 56px)" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                margin: "0 0 clamp(14px, 1.8vh, 20px)",
              }}
            >
              Blog
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: "var(--color-text)",
                margin: "0 0 clamp(14px, 2vh, 20px)",
                maxWidth: "14em",
              }}
            >
              Ideas sobre diseño web, conversión y estrategia digital
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                fontSize: "clamp(14px, 1.05vw, 16px)",
                lineHeight: 1.7,
                color: "var(--color-text-3)",
                margin: 0,
                maxWidth: "44em",
              }}
            >
              Guías y recursos para empresas que quieren entender cómo funciona la presencia digital de verdad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Listado */}
      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "0 var(--section-px) clamp(64px, 9vh, 120px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => {
            const coverSrc = post.cover ?? `/blog-cover/${post.slug}?v=2`;
            return (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-hover
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr clamp(200px, 28%, 340px)",
                  gap: "clamp(28px, 4vw, 56px)",
                  alignItems: "center",
                  padding: "clamp(36px, 5vh, 56px) 0",
                  borderTop: "1px solid rgba(255,255,255,.08)",
                  textDecoration: "none",
                }}
                className="blog-card"
              >
                {/* Columna izquierda — texto */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.4vh, 16px)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "var(--color-text-4)",
                      margin: 0,
                    }}
                  >
                    {fmtDate(post.date)}&ensp;·&ensp;{post.readingMinutes} min
                  </p>

                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                      lineHeight: 1.12,
                      letterSpacing: "-0.022em",
                      color: "var(--color-text)",
                      margin: 0,
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "clamp(14px, 1.05vw, 15.5px)",
                      lineHeight: 1.72,
                      color: "var(--color-text-3)",
                      margin: 0,
                      maxWidth: "46em",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                    }}
                  >
                    Leer artículo →
                  </span>
                </div>

                {/* Columna derecha — imagen (real o SVG dinámico) */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: "clamp(12px, 1.4vw, 18px)",
                    overflow: "hidden",
                    background: "#0e0c09",
                    border: "1px solid rgba(255,255,255,.07)",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={coverSrc}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 340px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .blog-card {
            grid-template-columns: 1fr !important;
          }
          .blog-card > div:last-child {
            aspect-ratio: 16 / 9 !important;
          }
        }
      `}</style>
    </main>
  );
}
