import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Suitwolf — Diseño y desarrollo web premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph / Twitter (1200×630) — replica la estética del hero:
 * fondo de mármol real, Instrument Serif, headline partido con
 * acento dorado italic en "y eleva tu negocio."
 *
 * Los assets (fonts + background JPG) se bundlean vía
 * `new URL(..., import.meta.url)` — no depende de fetches externos en
 * runtime. Satori (motor de next/og) todavía no digiere WebP, por eso
 * el background es JPG.
 */
export default async function OpengraphImage() {
  const [serifRegular, serifItalic, monoMedium, bgBuf] = await Promise.all([
    fetch(new URL("./_og-assets/InstrumentSerif-Regular.ttf", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./_og-assets/InstrumentSerif-Italic.ttf", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./_og-assets/JetBrainsMono-Medium.ttf", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./_og-assets/bg.jpg", import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  // JPG → data URL (edge runtime tiene btoa pero no Buffer).
  const bytes = new Uint8Array(bgBuf);
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]!);
  const bgUrl = `data:image/jpeg;base64,${btoa(bin)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(180deg, #12100a 0%, #0a0806 60%, #060504 100%)",
        }}
      >
        {/* Fondo de mármol oscuro (mismo que el hero) */}
        <img
          src={bgUrl}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
          }}
        />

        {/* Overlay para legibilidad */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(6,5,4,.35) 0%, rgba(6,5,4,.55) 55%, rgba(6,5,4,.88) 100%)",
          }}
        />

        {/* Contenido principal */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "56px 72px 64px 72px",
          }}
        >
          {/* Top row — wordmark + tag */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                color: "#D9B36A",
                letterSpacing: 9,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              SUITWOLF
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 28,
                  height: 1,
                  background: "rgba(217,179,106,0.55)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: 13,
                  color: "rgba(217,179,106,0.75)",
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                Agencia de Diseño Web Premium
              </div>
            </div>
          </div>

          {/* Headline centrado */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 96,
                color: "#F5F2EC",
                lineHeight: 1.04,
                letterSpacing: -3,
              }}
            >
              Diseño web que convierte
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 96,
                fontStyle: "italic",
                color: "#D9B36A",
                lineHeight: 1.04,
                letterSpacing: -3,
                marginTop: -4,
              }}
            >
              y eleva tu negocio.
            </div>
          </div>

          {/* Bottom — subhead + url */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              gap: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 26,
                lineHeight: 1.35,
                color: "rgba(245,242,236,0.72)",
                maxWidth: 720,
              }}
            >
              Sitios web a medida que transforman visitantes en clientes.
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 16,
                color: "#D9B36A",
                letterSpacing: 5,
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              suitwolf.com →
            </div>
          </div>
        </div>

        {/* Regla dorada inferior */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background:
              "linear-gradient(90deg, #B98A3E 0%, #D9B36A 30%, #F1DCA4 50%, #D9B36A 70%, #B98A3E 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serifRegular, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
        { name: "JetBrains Mono", data: monoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
