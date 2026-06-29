"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryBadge } from "./CategoryBadge";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

export function BlogCard({ post }: { post: PostMeta }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article style={{
        position: "relative",
        padding: "clamp(28px,3vw,40px)",
        background: hov ? "rgba(212,160,32,.03)" : "rgba(10,9,8,.6)",
        border: `1px solid ${hov ? "rgba(212,160,32,.22)" : "rgba(212,160,32,.08)"}`,
        transition: "background .4s, border-color .4s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: hov
            ? "linear-gradient(to right, transparent, rgba(212,160,32,.5), transparent)"
            : "linear-gradient(to right, transparent, rgba(212,160,32,.12), transparent)",
          transition: "background .4s",
        }} />

        <CategoryBadge label={post.category} />

        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px,2.2vw,30px)",
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: "-.02em",
          color: hov ? "var(--color-text)" : "rgba(240,235,225,.82)",
          transition: "color .4s",
          margin: 0,
          flex: 1,
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: 13,
          color: "var(--color-text-3)",
          lineHeight: 1.8,
          margin: 0,
        }}>
          {post.excerpt}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          borderTop: "1px solid rgba(212,160,32,.07)",
        }}>
          <span style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--color-text-4)" }}>
            {formatDate(post.date)}
          </span>
          <span style={{ fontSize: 10, letterSpacing: ".1em", color: "rgba(212,160,32,.4)" }}>
            {post.readingTime} min de lectura
          </span>
        </div>

        {/* Arrow */}
        <div style={{
          position: "absolute",
          bottom: "clamp(28px,3vw,40px)",
          right: "clamp(28px,3vw,40px)",
          width: hov ? 28 : 18,
          height: 1,
          background: "rgba(212,160,32,.4)",
          transition: "width .4s",
        }}>
          <span style={{
            position: "absolute", right: -1, top: -3,
            width: 6, height: 6,
            borderRight: "1px solid rgba(212,160,32,.4)",
            borderTop: "1px solid rgba(212,160,32,.4)",
            transform: "rotate(45deg)",
          }} />
        </div>
      </article>
    </Link>
  );
}
