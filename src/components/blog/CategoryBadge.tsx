const GOLD = "linear-gradient(90deg, #5A3C0A 0%, #A87214 22%, #D4A020 46%, #F0C840 52%, #D4A020 58%, #A87214 78%, #5A3C0A 100%)";

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 8,
      letterSpacing: ".38em",
      textTransform: "uppercase",
      padding: "5px 14px",
      border: "1px solid rgba(212,160,32,.28)",
      background: GOLD,
      backgroundSize: "260% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: "metalShimmer 10s ease-in-out infinite",
    }}>
      {label}
    </span>
  );
}
