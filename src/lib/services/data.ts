export type ServiceAccent = "white" | "grey" | "metallic";

export type ServicePlaceholderSection = {
  title: string;
  body: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  accent: ServiceAccent;
  index: number;
  placeholders: ServicePlaceholderSection[];
};

const PLACEHOLDER_SECTIONS: ServicePlaceholderSection[] = [
  {
    title: "Overview",
    body: "Placeholder copy for the service overview. We will replace this with your positioning, outcomes, and who this is built for.",
  },
  {
    title: "What you get",
    body: "Placeholder bullet area for deliverables, timelines, and scope. Add packages, milestones, or feature lists here.",
  },
  {
    title: "How we work",
    body: "Placeholder for your process — discovery, design, build, launch, and ongoing support.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "software",
    slug: "custom-software-development",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    description:
      "Bespoke applications engineered for scale, security, and long-term maintainability.",
    accent: "white",
    index: 0,
    placeholders: PLACEHOLDER_SECTIONS,
  },
  {
    id: "automation",
    slug: "business-process-automation",
    title: "BUSINESS PROCESS AUTOMATION",
    description:
      "Intelligent workflows that eliminate friction and accelerate operational throughput.",
    accent: "grey",
    index: 1,
    placeholders: PLACEHOLDER_SECTIONS,
  },
  {
    id: "architecture",
    slug: "custom-system-architectures",
    title: "CUSTOM SYSTEM ARCHITECTURES",
    description:
      "Resilient, cloud-native foundations designed around your data and growth trajectory.",
    accent: "white",
    index: 2,
    placeholders: PLACEHOLDER_SECTIONS,
  },
  {
    id: "websites",
    slug: "high-converting-websites",
    title: "HIGH-CONVERTING WEBSITES",
    description:
      "Immersive, performance-first experiences that turn attention into measurable outcomes.",
    accent: "metallic",
    index: 3,
    placeholders: PLACEHOLDER_SECTIONS,
  },
  {
    id: "chatbots",
    slug: "custom-intelligent-chatbots",
    title: "CUSTOM INTELLIGENT CHATBOTS",
    description:
      "Context-aware assistants that integrate with your stack and elevate customer touchpoints.",
    accent: "grey",
    index: 4,
    placeholders: PLACEHOLDER_SECTIONS,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
