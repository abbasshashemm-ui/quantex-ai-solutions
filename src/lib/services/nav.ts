import { SERVICES, type NavServiceIcon } from "./data";

export type { NavServiceIcon };

export type NavServiceItem = {
  slug: string;
  label: string;
  tagline: string;
  icon: NavServiceIcon;
  href: string;
};

export const NAV_SERVICE_ITEMS: NavServiceItem[] = SERVICES.map((service) => ({
  slug: service.slug,
  label: service.nav.label,
  tagline: service.nav.tagline,
  icon: service.nav.icon,
  href: `/services/${service.slug}`,
}));

export const SOLUTIONS_OVERVIEW_HREF = "/#solutions";

const RELATED_BY_SLUG: Record<string, string[]> = {
  "custom-software-development": [
    "custom-system-architectures",
    "business-process-automation",
    "high-converting-websites",
  ],
  "business-process-automation": [
    "custom-software-development",
    "custom-intelligent-chatbots",
    "custom-system-architectures",
  ],
  "custom-system-architectures": [
    "custom-software-development",
    "high-converting-websites",
    "seo",
  ],
  "high-converting-websites": [
    "seo",
    "custom-intelligent-chatbots",
    "custom-software-development",
  ],
  seo: [
    "high-converting-websites",
    "custom-intelligent-chatbots",
    "custom-system-architectures",
  ],
  "custom-intelligent-chatbots": [
    "high-converting-websites",
    "business-process-automation",
    "custom-software-development",
  ],
};

export function getRelatedNavServices(slug: string, limit = 3): NavServiceItem[] {
  const slugs = RELATED_BY_SLUG[slug] ?? [];
  return slugs
    .slice(0, limit)
    .flatMap((relatedSlug) =>
      NAV_SERVICE_ITEMS.filter((item) => item.slug === relatedSlug),
    );
}
