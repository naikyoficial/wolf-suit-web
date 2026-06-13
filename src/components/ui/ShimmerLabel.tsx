"use client";

import { type CSSProperties } from "react";

/* Eyebrow label with continuous metal-shimmer gradient.
   Pass the same style props you'd give a <p> (fontSize, letterSpacing, margins…)
   — color is handled internally by the gradient. */
export function ShimmerLabel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        ...style,
        background:
          "linear-gradient(90deg, #7A8E9E 0%, #C0D8E8 22%, #E8F4FA 28%, #C0D8E8 38%, #7A8E9E 50%, #C0D8E8 62%, #E8F4FA 72%, #C0D8E8 78%, #7A8E9E 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "labelShimmer 6s linear infinite",
      }}
    >
      {children}
    </p>
  );
}
