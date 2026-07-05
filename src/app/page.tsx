import type { Metadata } from "next";
import { Hero }        from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Manifesto }   from "@/components/sections/Manifesto";
import { Duality }     from "@/components/sections/Duality";
import { Services }    from "@/components/sections/Services";
import { Method }      from "@/components/sections/Method";
import { Standards }   from "@/components/sections/Standards";
import { Faq }         from "@/components/sections/Faq";
import { Apply }       from "@/components/sections/Apply";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <MarqueeBand />
      <Manifesto />
      <Duality />
      <Services />
      <Standards />
      <Method />
      <Faq />
      <Apply />
    </main>
  );
}
