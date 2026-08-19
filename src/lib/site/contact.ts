export const SITE_URL = "https://quantexai.solutions";
export const SITE_HOST = "quantexai.solutions";

export const COMPANY = {
  name: "Quantex AI Solutions",
  tagline:
    "Technical SEO, Core Web Vitals, and search visibility—engineered at the source.",
} as const;

export const CONTACT = {
  email: "abbas@quantexai.solutions",
  whatsapp: "https://wa.me/9613642102",
  phoneDisplay: "+961 3 642 102",
  phoneTel: "+9613642102",
  location: "Beirut, Lebanon",
  instagram: "https://www.instagram.com/quantex.ai",
  instagramHandle: "@Quantex.ai",
  linkedin: "https://www.linkedin.com/company/quantex-ai-solution/",
} as const;

export const WHATSAPP_CTA_LABEL = "Chat on WhatsApp";

export const BUDGET_RANGES = [
  { value: "", label: "Select a plan" },
  { value: "assistant-29", label: "Quantex Assistant — $29/mo" },
  { value: "custom", label: "Custom build" },
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
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
  {
    label: WHATSAPP_CTA_LABEL,
    href: CONTACT.whatsapp,
    external: true,
  },
  {
    label: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneTel}`,
    external: false,
  },
] as const;

export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = SITE_NAV.filter((item) => item.href !== "/");

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
] as const;
