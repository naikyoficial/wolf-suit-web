import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Proceso de Selección",
  description:
    "Iniciá el proceso de evaluación estratégica para trabajar con SuitWolf. Cada proyecto comienza con una evaluación para determinar si existe una oportunidad real de generar impacto.",
};

export default function EvaluacionPage() {
  return (
    <main className="relative">
      <Contact />
    </main>
  );
}
