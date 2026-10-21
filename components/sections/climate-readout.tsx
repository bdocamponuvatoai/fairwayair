"use client";

import { useEffect, useRef, useState } from "react";

const OUTSIDE = 107;
const INSIDE = 72;
const SCALE_MIN = 60;
const SCALE_MAX = 115;

const position = (t: number) => ((t - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

/**
 * Counts from the valley's July high down to a comfortable indoor setting.
 * Renders the final value on the server, so it reads correctly without JS
 * and for anyone who prefers reduced motion.
 */
export function ClimateReadout() {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(INSIDE);

  useEffect(() => {
    const node = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || reduce || !("IntersectionObserver" in window)) return;
    // Only stage the animation if the readout hasn't been seen yet.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    let frame = 0;
    setValue(OUTSIDE);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2200;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(OUTSIDE - (OUTSIDE - INSIDE) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const warmth = (value - INSIDE) / (OUTSIDE - INSIDE);

  return (
    <div
      ref={ref}
      className="rounded-[1.75rem] bg-white p-6 shadow-[0_1px_0_rgb(16_37_64/0.06),0_40px_80px_-48px_rgb(16_37_64/0.45)] sm:p-10"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="mono-label text-clay">Outside</p>
          <p className="mt-1 text-sm text-navy/70">Typical July high, Palm Desert</p>
        </div>
        <p className="text-4xl font-semibold tracking-[-0.04em] text-ember font-extrawide tabular-nums sm:text-5xl">
          {OUTSIDE}°
        </p>
      </div>

      <div className="relative my-8 sm:my-10" aria-hidden="true">
        <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#8fb7d8_0%,#d3dfe9_22%,#ffd033_70%,#e8902c_100%)]" />
        <div
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-navy shadow-[0_2px_10px_rgb(16_37_64/0.35)]"
          style={{ left: `${position(value)}%` }}
        />
        <div className="mt-4 flex justify-between mono-label text-[0.6875rem] text-navy/70">
          <span>{SCALE_MIN}°</span>
          <span>{SCALE_MAX}°</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="mono-label text-clay">Inside</p>
          <p className="mt-1 text-sm text-navy/70">Where you’d like it</p>
        </div>
        <p
          className="text-[clamp(5.5rem,4rem+8vw,10rem)] leading-[0.8] font-semibold tracking-[-0.06em] font-extrawide tabular-nums transition-colors duration-300"
          style={{
            color: warmth > 0.02 ? `color-mix(in srgb, #c4620c ${Math.round(warmth * 100)}%, #102540)` : "#102540",
          }}
        >
          <span aria-hidden="true">{value}°</span>
          <span className="sr-only">{INSIDE} degrees Fahrenheit</span>
        </p>
      </div>
    </div>
  );
}
