import { Plus } from "@/components/icons";
import { SectionLabel } from "@/components/ui";
import { faqs } from "@/lib/content";
import { business } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-sand-50 section-y">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="05" className="text-clay">
              Good to know
            </SectionLabel>
            <h2 id="faq-title" data-reveal className="mt-6 text-display font-semibold">
              Straight answers.
            </h2>
            <p className="mt-8 text-navy/70">Something else on your mind? We’re a call away.</p>
            <a
              href={business.phone.href}
              className="mt-3 inline-block text-2xl font-semibold tracking-[-0.02em] tabular-nums underline decoration-navy/20 underline-offset-[6px] transition-colors hover:decoration-gold"
            >
              {business.phone.display}
            </a>
          </div>
        </div>

        <div className="border-t border-navy/12 lg:col-span-7 lg:col-start-6">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-navy/12">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg font-semibold tracking-[-0.015em] transition-colors hover:text-navy-600 sm:py-7 sm:text-xl">
                {item.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-navy/15 text-base transition-[transform,background-color,color] duration-500 ease-(--ease-out-expo) group-open:rotate-45 group-open:border-navy group-open:bg-navy group-open:text-white"
                >
                  <Plus />
                </span>
              </summary>
              <p className="max-w-[60ch] pr-12 pb-7 leading-relaxed text-navy/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
