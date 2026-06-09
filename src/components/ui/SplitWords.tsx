"use client";

import { motion } from "framer-motion";
import type { ElementType, CSSProperties } from "react";

const EASE = [0.16, 1.0, 0.3, 1.0] as const;

interface SplitWordsProps {
  children: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
}

export function SplitWords({
  children,
  as: Tag = "span",
  delay = 0,
  stagger = 0.065,
  className,
  style,
}: SplitWordsProps) {
  const words = children.split(" ");

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            /* padding/margin trick prevents descender clipping */
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
            marginRight: "0.3em",
          }}
        >
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
