import type { Metadata } from "next";
import Link from "next/link";
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
                margin: "0 0 clamp(18px, 2.4vh, 26px)",
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
                fontSize: "clamp(2.1rem, 5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                margin: 0,
                maxWidth: "16em",
              }}
            >
              Ideas sobre diseño web, conversión y estrategia digital
            </h1>
          </Reveal>
        </div>
      </section>

      <section
        style={{
          maxWidth: "var(--grid-max)",
          margin: "0 auto",
          padding: "clamp(24px, 4vh, 48px) var(--section-px) clamp(64px, 9vh, 120px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-hover
                style={{
                  display: "block",
                  padding: "clamp(28px, 4vh, 44px) 0",
                  borderTop: "1px solid rgba(255,255,255,.1)",
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--color-text-4)",
                    margin: "0 0 14px",
                  }}
                >
                  {fmtDate(post.date)} · {post.readingMinutes} min
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--color-text)",
                    margin: "0 0 14px",
                    maxWidth: "20em",
                  }}
                >
                  {post.title}
                </h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-text-3)", margin: 0, maxWidth: "40em" }}>
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
