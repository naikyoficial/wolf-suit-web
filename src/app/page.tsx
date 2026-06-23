import { Hero }        from "@/components/sections/Hero";
import { Philosophy }  from "@/components/sections/Philosophy";
import { Duality }     from "@/components/sections/Duality";
import { Services }    from "@/components/sections/Services";
import { WolfSystem }  from "@/components/sections/WolfSystem";
import { Apply }       from "@/components/sections/Apply";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Philosophy />
      <Duality />
      <Services />
      <WolfSystem />
      <Apply />
    </main>
  );
}
