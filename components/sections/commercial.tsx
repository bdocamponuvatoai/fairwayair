import Image from "next/image";
import rooftop from "@/assets/images/rooftop.webp";
import { ArrowUpRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";

export function Commercial() {
  return (
    <section aria-labelledby="commercial-title" className="bg-sand-50 pb-[clamp(5rem,4rem+6vw,10rem)]">
      <div className="shell">
        <div
          className="relative isolate grid overflow-hidden rounded-[1.75rem] bg-navy text-white lg:grid-cols-12"
          data-theme="dark"
        >
          <div
            data-reveal="image"
            className="relative aspect-[16/10] lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]"
          >
            <Image
              src={rooftop}
              alt="Example of rooftop air-conditioning condensers on a commercial building"
              placeholder="blur"
              sizes="(min-width: 64rem) 55vw, 100vw"
              className="size-full object-cover object-[70%_40%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_37_64/0.85),transparent_45%)] lg:bg-[linear-gradient(to_right,rgb(16_37_64/1),transparent_35%)]" />
            <p className="absolute right-5 bottom-4 mono-label text-white/75">Illustrative image</p>
          </div>

          <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-10 lg:order-1 lg:col-span-5 lg:p-14">
            <p className="mono-label text-mist">Light commercial</p>
            <div>
              <h2
                id="commercial-title"
                data-reveal
                className="text-title font-semibold sm:text-[clamp(2rem,1.4rem+2vw,3.25rem)]"
              >
                Your business needs its comfort zone, too.
              </h2>
              <p className="mt-5 max-w-[38ch] leading-relaxed text-white/70">
                Service and replacement support for light commercial HVAC and rooftop equipment, from the same local
                team.
              </p>
              <RequestButton service="Light commercial HVAC" className={buttonClass("gold", "mt-8")}>
                Talk commercial <ButtonArrow icon={<ArrowUpRight />} />
              </RequestButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
