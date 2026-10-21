import type { Community, ServiceOption } from "./request";

export type Service = {
  id: string;
  name: string;
  title: string;
  summary: string;
  scope: readonly string[];
  request: ServiceOption;
};

export const services: readonly Service[] = [
  {
    id: "cooling",
    name: "Cooling",
    title: "A cooler home starts here.",
    summary:
      "Weak airflow, warm air, or a system that won’t start. Repairs to get you through the week, or a replacement sized for the house you actually live in.",
    scope: ["A/C repair", "System replacement", "New installation"],
    request: "A/C repair",
  },
  {
    id: "heating",
    name: "Heating",
    title: "For the other side of desert living.",
    summary:
      "Valley nights drop fast in winter. Furnace and heat-pump repair and installation, so the cold months stay comfortable too.",
    scope: ["Heating repair", "Heating installation", "Heat pumps"],
    request: "Heating service",
  },
  {
    id: "airflow",
    name: "Airflow & ductwork",
    title: "Every room, in balance.",
    summary:
      "One room warm, another too cool. An airflow and ductwork assessment shows what’s happening between the equipment and the vents.",
    scope: ["Ductwork assessment", "Airflow concerns", "Room-to-room comfort"],
    request: "Ductwork & airflow",
  },
  {
    id: "care",
    name: "Preventive care",
    title: "Attention before the hard months.",
    summary:
      "Routine care before your equipment has to work its hardest. Ask about maintenance options for your home and system.",
    scope: ["Seasonal care", "System checks", "Maintenance options"],
    request: "Maintenance",
  },
];

export const triage: readonly { label: string; detail: string; request: ServiceOption }[] = [
  { label: "My A/C isn’t cooling", detail: "Repair", request: "A/C repair" },
  { label: "It’s time for a new system", detail: "Installation", request: "System installation" },
  { label: "I’m planning ahead", detail: "Maintenance", request: "Maintenance" },
];

export const steps = [
  {
    title: "Tell us what’s happening.",
    body: "Share your location, the symptoms, and how long you’ve noticed them. Have the system’s model number handy if you can.",
  },
  {
    title: "Get a closer look.",
    body: "A visit to understand the system and the issue. A useful recommendation starts with a proper assessment.",
  },
  {
    title: "Choose your next step.",
    body: "Talk through the work, your options, and the cost before you decide how to move forward.",
  },
] as const;

// Positions are projected from real coordinates (lon −116.60…−116.17,
// lat 33.62…33.88) onto a 600 × 400 canvas. Label offsets avoid collisions.
export const areaMap: Record<
  Community,
  { x: number; y: number; anchor: "start" | "end"; dx: number; dy: number; note: string }
> = {
  "Palm Springs": {
    x: 91,
    y: 89,
    anchor: "start",
    dx: 14,
    dy: 4,
    note: "Service across Palm Springs. Call to talk through availability.",
  },
  "Rancho Mirage": {
    x: 264,
    y: 214,
    anchor: "end",
    dx: -14,
    dy: -8,
    note: "Cooling, heating, and airflow support for Rancho Mirage.",
  },
  "Palm Desert": { x: 314, y: 238, anchor: "end", dx: -14, dy: 20, note: "Our home base, on Elkhorn Trail." },
  "Indian Wells": {
    x: 354,
    y: 245,
    anchor: "start",
    dx: 12,
    dy: 24,
    note: "Cooling, heating, and airflow support for Indian Wells.",
  },
  "La Quinta": {
    x: 398,
    y: 320,
    anchor: "start",
    dx: 14,
    dy: 5,
    note: "Cooling, heating, and airflow support for La Quinta.",
  },
  Indio: { x: 521, y: 241, anchor: "end", dx: -12, dy: -14, note: "Cooling, heating, and airflow support for Indio." },
};

export const faqs = [
  {
    q: "My A/C stopped cooling. What’s the next step?",
    a: "Call (760) 574-9788 and describe what’s happening. Share your location and how long the system has been affected so we can talk through availability and the right next step.",
  },
  {
    q: "Can you help with both repair and replacement?",
    a: "Yes. Fairway Air handles A/C and heating repairs as well as system installations. An assessment shows which options make sense for your equipment and space.",
  },
  {
    q: "Do you work on heating systems, too?",
    a: "Yes. Heating repair and installation are part of the service, including furnaces and heat pumps. Mention your equipment type when you get in touch.",
  },
  {
    q: "What if some rooms feel warmer than others?",
    a: "Ask about ductwork and airflow. Describe which rooms are affected and when the difference is most noticeable, and we’ll arrange an appropriate assessment.",
  },
  {
    q: "Can I request routine maintenance?",
    a: "Yes. Get in touch to discuss maintenance for your system and ask about current plan options, scope, pricing, and scheduling.",
  },
  {
    q: "Does an online request confirm my appointment?",
    a: "No. The request tool prepares an email for you to review and send. An appointment is confirmed only after Fairway Air responds and agrees on the details with you. Call if you need to talk right away.",
  },
] as const;
