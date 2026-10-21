"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { ButtonArrow, buttonClass, cx, SectionLabel } from "@/components/ui";
import { areaMap } from "@/lib/content";
import { communities, type Community } from "@/lib/request";
import { business } from "@/lib/site";

// Roughly 24.7 miles across 560px at this latitude, so 5 miles ≈ 113px.
const FIVE_MILES = 113;

export function ServiceArea() {
  const [selected, setSelected] = useState<Community>("Palm Desert");
  const current = areaMap[selected];
  const isHome = selected === "Palm Desert";

  return (
    <section id="areas" aria-labelledby="areas-title" className="bg-sand-100 section-y">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionLabel index="04" className="text-clay">
            Service area
          </SectionLabel>
          <h2 id="areas-title" data-reveal className="mt-6 text-display font-semibold">
            Local roots. <span className="whitespace-nowrap">Valley-wide</span> care.
          </h2>
          <p data-reveal className="mt-8 max-w-[38ch] text-lede text-navy/70">
            Based in Palm Desert, serving homes and businesses across the Coachella Valley.
          </p>

          <ul role="list" aria-label="Communities we serve" className="mt-10 border-t border-navy/12">
            {communities.map((city) => {
              const active = city === selected;
              return (
                <li key={city} className="border-b border-navy/12">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(city)}
                    className={cx(
                      "group flex w-full items-center justify-between py-4 text-left text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 sm:text-2xl",
                      active ? "text-navy" : "text-navy/70 hover:text-navy",
                    )}
                  >
                    {city}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "size-2.5 rounded-full transition-[background-color,transform] duration-500 ease-(--ease-out-expo)",
                        active ? "scale-100 bg-gold ring-4 ring-gold/25" : "scale-50 bg-navy/30 group-hover:scale-75",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-navy/70">
            Nearby community?{" "}
            <a
              href={business.phone.href}
              className="font-semibold text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
            >
              Call to confirm coverage
            </a>
            .
          </p>
        </div>

        <div data-reveal className="lg:col-span-7 lg:col-start-6 lg:pl-8">
          <div data-theme="dark" className="overflow-hidden rounded-[1.75rem] bg-navy text-white lg:sticky lg:top-28">
            <svg viewBox="0 0 600 400" className="block h-auto w-full" role="img" aria-labelledby="map-title">
              <title id="map-title">Map of Fairway Air service communities in the Coachella Valley</title>
              <defs>
                <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffd033" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ffd033" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Terrain: San Jacinto to the west, Santa Rosa to the south, Little San Bernardino to the north-east. */}
              <g fill="none" stroke="#a8bccf" strokeOpacity="0.16" strokeWidth="1">
                <path d="M-10 150 C 30 170, 40 240, 20 300 S 10 380, 40 410" />
                <path d="M-10 120 C 50 150, 70 240, 50 300 S 50 380, 80 410" />
                <path d="M-10 95 C 70 130, 100 240, 85 300 S 90 380, 125 410" />
                <path d="M120 410 C 180 360, 250 330, 330 360 S 420 380, 470 410" />
                <path d="M170 410 C 220 375, 270 355, 330 380 S 400 395, 430 410" />
                <path d="M80 410 C 150 345, 240 300, 340 335 S 460 355, 520 410" />
                <path d="M380 -10 C 420 40, 500 70, 610 60" />
                <path d="M430 -10 C 460 25, 520 45, 610 30" />
                <path d="M330 -10 C 380 55, 480 95, 610 92" />
              </g>

              {/* Interstate 10 and Highway 111. */}
              <path
                d="M60 -4 C 160 36, 270 100, 390 136 S 520 176, 610 186"
                fill="none"
                stroke="#a8bccf"
                strokeOpacity="0.45"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <text x="556" y="166" fill="#a8bccf" fillOpacity="0.7" fontSize="11" className="font-mono">
                I-10
              </text>
              <path
                d="M91 89 C 150 150, 220 200, 264 214 S 330 242, 354 245 S 470 250, 521 241"
                fill="none"
                stroke="#a8bccf"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <text x="150" y="152" fill="#a8bccf" fillOpacity="0.55" fontSize="11" className="font-mono">
                111
              </text>

              <circle
                cx={current.x}
                cy={current.y}
                r="48"
                fill="url(#map-glow)"
                className="transition-all duration-700"
              />

              {communities.map((city) => {
                const p = areaMap[city];
                const active = city === selected;
                return (
                  <g key={city} className="cursor-pointer" onClick={() => setSelected(city)}>
                    <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={active ? 6 : 4}
                      fill={active ? "#ffd033" : "#d3dfe9"}
                      stroke={active ? "#102540" : "none"}
                      strokeWidth="2"
                    />
                    <text
                      x={p.x + p.dx}
                      y={p.y + p.dy}
                      textAnchor={p.anchor}
                      fill={active ? "#ffffff" : "#a8bccf"}
                      fontWeight={active ? 600 : 400}
                      className="font-mono text-[18px] uppercase transition-colors sm:text-[13px]"
                      letterSpacing="0.04em"
                    >
                      {city}
                    </text>
                  </g>
                );
              })}

              {/* Compass and scale. */}
              <g transform="translate(560 40)" fill="none" stroke="#a8bccf" strokeOpacity="0.6">
                <path d="M0 14 V -10 M-5 -4 L0 -10 L5 -4" strokeWidth="1.2" />
                <text y="30" textAnchor="middle" fill="#a8bccf" stroke="none" fontSize="10" className="font-mono">
                  N
                </text>
              </g>
              <g transform={`translate(${560 - FIVE_MILES} 372)`} stroke="#a8bccf" strokeOpacity="0.6">
                <path d={`M0 0 H ${FIVE_MILES} M0 -4 V 4 M${FIVE_MILES} -4 V 4`} strokeWidth="1" />
                <text
                  x={FIVE_MILES / 2}
                  y="-9"
                  textAnchor="middle"
                  fill="#a8bccf"
                  stroke="none"
                  fontSize="10"
                  className="font-mono"
                >
                  5 MI
                </text>
              </g>
            </svg>

            <div className="border-t border-white/12 p-6 sm:p-8" aria-live="polite">
              <p className="mono-label text-mist">{isHome ? "Home base" : "In our service area"}</p>
              <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-title font-semibold">{selected}</p>
                  <p className="mt-2 max-w-[36ch] text-white/65">{current.note}</p>
                </div>
                <RequestButton city={selected} className={buttonClass("gold", "shrink-0")}>
                  Request in {selected} <ButtonArrow icon={<ArrowRight />} />
                </RequestButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
