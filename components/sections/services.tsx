import type { CSSProperties } from "react";
import { ArrowUpRight, Phone } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { SectionLabel } from "@/components/ui";
import { services } from "@/lib/content";
import { business } from "@/lib/site";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" data-theme="dark" className="bg-navy section-y text-white">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01" className="text-mist">
              Services
            </SectionLabel>
            <h2 id="services-title" data-reveal className="mt-6 text-display font-semibold">
              Comfort has a few <span className="text-mist">moving parts.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-[38ch] text-lede text-white/70 lg:col-span-4 lg:col-start-9">
            From a system that needs attention today to a home ready for an upgrade. Homes, condos, and light commercial
            spaces.
          </p>
        </div>

        <ol className="mt-16 border-t border-white/15 lg:mt-24">
          {services.map((service, i) => (
            <li key={service.id} data-reveal style={{ "--delay": `${i * 60}ms` } as CSSProperties}>
              <article className="group relative grid gap-x-8 gap-y-5 border-b border-white/15 py-9 md:grid-cols-12 md:py-12">
                <p className="mono-label text-mist tabular-nums md:col-span-1 md:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="text-title font-semibold transition-transform duration-500 ease-(--ease-out-expo) md:col-span-4 lg:group-hover:translate-x-2">
                  {service.name}
                </h3>

                <div className="md:col-span-5">
                  <p className="text-lg font-medium tracking-[-0.015em] text-white">{service.title}</p>
                  <p className="mt-3 leading-relaxed text-white/65">{service.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.name} includes`}>
                    {service.scope.map((item) => (
                      <li key={item} className="rounded-full border border-white/18 px-3 py-1 text-sm text-white/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 md:flex md:justify-end">
                  <RequestButton
                    service={service.request}
                    className="inline-flex items-center gap-3 text-sm font-semibold after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-8"
                  >
                    <span className="md:sr-only">Ask about {service.name.toLowerCase()}</span>
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-full border border-white/25 text-xl transition-[background-color,border-color,color,transform] duration-500 ease-(--ease-out-expo) group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-navy"
                    >
                      <ArrowUpRight />
                    </span>
                  </RequestButton>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>Not sure which applies?</p>
          <a
            href={business.phone.href}
            className="inline-flex items-center gap-3 font-semibold text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-gold"
          >
            <Phone className="text-lg text-gold" /> Talk it through: {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
