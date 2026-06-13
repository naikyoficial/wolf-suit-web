import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar }         from "@/components/layout/Navbar";
import { Footer }         from "@/components/layout/Footer";
import { SmoothScroll }   from "@/components/layout/SmoothScroll";
import { Preloader }      from "@/components/ui/Preloader";
import { Cursor }         from "@/components/ui/Cursor";
import { Grain }          from "@/components/ui/Grain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AtmosphericBg }  from "@/components/sections/AtmosphericBg";
import { AuroraCanvas }   from "@/components/ui/AuroraCanvas";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--ws-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--ws-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  title: {
    default: "Suitwolf — Diseño Web Premium y Estrategia de Percepción",
    template: "%s — Suitwolf",
  },
  description:
    "Suitwolf es una firma de diseño estratégico que construye identidades digitales premium para empresas ambiciosas. Sin templates. Todo desde cero. Diseño web, branding y estrategia de percepción.",
  keywords: [
    "diseño web premium",
    "agencia de diseño sin templates",
    "branding premium",
    "identidad de marca a medida",
    "diseño web personalizado",
    "estrategia de percepción",
    "agencia digital elite",
    "experiencias digitales de alto nivel",
    "diseño web desde cero",
    "agencia de branding",
    "percepción de valor empresas",
    "diseño web profesional",
  ],
  authors: [{ name: "Suitwolf" }],
  creator: "Suitwolf",
  openGraph: {
    type: "website",
    locale: "es_419",
    url: "https://wolfsuit.com",
    siteName: "Suitwolf",
    title: "Suitwolf — Diseño Web Premium y Estrategia de Percepción",
    description:
      "Sin templates. Sin atajos. Identidades digitales construidas desde cero para empresas que quieren verse en la categoría donde pertenecen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suitwolf — Diseño Web Premium y Estrategia de Percepción",
    description:
      "Sin templates. Sin atajos. Identidades digitales construidas desde cero para empresas que quieren verse en la categoría donde pertenecen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://wolfsuit.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-surface text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Suitwolf",
              url: "https://wolfsuit.com",
              description:
                "Firma de diseño estratégico especializada en identidades digitales premium para empresas ambiciosas. Sin templates — todo construido desde cero.",
              knowsAbout: [
                "Diseño web premium",
                "Branding a medida",
                "Estrategia de percepción",
                "Identidad visual",
                "Desarrollo web de alto estándar",
              ],
              serviceType: [
                "Diseño de identidad corporativa",
                "Desarrollo web personalizado",
                "Estrategia de marca",
                "Branding premium",
              ],
            }),
          }}
        />
        <AtmosphericBg />
        <AuroraCanvas />
        <Preloader />
        <Cursor />
        <Grain />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
