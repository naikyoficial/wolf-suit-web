import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Aplicar",
  description:
    "Iniciá el proceso de selección para trabajar con Wolf Suit. Diseño web personalizado, branding a medida y estrategia de percepción para empresas ambiciosas.",
};

export default function AplicarPage() {
  return (
    <main className="relative">
      <Contact />
    </main>
  );
}
