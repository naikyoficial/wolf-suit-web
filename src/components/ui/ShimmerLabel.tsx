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
          "linear-gradient(90deg, #4A5A6A 0%, #7A8E9E 20%, #B8CCD8 44%, #E8F0F6 52%, #B8CCD8 60%, #7A8E9E 80%, #4A5A6A 100%)",
        backgroundSize: "280% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "metalShimmer 7s ease-in-out infinite",
      }}
    >
      {children}
    </p>
  );
}
