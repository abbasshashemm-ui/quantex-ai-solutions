import { SERVICES } from "./data";

export type NavServiceIcon =
  | "code"
  | "workflow"
  | "layers"
  | "monitor"
  | "chat";

export type NavServiceItem = {
  slug: string;
  label: string;
  tagline: string;
  icon: NavServiceIcon;
  href: string;
};

const NAV_META: Record<
  string,
  { label: string; tagline: string; icon: NavServiceIcon }
> = {
  software: {
    label: "Custom software",
    tagline: "Dashboards, portals & bespoke apps",
    icon: "code",
  },
  automation: {
    label: "Process automation",
    tagline: "Workflows, integrations & throughput",
    icon: "workflow",
  },
  architecture: {
    label: "System architecture",
    tagline: "Cloud-native foundations & scale",
    icon: "layers",
  },
  websites: {
    label: "High-converting websites",
    tagline: "Performance-first sites that convert",
    icon: "monitor",
  },
  chatbots: {
    label: "Intelligent chatbots",
    tagline: "AI assistants wired to your stack",
    icon: "chat",
  },
};

export const NAV_SERVICE_ITEMS: NavServiceItem[] = SERVICES.map((service) => {
  const meta = NAV_META[service.id];
  return {
    slug: service.slug,
    label: meta.label,
    tagline: meta.tagline,
    icon: meta.icon,
    href: `/services/${service.slug}`,
  };
});

export const SOLUTIONS_OVERVIEW_HREF = "/#solutions";
