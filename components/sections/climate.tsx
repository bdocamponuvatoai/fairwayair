import { SectionLabel } from "@/components/ui";
import { ClimateReadout } from "./climate-readout";

export function Climate() {
  return (
    <section aria-labelledby="climate-title" className="overflow-hidden bg-sand-100 section-y">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <SectionLabel index="02" className="text-clay">
            The valley
          </SectionLabel>
          <h2 id="climate-title" data-reveal className="mt-6 text-display font-semibold">
            Thirty-five degrees of difference.
          </h2>
          <div data-reveal className="mt-8 max-w-[40ch] space-y-5 text-lede text-navy/70">
            <p>
              Coachella Valley summers ask more of an air conditioner than almost anywhere in the country. Systems run
              long, hot days back to back, and small problems show up fast.
            </p>
            <p>That gap between the patio and the living room is the whole job. We take it seriously.</p>
          </div>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <ClimateReadout />
        </div>
      </div>
    </section>
  );
}
