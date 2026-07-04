"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* Envoltorio magnético — el contenido se inclina suavemente hacia el cursor
   y vuelve con un spring al salir. Desactivado en táctil / reduced-motion. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
  style,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.3 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [strength, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ ...style, x: sx, y: sy, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
