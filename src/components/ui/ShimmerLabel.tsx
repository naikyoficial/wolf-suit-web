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
          "linear-gradient(90deg, #7A5210 0%, #C8920C 22%, #E8B820 28%, #C8920C 38%, #7A5210 50%, #C8920C 62%, #E8B820 72%, #C8920C 78%, #7A5210 100%)",
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
