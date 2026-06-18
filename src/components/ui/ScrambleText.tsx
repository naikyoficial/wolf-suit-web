"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·—";

function resolve(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      const charProgress = Math.max(0, progress * target.length - i);
      if (charProgress >= 1) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)]!;
    })
    .join("");
}

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrambleText({ text, delay = 0, duration = 1400, className, style }: Props) {
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(() => text.replace(/[^ ]/g, "·"));

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (now: number) => {
      if (!startTime) startTime = now + delay * 1000;
      const elapsed  = Math.max(0, now - startTime);
      const progress = Math.min(1, elapsed / duration);
      setDisplay(resolve(text, progress));
      if (progress < 1) rafId = requestAnimationFrame(animate);
      else setDisplay(text);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, text, delay, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
