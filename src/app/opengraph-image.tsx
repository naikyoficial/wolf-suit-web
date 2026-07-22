import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Suitwolf — Diseño y desarrollo web premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen Open Graph / Twitter generada al vuelo (1200×630).
 * Next la inyecta automáticamente como og:image y twitter:image en todo el sitio.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 90% at 50% 32%, #1a140a 0%, #0b0a08 60%, #060504 100%)",
          color: "#F5F2EC",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 18,
            color: "#D9B36A",
            marginBottom: 34,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Suitwolf
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1.05,
            textAlign: "center",
            maxWidth: 960,
            fontWeight: 500,
            letterSpacing: -2,
          }}
        >
          Diseño web que convierte
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1.05,
            marginTop: 4,
            color: "#D9B36A",
            fontWeight: 500,
            letterSpacing: -2,
          }}
        >
          y eleva tu negocio
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 27,
            color: "rgba(245,242,236,0.62)",
            fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          Sitios web a medida, sin plantillas · suitwolf.com
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(90deg, #B98A3E 0%, #F1DCA4 50%, #B98A3E 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
