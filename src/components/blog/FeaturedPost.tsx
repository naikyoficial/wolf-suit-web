"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryBadge } from "./CategoryBadge";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function FeaturedPost({ post }: { post: PostMeta }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: "none", display: "block", marginBottom: "clamp(40px,6vh,72px)" }}
    >
      <article style={{
        position: "relative",
        padding: "clamp(36px,5vw,64px)",
        background: hov ? "rgba(212,160,32,.04)" : "rgba(10,9,8,.7)",
        border: `1px solid ${hov ? "rgba(212,160,32,.28)" : "rgba(212,160,32,.12)"}`,
        transition: "background .5s, border-color .5s",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "clamp(24px,4vw,56px)",
        alignItems: "center",
      }}>
        {/* Shimmer top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: GOLD, backgroundSize: "260% 100%",
          animation: "metalShimmer 8s ease-in-out infinite",
          opacity: hov ? 0.5 : 0.2,
          transition: "opacity .5s",
        }} />

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <CategoryBadge label={post.category} />
            <span style={{
              fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase",
              color: "rgba(212,160,32,.35)",
            }}>
              Artículo destacado
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px,3.5vw,52px)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-.025em",
            color: hov ? "var(--color-text)" : "rgba(240,235,225,.88)",
            transition: "color .4s",
            margin: "0 0 20px",
          }}>
            {post.title}
          </h2>

          <p style={{
            fontSize: "clamp(13px,1.1vw,15px)",
            color: "var(--color-text-3)",
            lineHeight: 1.85,
            maxWidth: 560,
            margin: "0 0 28px",
          }}>
            {post.excerpt}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--color-text-4)" }}>
              {formatDate(post.date)}
            </span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(212,160,32,.2)", flexShrink: 0 }} />
            <span style={{ fontSize: 10, letterSpacing: ".1em", color: "rgba(212,160,32,.45)" }}>
              {post.readingTime} min de lectura
            </span>
          </div>
        </div>

        {/* Right arrow CTA */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: hov ? 1 : 0.4,
          transition: "opacity .4s",
        }}>
          <div style={{
            width: 1,
            height: hov ? 56 : 40,
            background: "linear-gradient(to bottom, transparent, rgba(212,160,32,.5))",
            transition: "height .4s",
          }} />
          <div style={{
            width: 8, height: 8,
            borderRight: "1px solid rgba(212,160,32,.6)",
            borderBottom: "1px solid rgba(212,160,32,.6)",
            transform: "rotate(45deg)",
          }} />
        </div>
      </article>
    </Link>
  );
}
