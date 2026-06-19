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
        // Brighter, always-legible gold: the floor is #C8920C (clear gold on
        // black, not the old dark-brown #7A5210) and the center is the brightest
        // peak. This matters especially on mobile where the shimmer is frozen at
        // background-position:50% — with the old gradient that landed on the dark
        // brown center and the label looked washed out / barely visible.
        background:
          "linear-gradient(90deg, #C8920C 0%, #E8B820 25%, #F5D873 50%, #E8B820 75%, #C8920C 100%)",
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
