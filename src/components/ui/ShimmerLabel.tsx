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
          "linear-gradient(90deg, #7A8E9E 0%, #9BB5C4 25%, #C8DCE8 44%, #EDF5FA 52%, #C8DCE8 60%, #9BB5C4 75%, #7A8E9E 100%)",
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
