import { AtmosphericBg } from "@/components/sections/AtmosphericBg";
import { Hero }          from "@/components/sections/Hero";
import { Duality }       from "@/components/sections/Duality";
import { Philosophy }    from "@/components/sections/Philosophy";
import { Pillars }       from "@/components/sections/Pillars";
import { Process }       from "@/components/sections/Process";
import { Work }          from "@/components/sections/Work";
import { Contact }       from "@/components/sections/Contact";

function Divider() {
  return (
    <div
      aria-hidden
      style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,164,90,.2), transparent)",
        margin: "0 8vw",
        position: "relative",
        zIndex: 10,
      }}
    />
  );
}

export default function HomePage() {
  return (
    <main className="relative">
      <AtmosphericBg />
      <Hero />
      <Divider />
      <Duality />
      <Divider />
      <Philosophy />
      <Divider />
      <Pillars />
      <Divider />
      <Process />
      <Divider />
      <Work />
      <Divider />
      <Contact />
    </main>
  );
}
