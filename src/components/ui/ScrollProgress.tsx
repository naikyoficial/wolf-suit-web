"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY     = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const tipTop     = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const tipOpacity = useTransform(scrollYProgress, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div
      aria-hidden
      className="fixed right-0 top-0 pointer-events-none"
      style={{ width: 2, height: "100vh", zIndex: 9993, background: "transparent" }}
    >
      {/* Top cap */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 5,
          height: 1,
          background: "rgba(178,192,204,.35)",
        }}
      />

      {/* Bottom cap */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 5,
          height: 1,
          background: "rgba(178,192,204,.15)",
        }}
      />

      {/* Fill — gold gradient from top */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scaleY,
          originY: 0,
          background:
            "linear-gradient(to bottom, #C4CED8 0%, #B2C0CC 55%, rgba(178,192,204,.22) 100%)",
        }}
      />

      {/* Glowing tip — travels with scroll */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: tipTop,
          opacity: tipOpacity,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer halo — breathes */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(178,192,204,.25) 0%, rgba(178,192,204,.06) 55%, transparent 75%)",
            animation: "breathe 2.2s ease-in-out infinite",
          }}
        />
        {/* Core dot */}
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#E4EAEF",
            boxShadow:
              "0 0 5px rgba(178,192,204,1)," +
              "0 0 12px rgba(178,192,204,.8)," +
              "0 0 24px rgba(178,192,204,.4)," +
              "0 0 40px rgba(178,192,204,.15)",
          }}
        />
      </motion.div>
    </div>
  );
}
