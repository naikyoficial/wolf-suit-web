import { Hero }        from "@/components/sections/Hero";
import { Duality }     from "@/components/sections/Duality";
import { Philosophy }  from "@/components/sections/Philosophy";
import { Pillars }     from "@/components/sections/Pillars";
import { Process }     from "@/components/sections/Process";
import { Services }    from "@/components/sections/Services";
import { Apply }       from "@/components/sections/Apply";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Duality />
      <Philosophy />
      <Pillars />
      <Process />
      <Services />
      <Apply />
    </main>
  );
}
