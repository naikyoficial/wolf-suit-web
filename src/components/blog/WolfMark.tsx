export function WolfMark({ size = 28, opacity = 0.85 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="rgba(212,160,32,0.85)"
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      style={{ opacity }}
    >
      {/* Stylized geometric wolf head */}
      <path d="M12 10 L22 24 L18 40 L32 54 L46 40 L42 24 L52 10 L44 22 L36 18 L32 22 L28 18 L20 22 Z" />
      <path d="M26 30 L29 33 M38 30 L35 33" />
      <path d="M32 38 L32 44" />
    </svg>
  );
}
