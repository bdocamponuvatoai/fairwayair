import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { buttonClass, ButtonArrow } from "@/components/ui";
import { business } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80vh] flex-col justify-center pt-32 pb-24">
      <p className="mono-label text-clay">404</p>
      <h1 className="mt-6 max-w-[16ch] text-display font-semibold">This page has gone quiet.</h1>
      <p className="mt-6 max-w-[44ch] text-lede text-navy/70">
        The page you’re after doesn’t exist. Head home, or call {business.phone.display} and we’ll help directly.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={buttonClass("navy")}>
          Back to home <ButtonArrow icon={<ArrowRight />} />
        </Link>
        <a href={business.phone.href} className={buttonClass("ghost-dark")}>
          Call {business.phone.display}
        </a>
      </div>
    </section>
  );
}
