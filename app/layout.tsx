import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RequestProvider } from "@/components/request/request-context";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { communities } from "@/lib/request";
import { allowIndexing, business, siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const description =
  "Cooling, heating, ductwork, and HVAC maintenance for homes and light commercial spaces in Palm Desert and the Coachella Valley.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fairway Air · HVAC in Palm Desert & the Coachella Valley",
    template: "%s · Fairway Air",
  },
  description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: "Fairway Air · Desert outside. Comfort inside.",
    description,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Modern desert home with an outdoor air-conditioning unit" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#102540",
  colorScheme: "light",
  viewportFit: "cover",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: business.name,
  url: siteUrl,
  telephone: business.phone.e164,
  email: business.email,
  image: `${siteUrl}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  },
  areaServed: communities.map((name) => ({ "@type": "City", name: `${name}, CA` })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-gold px-5 py-3 font-semibold text-navy transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <RequestProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileActionBar />
        </RequestProvider>
        <RevealObserver />
        <script
          type="application/ld+json"
          // Static, server-defined data only; escape `<` to keep it inert.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
