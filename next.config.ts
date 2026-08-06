import type { NextConfig } from "next";

// Link a WhatsApp con mensaje prellenado — hardcoded para que redirects() no
// necesite importar de src/. Cambiar acá y en src/config/site.ts si migrás
// a otro número.
const WHATSAPP_REDIRECT = `https://wa.me/5493435343861?text=${encodeURIComponent(
  "Hola! Me interesa coordinar una reunión con Suitwolf."
)}`;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      // /evaluacion (formulario viejo) y /aplicar → WhatsApp directo.
      // 301 para preservar SEO acumulado de la ruta.
      { source: "/evaluacion", destination: WHATSAPP_REDIRECT, permanent: true },
      { source: "/aplicar",    destination: WHATSAPP_REDIRECT, permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
