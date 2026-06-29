"use client";

import Link from "next/link";
import { useState } from "react";
import type { PostMeta } from "@/lib/blog-types";
import { formatDateShort } from "@/lib/blog-types";

const GRADIENTS = [
  "linear-gradient(135deg, #0D0B06 0%, #1C1408 60%, #0A0803 100%)",
  "linear-gradient(135deg, #0A0D0A 0%, #0D160E 60%, #080A08 100%)",
  "linear-gradient(135deg, #0D0A0D 0%, #160E16 60%, #0A080A 100%)",
  "linear-gradient(135deg, #0D0D0A 0%, #18150A 60%, #0A0A06 100%)",
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) & 0xffff;
  return h % GRADIENTS.length;
}

interface Props {
  post: PostMeta;
  size?: "featured" | "medium" | "small";
}

export function BlogCardImage({ post, size = "small" }: Props) {
  const [hov, setHov] = useState(false);
  const bg = GRADIENTS[hashSlug(post.slug)];

  const heights: Record<string, string> = {
    featured: "clamp(380px,45vh,560px)",
    medium:   "clamp(200px,22vh,280px)",
    small:    "clamp(220px,26vh,320px)",
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <article
        style={{
          position: "relative",
          height: size === "featured" ? "100%" : heights[size],
          minHeight: heights[size],
          overflow: "hidden",
          border: `1px solid ${hov ? "rgba(212,160,32,.22)" : "rgba(255,255,255,.06)"}`,
          transition: "border-color .4s",
          background: post.coverImage ? undefined : bg,
        }}
      >
        {/* Background image */}
        {post.coverImage && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${post.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform .8s cubic-bezier(.16,1,.3,1)",
          }} />
        )}

        {/* Gradient overlay — always, for text readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: post.coverImage
            ? "linear-gradient(to top, rgba(4,3,2,.95) 0%, rgba(4,3,2,.5) 50%, rgba(4,3,2,.15) 100%)"
            : "linear-gradient(to top, rgba(4,3,2,.98) 0%, rgba(4,3,2,.3) 100%)",
          transition: "opacity .4s",
        }} />

        {/* Subtle gold radial glow (no-image placeholder) */}
        {!post.coverImage && (
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(168,108,5,.12) 0%, transparent 70%)",
          }} />
        )}

        {/* Content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: size === "featured" ? "clamp(24px,3vw,36px)" : "clamp(18px,2.5vw,28px)",
          zIndex: 1,
        }}>
          {/* Top: category */}
          <div>
            <span style={{
              fontSize: 8,
              letterSpacing: ".38em",
              textTransform: "uppercase",
              color: "rgba(212,160,32,.75)",
              border: "1px solid rgba(212,160,32,.22)",
              padding: "4px 10px",
            }}>
              {post.category}
            </span>
          </div>

          {/* Bottom: title + meta */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: size === "featured"
                ? "clamp(22px,2.5vw,36px)"
                : "clamp(17px,1.8vw,24px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              color: "rgba(245,242,235,.92)",
              margin: "0 0 clamp(12px,1.5vh,20px)",
            }}>
              {post.title}
            </h3>

            {size === "featured" && (
              <p style={{
                fontSize: 13,
                color: "rgba(200,195,185,.55)",
                lineHeight: 1.75,
                marginBottom: 20,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {post.excerpt}
              </p>
            )}

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontSize: 9,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "rgba(180,174,164,.45)",
              }}>
                {post.readingTime} min lectura
                <span style={{ margin: "0 8px", opacity: .4 }}>·</span>
                {formatDateShort(post.date)}
              </span>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
                width: hov ? 28 : 18,
                height: 1,
                background: "rgba(212,160,32,.5)",
                flexShrink: 0,
                transition: "width .4s",
              }}>
                <span style={{
                  position: "absolute", right: -1, top: -3,
                  width: 6, height: 6,
                  borderRight: "1px solid rgba(212,160,32,.5)",
                  borderTop: "1px solid rgba(212,160,32,.5)",
                  transform: "rotate(45deg)",
                }} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
