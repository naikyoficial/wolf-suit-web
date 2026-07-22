import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono, Libre_Caslon_Display } from "next/font/google";
import { Navbar }         from "@/components/layout/Navbar";
import { Footer }         from "@/components/layout/Footer";
import { SmoothScroll }   from "@/components/layout/SmoothScroll";
import { Grain }          from "@/components/ui/Grain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AtmosphericBg }  from "@/components/sections/AtmosphericBg";
import { Analytics }      from "@/components/analytics/Analytics";
import { rootGraph }      from "@/config/seo";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--ws-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--ws-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  variable: "--ws-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const libreCaslon = Libre_Caslon_Display({
  variable: "--ws-libre-caslon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://suitwolf.com"),
  title: {
    default: "Suitwolf — Diseño y Desarrollo Web Premium para Empresas",
    template: "%s — Suitwolf",
  },
  description:
    "Agencia de diseño y desarrollo web premium. Sitios web a medida, sin plantillas, que convierten visitantes en clientes: diseño corporativo, e-commerce, landing pages y aplicaciones web para empresas exigentes.",
  authors: [{ name: "Suitwolf" }],
  creator: "Suitwolf",
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "es_419",
    url: "https://suitwolf.com",
    siteName: "Suitwolf",
    title: "Suitwolf — Diseño y Desarrollo Web Premium para Empresas",
    description:
      "Transformamos la presencia digital en una ventaja competitiva real. Diseño exclusivo, rendimiento técnico de primer nivel y estrategia desde el día uno. Todo construido desde cero.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suitwolf — Diseño y Desarrollo Web Premium",
    description:
      "Sitios web a medida para empresas que exigen alto nivel. Diseño exclusivo, performance 90+ y resultados medibles. Sin templates, sin compromisos.",
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
  // NOTE: no site-wide `alternates.canonical` here — in the App Router a
  // canonical set on the root layout is inherited by every child page that
  // doesn't override it, which would point /evaluacion, /mockup, etc. at the
  // homepage. Each route declares its own canonical instead.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable} ${libreCaslon.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-surface text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootGraph()) }}
        />
        <Analytics />
        <AtmosphericBg />
        <Grain />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <div className="flex-1 pt-[72px]">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
