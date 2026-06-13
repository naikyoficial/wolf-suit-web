import { SITE } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        padding: "52px 8vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(178,192,204,.07)",
        zIndex: 10,
      }}
    >
      <span
        className="font-display"
        style={{ fontSize: 15, letterSpacing: ".28em", color: "rgba(178,192,204,.55)" }}
      >
        {SITE.name.toUpperCase()}
      </span>
      <p style={{ fontSize: 11, color: "var(--color-text-4)", letterSpacing: ".1em" }}>
        &copy; {year} {SITE.name} &middot; Todos los derechos reservados
      </p>
    </footer>
  );
}
