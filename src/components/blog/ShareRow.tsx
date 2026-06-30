"use client";

import { useState } from "react";

const GOLD = "rgba(212,160,32,";

function IconLink({ label, href, onClick, children }: {
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const style: React.CSSProperties = {
    width: 38, height: 38,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: `1px solid ${GOLD}${hov ? ".4)" : ".15)"}`,
    color: hov ? "rgba(212,160,32,.95)" : "rgba(200,195,185,.55)",
    background: hov ? "rgba(212,160,32,.06)" : "transparent",
    transition: "border-color .3s, color .3s, background .3s",
    cursor: "pointer",
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
      {children}
    </button>
  );
}

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  function copy() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
      marginTop: "clamp(40px,6vh,64px)",
      paddingTop: "clamp(28px,4vh,40px)",
      borderTop: "1px solid rgba(212,160,32,.1)",
    }}>
      <span style={{
        fontSize: 9, letterSpacing: ".34em", textTransform: "uppercase",
        color: "rgba(180,174,164,.4)",
      }}>
        {copied ? "Enlace copiado" : "Compartí este artículo"}
      </span>
      <div style={{ display: "flex", gap: 10 }}>
        <IconLink label="Compartir en LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z"/></svg>
        </IconLink>
        <IconLink label="Compartir en X" href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.6h3.5l-7.6 8.7 8.9 11.8h-7l-5.5-7.2-6.3 7.2H1.4l8.1-9.3L1 1.6h7.2l4.9 6.5zm-1.2 18.2h1.9L6.9 3.6H4.8z"/></svg>
        </IconLink>
        <IconLink label="Compartir en Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300000c-1.2 0-1.6.75-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0022 12z"/></svg>
        </IconLink>
        <IconLink label="Copiar enlace" onClick={copy}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.5-1.5"/></svg>
        </IconLink>
      </div>
    </div>
  );
}
