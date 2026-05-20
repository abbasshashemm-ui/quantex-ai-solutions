import { SERVICES } from "./data";
import type { NavServiceIcon } from "./icons";

export type { NavServiceIcon } from "./icons";

export type NavServiceItem = {
  slug: string;
  label: string;
  tagline: string;
  icon: NavServiceIcon;
  href: string;
};

export function getNavMetaForService(serviceId: string) {
  return SERVICES.find((service) => service.id === serviceId)?.nav;
}

export const NAV_SERVICE_ITEMS: NavServiceItem[] = SERVICES.map((service) => ({
  slug: service.slug,
  label: service.nav.label,
  tagline: service.nav.tagline,
  icon: service.nav.icon,
  href: `/services/${service.slug}`,
}));

export const SOLUTIONS_OVERVIEW_HREF = "/#solutions";
