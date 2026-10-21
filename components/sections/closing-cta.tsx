import { ArrowRight, Phone } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-title"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      {/* The sun setting on the valley floor, drawn rather than photographed. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-px bg-white/15" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 aspect-square w-[min(26rem,78vw)] -translate-x-1/2 translate-y-1/2 rounded-full bg-gold"
      />
      <div className="shell pt-[clamp(5rem,4rem+6vw,10rem)] pb-[clamp(11rem,8rem+14vw,18rem)] text-center">
        <p className="mono-label text-mist">Let’s bring the good indoors</p>
        <h2 id="closing-title" data-reveal className="mx-auto mt-8 max-w-[14ch] text-display-xl font-semibold">
          A better-feeling home starts with <span className="text-gold">hello.</span>
        </h2>
        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <RequestButton className={buttonClass("gold")}>
            Request service <ButtonArrow icon={<ArrowRight />} />
          </RequestButton>
          <a href={business.phone.href} className={buttonClass("ghost-light")}>
            <Phone className="text-lg" />
            <span className="tabular-nums">{business.phone.display}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
