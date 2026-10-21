import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & requests",
  description: "How the Fairway Air service-request tool handles the details you enter.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="shell pt-36 pb-24 sm:pt-44 lg:pb-36">
      <p className="mono-label text-clay">Privacy &amp; requests</p>
      <h1 className="mt-6 max-w-[14ch] text-display font-semibold">You’re in control.</h1>

      <div className="mt-12 max-w-[62ch] space-y-6 text-lede text-navy/75">
        <p>
          The service-request tool prepares an email on your device. This website does not submit the form to a server
          or store your contact details in browser storage.
        </p>
        <p>
          If you choose “Open email draft,” your email app receives the information you entered. Nothing is sent until
          you send that email. Your email provider and Fairway Air then handle the message.
        </p>
        <p>
          This site does not use analytics or advertising cookies. Email, telephone, and map links are handled by their
          respective apps or providers.
        </p>
        <p>
          Questions? Contact{" "}
          <a
            className="font-semibold text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
            href={`mailto:${business.email}`}
          >
            {business.email}
          </a>
          .
        </p>
      </div>

      <Link href="/" className="group mt-14 inline-flex items-center gap-3 font-semibold">
        Back to home
        <ArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
