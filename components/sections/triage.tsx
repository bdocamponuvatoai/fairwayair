import { ArrowUpRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { triage } from "@/lib/content";

export function Triage() {
  return (
    <section aria-labelledby="triage-title" className="border-b border-navy/10 bg-sand-50">
      <div className="shell grid gap-6 py-10 lg:grid-cols-[14rem_1fr] lg:items-center lg:gap-12 lg:py-8">
        <h2 id="triage-title" className="text-xl font-semibold tracking-[-0.02em]">
          What’s going on?
        </h2>
        <ul className="grid border-t border-navy/10 sm:grid-cols-3 sm:border-t-0 sm:border-l">
          {triage.map((item) => (
            <li key={item.label} className="border-b border-navy/10 sm:border-r sm:border-b-0">
              <RequestButton
                service={item.request}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:bg-navy hover:text-white sm:px-6 sm:py-6"
              >
                <span>
                  <span className="block mono-label text-navy/70 transition-colors group-hover:text-mist">
                    {item.detail}
                  </span>
                  <span className="mt-1.5 block text-[1.0625rem] font-semibold tracking-[-0.015em]">{item.label}</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy/6 text-lg transition-[background-color,color,transform] duration-300 ease-(--ease-out-expo) group-hover:rotate-45 group-hover:bg-gold group-hover:text-navy">
                  <ArrowUpRight />
                </span>
              </RequestButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
