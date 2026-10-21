import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/fairway-logo.webp";
import { ArrowUpRight } from "@/components/icons";
import { RequestButton } from "@/components/request/request-button";
import { business, navigation } from "@/lib/site";

const linkClass = "transition-colors hover:text-white";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="bg-navy-950 pb-28 text-mist lg:pb-0">
      <div className="shell grid gap-12 border-t border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="Fairway Air home" className="inline-block rounded-sm">
            <Image src={logo} alt="" sizes="144px" className="h-auto w-36" />
          </Link>
          <p className="mt-6 max-w-[28ch] leading-relaxed">
            {business.tagline} Palm Desert &amp; the Coachella Valley.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="mono-label text-white/65">Talk to us</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={business.phone.href}
                className="text-2xl font-semibold tracking-[-0.02em] text-white tabular-nums hover:text-gold"
              >
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={`${linkClass} break-all`}>
                {business.email}
              </a>
            </li>
            <li>
              <RequestButton className={`${linkClass} inline-flex items-center gap-2`}>
                Prepare a service request <ArrowUpRight />
              </RequestButton>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="mono-label text-white/65">Find us</h2>
          <address className="mt-5 leading-relaxed not-italic">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.region} {business.address.postalCode}
          </address>
          <a
            href={business.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} mt-3 inline-flex items-center gap-2`}
          >
            View on map <ArrowUpRight />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="mono-label text-white/65">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {business.name}
        </p>
        <p>Service imagery is illustrative.</p>
        <Link href="/privacy" className={linkClass}>
          Privacy &amp; requests
        </Link>
      </div>
    </footer>
  );
}
