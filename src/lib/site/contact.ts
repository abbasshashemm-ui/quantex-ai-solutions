export const LEGACY_SITE_URL = "https://www.quantexai.info";

export const COMPANY = {
  name: "Quantex AI Solutions",
  tagline:
    "Web and app design engineered to convert — polished interfaces, thoughtful UX, and builds you can ship with confidence.",
} as const;

export const CONTACT = {
  email: "hello@quantexai.info",
  whatsapp: "https://wa.me/9613642102",
  phoneDisplay: "+961 36 421 02",
  phoneTel: "+9613642102",
  location: "Beirut, Lebanon",
  instagram: "https://www.instagram.com/",
  instagramHandle: "@quantexai",
} as const;

export const BUDGET_RANGES = [
  { value: "", label: "Select a range" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const CONTACT_CHANNELS = [
  {
    id: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
  {
    id: "phone",
    label: "Phone / WhatsApp",
    value: CONTACT.phoneDisplay,
    href: CONTACT.whatsapp,
    external: true,
  },
  {
    id: "location",
    label: "Location",
    value: CONTACT.location,
    href: undefined,
    external: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    external: true,
  },
] as const;

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
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = SITE_NAV.filter((item) => item.href !== "/");

export const FOOTER_EXTRA = [
  {
    label: "quantexai.info",
    href: LEGACY_SITE_URL,
    external: true,
  },
] as const;

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
] as const;
