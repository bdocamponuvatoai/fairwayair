// Pure helpers for the service-request flow. No imports so the file runs
// under `node --test` with native type stripping.

export const serviceOptions = [
  "A/C repair",
  "System installation",
  "Heating service",
  "Ductwork & airflow",
  "Maintenance",
  "Light commercial HVAC",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const communities = [
  "Palm Desert",
  "La Quinta",
  "Indian Wells",
  "Rancho Mirage",
  "Palm Springs",
  "Indio",
] as const;

export type Community = (typeof communities)[number];

export const otherCommunity = "Another nearby community";

export type RequestDetails = {
  service: string;
  name: string;
  phone: string;
  city: string;
  details: string;
};

export function isServiceOption(value: unknown): value is ServiceOption {
  return typeof value === "string" && (serviceOptions as readonly string[]).includes(value);
}

export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "").length;
}

export type RequestErrors = Partial<Record<"service" | "name" | "phone", string>>;

export function validateRequest(data: Pick<RequestDetails, "service" | "name" | "phone">): RequestErrors {
  const errors: RequestErrors = {};
  if (!data.service) errors.service = "Choose a service to continue.";
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (phoneDigits(data.phone) < 10) errors.phone = "Enter a phone number with at least 10 digits.";
  return errors;
}

export function createRequestMessage({ service, name, phone, city, details }: RequestDetails) {
  const cleanName = name.trim();
  return [
    "Hello Fairway Air,",
    "",
    `I would like to discuss ${service.toLowerCase()}.`,
    "",
    `Name: ${cleanName}`,
    `Phone: ${phone.trim()}`,
    `Community: ${city}`,
    `Service: ${service}`,
    "",
    "What I have noticed:",
    details.trim() || "I would like to discuss the details by phone.",
    "",
    "Please contact me to discuss the next step and appointment availability.",
    "",
    "Thank you,",
    cleanName,
  ].join("\n");
}

export function createMailtoHref(email: string, data: RequestDetails) {
  const subject = `Service request — ${data.service} in ${data.city}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(createRequestMessage(data))}`;
}
