import type { ReactNode } from "react";

interface Props {
  type?: "stat" | "insight" | "tip" | "warning";
  children: ReactNode;
}

const STYLES: Record<string, { border: string; bg: string; label: string; labelColor: string; icon: string }> = {
  stat: {
    border: "rgba(212,160,32,.28)",
    bg: "rgba(212,160,32,.04)",
    label: "Dato clave",
    labelColor: "rgba(212,160,32,.7)",
    icon: "◆",
  },
  insight: {
    border: "rgba(168,108,5,.35)",
    bg: "rgba(168,108,5,.05)",
    label: "Insight",
    labelColor: "rgba(212,160,32,.65)",
    icon: "◈",
  },
  tip: {
    border: "rgba(100,160,100,.25)",
    bg: "rgba(100,160,100,.04)",
    label: "Recomendación",
    labelColor: "rgba(120,180,120,.7)",
    icon: "▸",
  },
  warning: {
    border: "rgba(200,80,60,.22)",
    bg: "rgba(200,80,60,.04)",
    label: "Atención",
    labelColor: "rgba(200,100,80,.7)",
    icon: "⚠",
  },
};

export function ArticleCallout({ type = "insight", children }: Props) {
  const s = STYLES[type] ?? STYLES["insight"]!;

  return (
    <aside style={{
      margin: "clamp(32px,4vh,48px) 0",
      padding: "clamp(20px,3vw,32px) clamp(24px,3.5vw,40px)",
      borderLeft: `3px solid ${s.border}`,
      background: s.bg,
      position: "relative",
    }}>
      <span style={{
        display: "block",
        fontSize: 9,
        letterSpacing: ".36em",
        textTransform: "uppercase",
        color: s.labelColor,
        marginBottom: 10,
      }}>
        {s.icon}&nbsp;&nbsp;{s.label}
      </span>
      <div style={{
        fontSize: "clamp(15px,1.1vw,17px)",
        color: "rgba(220,215,205,.82)",
        lineHeight: 1.85,
        margin: 0,
        fontStyle: "italic",
      }}>
        {children}
      </div>
    </aside>
  );
}
