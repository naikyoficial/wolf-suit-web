"use client";

export function AtmosphericBg() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,160,32,.08) 0%, transparent 65%), linear-gradient(180deg, #060606 0%, #040404 60%, #060606 100%)",
      }}
    />
  );
}
