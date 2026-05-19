import { LEGACY_SITE_URL } from "./contact";

export const COMPANY = {
  name: "Quantex AI Solutions",
  tagline:
    "Web and app design engineered to convert — polished interfaces, thoughtful UX, and builds you can ship with confidence.",
  legacySite: LEGACY_SITE_URL,
} as const;

export { CONTACT_LINKS, FOOTER_NAV } from "./contact";

export const FOOTER_EXTRA = [
  {
    label: "quantexai.info",
    href: LEGACY_SITE_URL,
    external: true,
  },
] as const;
