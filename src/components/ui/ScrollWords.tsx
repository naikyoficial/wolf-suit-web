"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { CSSProperties, ElementType } from "react";

/* Palabras que se "encienden" a medida que el usuario scrollea —
   el clásico efecto editorial de manifiesto. Las palabras envueltas
   en *asteriscos* se renderizan en itálica dorada. */

const GOLD = "linear-gradient(95deg, #B8820A 0%, #D4A020 30%, #F0CC50 50%, #D4A020 70%, #B8820A 100%)";

function Word({
  word,
  gold,
  progress,
  range,
}: {
  word: string;
  gold: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block", marginRight: "0.28em" }}>
      <motion.span
        style={{
          opacity,
          display: "inline-block",
          ...(gold
            ? {
                fontStyle: "italic",
                background: GOLD,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : {}),
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function ScrollWords({
  children,
  as: Tag = "p",
  className,
  style,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  // Separa el texto en palabras y detecta los tramos *dorados*
  const tokens: { word: string; gold: boolean }[] = [];
  let inGold = false;
  for (const raw of children.split(/\s+/)) {
    let word = raw;
    let gold = inGold;
    if (word.startsWith("*")) {
      gold = true;
      inGold = true;
      word = word.slice(1);
    }
    if (word.endsWith("*")) {
      inGold = false;
      word = word.slice(0, -1);
    } else if (word.includes("*")) {
      word = word.replaceAll("*", "");
    }
    if (word) tokens.push({ word, gold });
  }

  const n = tokens.length;

  return (
    <Tag ref={ref} className={className} style={style}>
      {tokens.map((t, i) => (
        <Word
          key={i}
          word={t.word}
          gold={t.gold}
          progress={scrollYProgress}
          range={[(i / n) * 0.88, (i / n) * 0.88 + 0.12]}
        />
      ))}
    </Tag>
  );
}
