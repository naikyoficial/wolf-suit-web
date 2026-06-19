"use client";

import { motion, type MotionProps } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";

const EASE        = [0.16, 1.0, 0.3, 1.0] as const;
const EASE_MOBILE = [0.25, 0.46, 0.45, 0.94] as const;

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
  scale: _scale,
  className,
  style,
  ...rest
}: RevealProps) {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.38, delay: delay * 0.4, ease: EASE_MOBILE }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
