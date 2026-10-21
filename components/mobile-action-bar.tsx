"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { cx } from "@/components/ui";
import { business } from "@/lib/site";

/** Thumb-reach contact bar for phones, shown once the hero is behind you. */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-theme="dark"
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-(--ease-out-expo) lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-2 rounded-full bg-navy/95 p-1.5 shadow-[0_20px_50px_-12px_rgb(7_20_38/0.6)] supports-backdrop-filter:bg-navy/85 supports-backdrop-filter:backdrop-blur-lg">
        <a
          href={business.phone.href}
          className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-semibold text-white"
        >
          <Phone className="text-lg text-gold" /> Call
        </a>
        <RequestButton className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-5 text-[0.9375rem] font-semibold text-navy">
          Request service <ArrowRight className="text-lg" />
        </RequestButton>
      </div>
    </div>
  );
}
