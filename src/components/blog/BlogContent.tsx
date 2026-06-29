"use client";

import { useState } from "react";
import Link from "next/link";
import { CategoryFilter } from "./CategoryFilter";
import { BlogCardImage } from "./BlogCardImage";
import { NewsletterSection } from "./NewsletterSection";
import type { PostMeta } from "@/lib/blog-types";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";
const PAGE_SIZE = 12;

export function BlogContent({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [ctaHov, setCtaHov] = useState(false);

  const filtered = activeCategory === "todos"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  // Grid split: featured (first) + stacked pair (2nd, 3rd) + rest in 3-col
  const featured = shown[0];
  const stacked  = shown.slice(1, 3);
  const grid3    = shown.slice(3);

  return (
    <>
      {/* ── Category filter ── */}
      <CategoryFilter active={activeCategory} onChange={(c) => { setActiveCategory(c); setVisible(PAGE_SIZE); }} />

      {/* ── Cards ── */}
      <section style={{ padding: "clamp(40px,5vh,64px) clamp(1.5rem,8vw,7.5rem)" }}>

        {shown.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-4)", fontSize: 13, padding: "80px 0" }}>
            No hay artículos en esta categoría todavía.
          </p>
        )}

        {/* Row 1: featured + 2 stacked */}
        {featured && (
          <div style={{
            display: "grid",
            gridTemplateColumns: stacked.length > 0 ? "1fr 1fr" : "1fr",
            gap: "clamp(12px,1.5vw,20px)",
            marginBottom: "clamp(12px,1.5vw,20px)",
          }}
            className="blog-row-1"
          >
            <BlogCardImage post={featured} size="featured" />

            {stacked.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateRows: stacked.length === 2 ? "1fr 1fr" : "1fr",
                gap: "clamp(12px,1.5vw,20px)",
              }}>
                {stacked.map((p) => (
                  <BlogCardImage key={p.slug} post={p} size="medium" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Row 2: 3-column grid */}
        {grid3.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(12px,1.5vw,20px)",
            marginBottom: "clamp(12px,1.5vw,20px)",
          }}
            className="blog-row-2"
          >
            {grid3.map((p) => (
              <BlogCardImage key={p.slug} post={p} size="small" />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "clamp(32px,4vh,48px)" }}>
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => setCtaHov(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 36px",
                background: "none",
                border: `1px solid ${ctaHov ? "rgba(212,160,32,.5)" : "rgba(212,160,32,.2)"}`,
                color: ctaHov ? "rgba(212,160,32,.9)" : "rgba(212,160,32,.5)",
                fontSize: 9,
                letterSpacing: ".38em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color .3s, color .3s",
                fontFamily: "var(--font-body)",
              }}
            >
              Cargar más artículos
              <span style={{ fontSize: 14, lineHeight: 1 }}>↻</span>
            </button>
          </div>
        )}
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSection />

      <style>{`
        @media (max-width: 768px) {
          .blog-row-1 { grid-template-columns: 1fr !important; }
          .blog-row-2 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .blog-row-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
