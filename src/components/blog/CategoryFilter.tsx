"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "todos",             label: "Todos",             icon: "⊞" },
  { id: "Estrategia Digital", label: "Estrategia Digital", icon: "◈" },
  { id: "Diseño Web",        label: "Diseño Web",        icon: "▣" },
  { id: "Branding",          label: "Branding",          icon: "◇" },
  { id: "Desarrollo",        label: "Desarrollo",        icon: "⌥" },
  { id: "Marketing",         label: "Marketing",         icon: "◎" },
  { id: "Inversión Digital", label: "Inversión Digital", icon: "◈" },
  { id: "SEO",               label: "SEO",               icon: "◉" },
];

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  const [hov, setHov] = useState<string | null>(null);

  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,.06)",
      borderBottom: "1px solid rgba(255,255,255,.06)",
      background: "rgba(6,5,4,.95)",
      overflowX: "auto",
      scrollbarWidth: "none",
    }}>
      <div style={{
        display: "flex",
        minWidth: "max-content",
        padding: "0 clamp(1.5rem,8vw,7.5rem)",
      }}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          const isHov = hov === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              onMouseEnter={() => setHov(cat.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "18px 20px",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${isActive ? "rgba(212,160,32,.8)" : "transparent"}`,
                cursor: "pointer",
                transition: "border-color .3s",
                whiteSpace: "nowrap",
                marginBottom: -1,
              }}
            >
              <span style={{
                fontSize: 11,
                color: isActive
                  ? "rgba(212,160,32,.7)"
                  : isHov
                  ? "rgba(212,160,32,.4)"
                  : "rgba(160,155,145,.35)",
                transition: "color .3s",
                lineHeight: 1,
              }}>
                {cat.icon}
              </span>
              <span style={{
                fontSize: 9,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: isActive
                  ? "rgba(240,235,225,.85)"
                  : isHov
                  ? "rgba(240,235,225,.55)"
                  : "rgba(160,155,145,.5)",
                transition: "color .3s",
              }}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
