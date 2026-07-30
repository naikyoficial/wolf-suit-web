"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ background: "#0D0D0D", color: "#F7F5F0", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0, padding: "2rem" }}>
        <p style={{ color: "#D4A020", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Error de aplicación</p>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Algo salió mal</h1>
        <pre style={{ background: "#141414", padding: "1rem", borderRadius: "8px", fontSize: "0.8rem", color: "#ABA8A2", maxWidth: "600px", overflow: "auto", marginBottom: "1.5rem" }}>
          {error.message || "Error desconocido"}
          {error.digest ? `\nDigest: ${error.digest}` : ""}
        </pre>
        <button
          onClick={reset}
          style={{ background: "#D4A020", color: "#0D0D0D", border: "none", padding: "0.75rem 2rem", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}>
          Reintentar
        </button>
      </body>
    </html>
  );
}
