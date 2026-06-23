"use client";

const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function CraftedBy() {
  return (
    <>
      <style>{`
        @keyframes swGoldShimmer {
          0%   { background-position: 200% center }
          100% { background-position: -200% center }
        }
      `}</style>
      <a
        href="https://suitwolf.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          fontSize: 10,
          letterSpacing: ".32em",
          textTransform: "uppercase",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        <span style={{ color: "rgba(180,175,165,.35)" }}>
          Desarrollo Web —&nbsp;
        </span>
        <span
          style={{
            background: GOLD,
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "swGoldShimmer 6s linear infinite",
          }}
        >
          SuitWolf
        </span>
      </a>
    </>
  );
}
