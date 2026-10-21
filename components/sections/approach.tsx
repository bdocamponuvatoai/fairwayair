import Image from "next/image";
import type { CSSProperties } from "react";
import detail from "@/assets/images/service-detail.webp";
import { ArrowRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass, SectionLabel } from "@/components/ui";
import { steps } from "@/lib/content";
import { business } from "@/lib/site";

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-sand-50 section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-6">
            <div
              data-reveal="image"
              className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand-200 sm:aspect-[4/3] lg:aspect-[5/6]"
            >
              <Image
                src={detail}
                alt="Illustrative close-up of a technician checking an outdoor condenser coil with digital manifold gauges"
                placeholder="blur"
                sizes="(min-width: 64rem) 46vw, 100vw"
                className="size-full object-cover object-[40%_50%]"
              />
            </div>
            <figcaption className="mt-4 mono-label text-clay">Illustrative image</figcaption>
          </figure>

          <div className="flex flex-col lg:col-span-5 lg:col-start-8 lg:pt-6">
            <SectionLabel index="03" className="text-clay">
              The Fairway approach
            </SectionLabel>
            <h2 id="approach-title" data-reveal className="mt-6 text-display font-semibold">
              Real people. Clear answers.
            </h2>
            <div data-reveal className="mt-8 space-y-5 text-lede text-navy/70">
              <p>
                Fairway Air is owned and operated by {business.owner}, right here in Palm Desert, working with
                homeowners and local businesses across the Coachella Valley.
              </p>
              <p>
                Tell us what your system is doing. We’ll help you understand the issue and talk through the next step,
                whether that’s a repair, a replacement, or ongoing care.
              </p>
            </div>

            <div data-reveal className="mt-10 flex items-center gap-4 border-t border-navy/10 pt-8">
              <span
                aria-hidden="true"
                className="grid size-14 place-items-center rounded-full bg-navy text-sm font-semibold tracking-tight text-gold font-extrawide"
              >
                KC
              </span>
              <div>
                <p className="font-semibold">{business.owner}</p>
                <p className="mt-0.5 mono-label text-clay">Owner, Fairway Air</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 lg:mt-36">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h3 data-reveal className="max-w-[18ch] text-title font-semibold">
              From “what’s wrong?” to “what’s next.”
            </h3>
            <RequestButton className={buttonClass("ghost-dark", "self-start sm:self-auto")}>
              Start a conversation <ButtonArrow icon={<ArrowRight />} />
            </RequestButton>
          </div>

          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--delay": `${i * 80}ms` } as CSSProperties}
                className="border-t border-navy/15 pt-6"
              >
                {/* 48px bold is large text: navy at 55% clears the 3:1 minimum. */}
                <span className="text-5xl font-semibold tracking-[-0.05em] text-navy/55 font-extrawide tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-10 text-xl font-semibold tracking-[-0.02em] md:mt-16">{step.title}</h4>
                <p className="mt-3 leading-relaxed text-navy/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
