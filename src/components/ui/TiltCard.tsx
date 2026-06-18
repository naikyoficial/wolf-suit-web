"use client";

import { useRef, type CSSProperties, type MouseEventHandler } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

export function TiltCard({
  children,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const glow  = useMotionValue(0);

  const cfg   = { stiffness: 220, damping: 26 };
  const rotY  = useSpring(useTransform(rawX, [-0.5, 0.5], [-8,  8]),  cfg);
  const rotX  = useSpring(useTransform(rawY, [-0.5, 0.5], [ 6, -6]),  cfg);
  const specOpacity = useSpring(glow, { stiffness: 130, damping: 22 });

  const specX  = useTransform(rawX, [-0.5, 0.5], [15, 85]);
  const specY  = useTransform(rawY, [-0.5, 0.5], [15, 85]);
  const specBg = useMotionTemplate`radial-gradient(circle at ${specX}% ${specY}%, rgba(200,228,248,0.16) 0%, transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left)  / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)   / rect.height - 0.5);
    glow.set(1);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rawX.set(0);
    rawY.set(0);
    glow.set(0);
    onMouseLeave?.(e);
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 900,
        willChange: "transform",
        position: "relative",
      }}
      className={className}
    >
      {/* specular highlight overlay */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
          background: specBg,
          opacity: specOpacity,
        }}
      />
      {children}
    </motion.div>
  );
}
