import { Approach } from "@/components/sections/approach";
import { Climate } from "@/components/sections/climate";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Commercial } from "@/components/sections/commercial";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { ServiceArea } from "@/components/sections/service-area";
import { Services } from "@/components/sections/services";
import { Triage } from "@/components/sections/triage";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Triage />
      <Services />
      <Climate />
      <Approach />
      <Commercial />
      <ServiceArea />
      <Faq />
      <ClosingCta />
    </>
  );
}
