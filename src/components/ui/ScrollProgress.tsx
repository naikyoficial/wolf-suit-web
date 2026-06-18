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
      {/* Track background */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(212,160,32,.06)" }} />

      {/* Top cap */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 5, height: 1,
        background: "rgba(212,160,32,.3)",
      }} />

      {/* Bottom cap */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 5, height: 1,
        background: "rgba(212,160,32,.12)",
      }} />

      {/* Fill — gold gradient from top */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          scaleY, originY: 0,
          background: "linear-gradient(to bottom, #A87214 0%, #D4A020 45%, #F0C840 75%, rgba(212,160,32,.3) 100%)",
        }}
      />

      {/* Glowing tip */}
      <motion.div
        style={{
          position: "absolute", left: "50%", top: tipTop,
          opacity: tipOpacity,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer halo */}
        <div style={{
          position: "absolute", inset: -10, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,160,32,.3) 0%, rgba(212,160,32,.08) 55%, transparent 75%)",
          animation: "breathe 2.2s ease-in-out infinite",
        }} />
        {/* Core dot */}
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "#F0C840",
          boxShadow:
            "0 0 5px rgba(212,160,32,1)," +
            "0 0 12px rgba(212,160,32,.8)," +
            "0 0 24px rgba(212,160,32,.5)," +
            "0 0 40px rgba(212,160,32,.2)",
        }} />
      </motion.div>
    </div>
  );
}
