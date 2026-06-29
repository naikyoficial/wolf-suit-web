import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { ArticleImage } from "@/components/blog/ArticleImage";
import { ArticleCallout } from "@/components/blog/ArticleCallout";
import { BlogCard } from "@/components/blog/BlogCard";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `https://suitwolf.com/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://suitwolf.com/blog/${slug}`,
        type: "article",
        publishedTime: post.date,
      },
    };
  } catch {
    return {};
  }
}

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(24px,2.5vw,36px)",
      fontWeight: 300,
      lineHeight: 1.15,
      letterSpacing: "-.022em",
      color: "var(--color-text)",
      marginTop: "clamp(48px,6vh,72px)",
      marginBottom: 20,
    }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(20px,2vw,28px)",
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: "-.018em",
      color: "rgba(240,235,225,.9)",
      marginTop: "clamp(32px,4vh,48px)",
      marginBottom: 14,
    }} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{
      fontSize: "clamp(15px,1.1vw,17px)",
      color: "rgba(210,205,195,.78)",
      lineHeight: 1.95,
      marginBottom: 24,
    }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ color: "rgba(240,235,225,.95)", fontWeight: 500 }} />
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24, counterReset: "li" }}>{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li style={{
      fontSize: "clamp(15px,1.1vw,17px)",
      color: "rgba(210,205,195,.78)",
      lineHeight: 1.9,
      paddingLeft: 24,
      marginBottom: 10,
      position: "relative",
    }}>
      <span aria-hidden style={{
        position: "absolute", left: 0, top: "0.7em",
        width: 6, height: 1,
        background: "rgba(212,160,32,.5)",
        display: "inline-block",
      }} />
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{
      margin: "clamp(32px,4vh,48px) 0",
      paddingLeft: "clamp(20px,3vw,32px)",
      borderLeft: "3px solid rgba(212,160,32,.35)",
      fontSize: "clamp(16px,1.2vw,19px)",
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontStyle: "italic",
      color: "rgba(220,215,205,.75)",
      lineHeight: 1.75,
    }}>{children}</blockquote>
  ),
  ArticleImage,
  ArticleCallout,
  ArticleCTA,
  hr: () => (
    <hr style={{
      border: "none",
      height: 1,
      background: "linear-gradient(to right, transparent, rgba(212,160,32,.2), transparent)",
      margin: "clamp(40px,6vh,64px) 0",
    }} />
  ),
};

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);
  const fallbackRelated = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2 - related.length);
  const relatedPosts = [...related, ...fallbackRelated];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "SuitWolf" },
    publisher: {
      "@type": "Organization",
      name: "SuitWolf",
      url: "https://suitwolf.com",
    },
  };

  return (
    <main style={{ background: "#050403", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ── */}
      <header style={{
        position: "relative",
        padding: "clamp(72px,10vh,120px) clamp(1.5rem,8vw,7.5rem) clamp(48px,6vh,80px)",
        overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(168,108,5,.08) 0%, transparent 70%)",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(212,160,32,.12), transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <Link href="/" style={{
              fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
              color: "rgba(180,174,164,.35)", textDecoration: "none",
              transition: "color .3s",
            }}>
              Inicio
            </Link>
            <span style={{ color: "rgba(212,160,32,.25)", fontSize: 10 }}>›</span>
            <Link href="/blog" style={{
              fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
              color: "rgba(180,174,164,.35)", textDecoration: "none",
            }}>
              Blog
            </Link>
            <span style={{ color: "rgba(212,160,32,.25)", fontSize: 10 }}>›</span>
            <span style={{
              fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase",
              color: "rgba(212,160,32,.45)",
            }}>
              {post.category}
            </span>
          </nav>

          <div style={{ marginBottom: 24 }}>
            <CategoryBadge label={post.category} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px,4.5vw,64px)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-.028em",
            color: "var(--color-text)",
            marginBottom: 28,
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: "clamp(15px,1.2vw,18px)",
            color: "var(--color-text-3)",
            lineHeight: 1.8,
            marginBottom: 36,
          }}>
            {post.excerpt}
          </p>

          {/* Meta bar */}
          <div style={{
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20,
            paddingTop: 24,
            borderTop: "1px solid rgba(212,160,32,.1)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28,
                border: "1px solid rgba(212,160,32,.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12,
              }}>
                🐺
              </div>
              <span style={{
                fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
                color: "rgba(200,195,185,.5)",
              }}>
                SuitWolf Studio
              </span>
            </div>
            <span style={{ width: 1, height: 14, background: "rgba(212,160,32,.12)" }} />
            <span style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--color-text-4)" }}>
              {formatDate(post.date)}
            </span>
            <span style={{ width: 1, height: 14, background: "rgba(212,160,32,.12)" }} />
            <span style={{ fontSize: 10, letterSpacing: ".1em", color: "rgba(212,160,32,.4)" }}>
              {post.readingTime} min de lectura
            </span>
          </div>
        </div>
      </header>

      {/* ── Article body ── */}
      <article style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "clamp(40px,6vh,72px) clamp(1.5rem,8vw,7.5rem)",
      }}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
        />

        <ArticleCTA variant="end" />
      </article>

      {/* ── Related posts ── */}
      {relatedPosts.length > 0 && (
        <section style={{
          padding: "clamp(40px,6vh,72px) clamp(1.5rem,8vw,7.5rem) clamp(80px,10vh,120px)",
          borderTop: "1px solid rgba(212,160,32,.07)",
          maxWidth: "calc(780px + clamp(3rem,16vw,15rem))",
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <span style={{
              fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase",
              color: "rgba(180,174,164,.35)",
            }}>
              Seguí leyendo
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(212,160,32,.08)" }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px), 1fr))",
            gap: "clamp(16px,2vw,24px)",
          }}>
            {relatedPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
