"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import logo from "@/assets/images/fairway-logo.webp";
import { ArrowUpRight, Close, Phone } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { buttonClass, cx } from "@/components/ui";
import { business, navigation } from "@/lib/site";

export function SiteHeader() {
  const overHero = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => event.matches && menuRef.current?.close();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <header
      data-theme={solid ? undefined : "dark"}
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-500 ease-(--ease-out-expo)",
        solid
          ? "bg-sand-50/96 text-navy shadow-[0_1px_0_rgb(16_37_64/0.08)] supports-backdrop-filter:bg-sand-50/90 supports-backdrop-filter:backdrop-blur-xl supports-backdrop-filter:backdrop-saturate-150"
          : "bg-transparent text-white",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="relative shrink-0 rounded-sm" aria-label="Fairway Air home">
          <Image src={logo} alt="" loading="eager" sizes="128px" className="h-auto w-24 lg:w-28" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative rounded-full px-4 py-2.5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors hover:bg-current/8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={business.phone.href}
            className="hidden items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium tabular-nums transition-colors hover:bg-current/8 md:inline-flex"
          >
            <Phone className="text-base opacity-70" />
            {business.phone.display}
          </a>
          <RequestButton className={buttonClass(solid ? "navy" : "gold", "min-h-11 px-5 text-sm max-sm:hidden")}>
            Request service
          </RequestButton>
          <button
            type="button"
            onClick={() => menuRef.current?.showModal()}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="-mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-current/8 lg:hidden"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-3/5 self-end bg-current" />
            </span>
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        data-theme="dark"
        className="sheet bg-navy text-white lg:hidden"
        onClick={(event) => {
          // Links and the request trigger both dismiss the menu once they've acted.
          if ((event.target as HTMLElement).closest("a, [aria-haspopup='dialog']")) menuRef.current?.close();
        }}
      >
        <div className="shell flex h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex h-18 items-center justify-between">
            <Image src={logo} alt="Fairway Air" sizes="96px" className="h-auto w-24" />
            <button
              type="button"
              onClick={() => menuRef.current?.close()}
              aria-label="Close menu"
              className="-mr-2 grid size-11 place-items-center rounded-full text-xl hover:bg-white/10"
            >
              <Close />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="border-b border-white/12">
                  <Link
                    href={item.href}
                    className="intro-rise flex items-baseline justify-between py-4 text-[2rem] leading-tight font-semibold tracking-[-0.035em]"
                    style={{ "--delay": `${80 + i * 50}ms` } as CSSProperties}
                  >
                    {item.label}
                    <span className="mono-label text-mist">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-10">
            <a href={business.phone.href} className={buttonClass("ghost-light", "w-full")}>
              <Phone className="text-lg" /> Call {business.phone.display}
            </a>
            <RequestButton className={buttonClass("gold", "w-full")}>
              Request service <ArrowUpRight className="text-lg" />
            </RequestButton>
          </div>
        </div>
      </dialog>
    </header>
  );
}
