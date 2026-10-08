export const SITE_URL = "https://www.quantexai.solutions";
export const SITE_HOST = "quantexai.solutions";

export const COMPANY = {
  name: "Quantex AI Solutions",
  tagline: "A Beirut studio for websites, AI assistants and business software.",
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
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
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
    label: "Start a project on WhatsApp",
    href: CONTACT.whatsapp,
    external: true,
  },
] as const;

export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "AI Solutions", href: "/ai-solutions" },
  { label: "Guides", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = [
  ...SITE_NAV.filter((item) => item.href !== "/"),
  { label: "Pricing", href: "/pricing" },
  { label: "AI Solutions in Lebanon", href: "/ai-solutions-lebanon" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
] as const;
