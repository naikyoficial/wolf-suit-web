"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      aria-hidden
      className="fixed right-0 top-0 pointer-events-none"
      style={{ width: 1, height: "100vh", zIndex: 9993, background: "rgba(201,164,90,.08)" }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          scaleY,
          originY: 0,
          background: "linear-gradient(to bottom, var(--color-gold), rgba(201,164,90,.2))",
        }}
      />
    </div>
  );
}
