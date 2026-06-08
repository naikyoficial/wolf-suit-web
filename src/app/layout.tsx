import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    default: "Wolf Suit — Experiencias Digitales de Alto Nivel",
    template: "%s — Wolf Suit",
  },
  description:
    "Firma estratégica especializada en construir percepción de valor para empresas ambiciosas.",
  keywords: [
    "experiencias digitales",
    "diseño web premium",
    "estrategia digital",
    "branding",
    "percepción de valor",
  ],
  authors: [{ name: "Wolf Suit" }],
  creator: "Wolf Suit",
  openGraph: {
    type: "website",
    locale: "es_419",
    url: "https://wolfsuit.com",
    siteName: "Wolf Suit",
    title: "Wolf Suit — Experiencias Digitales de Alto Nivel",
    description:
      "Firma estratégica especializada en construir percepción de valor para empresas ambiciosas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolf Suit — Experiencias Digitales de Alto Nivel",
    description:
      "Firma estratégica especializada en construir percepción de valor para empresas ambiciosas.",
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
        <Navbar />
        <div className="flex-1 pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
