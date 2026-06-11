import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Aplicar",
  description: "Iniciá el proceso de selección para trabajar con Wolf Suit.",
};

export default function AplicarPage() {
  return (
    <main className="relative">
      <Contact />
    </main>
  );
}
