import Image from "next/image";
import type { CSSProperties } from "react";
import hero from "@/assets/images/hero.webp";
import { ArrowRight, Phone } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-theme="dark"
      className="relative isolate flex min-h-[max(40rem,100vh)] flex-col overflow-hidden bg-navy-950 text-white supports-[height:100svh]:min-h-[max(40rem,100svh)]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero}
          alt="Illustrative modern desert home at golden hour with an outdoor air-conditioning condenser beside the pool terrace"
          preload
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className="intro-settle size-full object-cover object-[24%_50%] md:object-center"
        />
        {/* Legibility scrims: a deep base for the headline, a light top for the header. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(7_20_38/0.96)_0%,rgb(7_20_38/0.78)_34%,rgb(7_20_38/0.12)_68%,rgb(7_20_38/0.38)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgb(7_20_38/0.6),transparent_62%)] md:block" />
      </div>

      <div className="shell flex flex-1 flex-col justify-end pt-32 pb-10 sm:pb-14 lg:pb-20">
        <p className="intro-fade flex items-center gap-3 mono-label text-white/80" style={delay(150)}>
          <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
          HVAC · Palm Desert &amp; the Coachella Valley
        </p>

        <h1 id="hero-title" className="mt-6 max-w-[12ch] text-display-xl font-semibold sm:mt-8">
          <span className="intro-rise block" style={delay(200)}>
            Desert outside.
          </span>
          <span className="intro-rise block text-gold" style={delay(320)}>
            Comfort inside.
          </span>
        </h1>

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,32rem)_1fr] lg:items-end">
          <div className="intro-rise" style={delay(460)}>
            <p className="max-w-[34ch] text-lede text-white/82">
              Cooling, heating, and airflow care from an owner-operated team based in Palm Desert. Clear answers, and a
              home that feels like a retreat again.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <RequestButton className={buttonClass("gold")}>
                Request service <ButtonArrow icon={<ArrowRight />} />
              </RequestButton>
              <a href={business.phone.href} className={buttonClass("ghost-light")}>
                <Phone className="text-lg" />
                <span className="tabular-nums">{business.phone.display}</span>
              </a>
            </div>
          </div>

          <p className="intro-fade mono-label text-white/65 lg:justify-self-end" style={delay(900)}>
            Illustrative image
          </p>
        </div>
      </div>
    </section>
  );
}
