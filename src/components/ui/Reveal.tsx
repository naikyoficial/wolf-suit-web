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
  y = 40,
  blur: _blur,
  scale = 1,
  className,
  style,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
