"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppLink, WhatsAppIcon } from "./WhatsAppLink";

// Rutas administrativas o de utilidad donde el botón no aporta y solo
// distrae. Coincide con las rutas donde ocultamos el navbar público.
const HIDDEN_ROUTES = [
  "/propuesta", "/login", "/crm", "/proyectos", "/cotizador",
];

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Aparece después del primer scroll significativo (~400px). Así no
    // pisa el hero en la primera impresión, pero acompaña todo el
    // recorrido a partir del segundo pliegue.
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(217,179,106,.55), 0 10px 28px -6px rgba(0,0,0,.6); }
          70%  { box-shadow: 0 0 0 16px rgba(217,179,106,0),   0 10px 28px -6px rgba(0,0,0,.6); }
          100% { box-shadow: 0 0 0 0 rgba(217,179,106,0),      0 10px 28px -6px rgba(0,0,0,.6); }
        }
        .wa-fab {
          animation: wa-pulse 2.6s ease-out infinite;
        }
        .wa-fab:hover {
          animation: none;
          transform: translateY(-2px) scale(1.05) !important;
          box-shadow: 0 14px 32px -6px rgba(0,0,0,.7), 0 0 0 1px rgba(217,179,106,.5) !important;
        }
      `}</style>

      <WhatsAppLink
        ariaLabel="Escribime por WhatsApp"
        className="wa-fab"
        dataCursorHover
        style={{
          position: "fixed",
          right: "clamp(16px, 2.4vw, 28px)",
          bottom: "calc(clamp(16px, 3vh, 28px) + env(safe-area-inset-bottom, 0px))",
          zIndex: 180,
          width: "clamp(52px, 5vw, 60px)",
          height: "clamp(52px, 5vw, 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #B98A3E 0%, #D9B36A 40%, #F1DCA4 55%, #D9B36A 75%, #B98A3E 100%)",
          color: "#0A0A0A",
          textDecoration: "none",
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.85)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition:
            "transform .5s cubic-bezier(.16,1,.3,1), opacity .5s ease, box-shadow .3s ease",
        }}
      >
        <WhatsAppIcon size={26} />
      </WhatsAppLink>
    </>
  );
}
