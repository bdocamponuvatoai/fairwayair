// Business facts confirmed from the owner's reference site (reviewed 2026-10-21).
// See docs/content-sources.md before adding any new claim.
export const business = {
  name: "Fairway Air",
  tagline: "We’ll keep the air on for you.",
  owner: "Kenneth Chavez",
  phone: { href: "tel:+17605749788", display: "(760) 574-9788", e164: "+17605749788" },
  email: "fairwayair2021@gmail.com",
  address: {
    street: "43720 Elkhorn Trl",
    city: "Palm Desert",
    region: "CA",
    postalCode: "92211",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Fairway+Air+43720+Elkhorn+Trl+Palm+Desert+CA+92211",
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#areas", label: "Service area" },
  { href: "/#faq", label: "Questions" },
] as const;
