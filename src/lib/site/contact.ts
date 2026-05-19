/** Sourced from https://www.quantexai.info (quantexai.info) */
export const LEGACY_SITE_URL = "https://www.quantexai.info";

export const CONTACT = {
  whatsapp: "https://wa.me/9613642102",
  phoneDisplay: "+961 36 421 02",
  phoneTel: "+9613642102",
  location: "Beirut, Lebanon",
} as const;

export const CONTACT_LINKS = [
  {
    label: "Chat on WhatsApp",
    href: CONTACT.whatsapp,
    external: true,
  },
  {
    label: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneTel}`,
    external: false,
  },
  {
    label: "Book Strategy Call",
    href: CONTACT.whatsapp,
    external: true,
  },
] as const;

export const SITE_NAV = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
] as const;

export const FOOTER_NAV = SITE_NAV.filter(
  (item) => item.href !== "#home",
);
