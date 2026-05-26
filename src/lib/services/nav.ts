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
