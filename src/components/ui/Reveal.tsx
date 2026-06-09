"use client";

import { motion, type MotionProps } from "framer-motion";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

interface RevealProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  y = 56,
  blur = 10,
  scale = 0.97,
  className,
  style,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
