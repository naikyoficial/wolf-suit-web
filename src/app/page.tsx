import { Hero }        from "@/components/sections/Hero";
import { Duality }     from "@/components/sections/Duality";
import { Philosophy }  from "@/components/sections/Philosophy";
import { Services }    from "@/components/sections/Services";
import { WolfSystem }  from "@/components/sections/WolfSystem";
import { Apply }       from "@/components/sections/Apply";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Duality />
      <Philosophy />
      <Services />
      <WolfSystem />
      <Apply />
    </main>
  );
}
