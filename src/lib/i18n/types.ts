import type { FaqItem } from "@/lib/seo/faq";

export type Locale = "ar" | "fr";

/** One service, translated. Keys are the English service slugs. */
export type LocalizedService = {
  label: string; // short name, e.g. "Websites"
  tagline: string; // nav tagline
  description: string; // one sentence for cards
  overview: string; // "In plain words" paragraph
  highlights: string[]; // 3 chips
  deliverables: string[]; // "What you get"
  steps: { label: string; detail: string }[]; // "How it works" (4)
};

export type ServiceUi = {
  allServices: string; // "← All services" (arrow added by the component)
  eyebrow: string; // "Services"
  inShort: string;
  inPlainWords: string;
  whatYouGet: string;
  howItWorks: string;
  whatElse: string;
  scopedTitle: string; // "Scoped per project"
  getQuote: string;
  readyTitle: string; // "Ready to start?"
  readyLead: string;
  startProject: string;
  whatsapp: string;
  bookCall: string;
  pricingTitle: string; // "Pricing"
  seePricing: string;
  facts: { label: string; value: string }[]; // 3: Ownership/Yours, Replies/Within 24h, Contact/Direct
  aboutLink: { label: string; tagline: string };
  contactLink: { label: string; tagline: string };
  seoTitleSuffix: string; // appended to the service label in <title>, e.g. "| كوانتكس"
};

export type LocalizedHome = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: [string, string, string];
    lede: string;
    primary: string;
    secondary: string;
    chips: [string, string];
  };
  beats: { index: string; title: string; lede: string; link: string; slug: string }[]; // 2
  siteCheck: { label: string; title: string; text: string; button: string };
  aeo: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string, string];
    pillars: { label: string; slug: string | null; path: string | null }[]; // 4: Websites, AI assistants, SEO (service slugs), About (path)
  };
  services: { eyebrow: string; title: string; lede: string; learnMore: string };
  stats: { value: string; label: string }[]; // 3
  process: {
    eyebrow: string;
    heading: string;
    support: string;
    stages: { n: string; code: string; title: string; body: string }[]; // 4
  };
  guides: { eyebrow: string; title: string; lede: string; readGuide: string; viewAll: string };
  faq: { eyebrow: string; title: string; lede: string; aboutLink: string; items: FaqItem[] };
  closing: {
    promises: { title: string; body: string }[]; // 3
    title: string;
    primary: string;
    whatsapp: string;
  };
};

export type LocalizedAbout = {
  metaTitle: string;
  metaDescription: string;
  back: string;
  hero: { eyebrow: string; title: string; lead: string };
  story: { eyebrow: string; title: string; paragraphs: [string, string, { before: string; highlight: string; after: string }] };
  stats: { value: string; label: string }[]; // 3
  values: { index: string; title: string; body: string }[]; // 4
  capabilities: { eyebrow: string; title: string; lead: string };
  cta: { eyebrow: string; title: string; lead: string; primary: string; secondary: string };
  founderRole: string; // e.g. "Full-stack developer"
};

export type LocalizedContact = {
  metaTitle: string;
  metaDescription: string;
  back: string;
  eyebrow: string;
  title: string;
  lead: string; // "We reply within 24 hours."
  intro?: string; // optional paragraph under the title
  browsing: string; // "Still browsing?"
  seeBuild: string;
  aboutStudio: string;
  channels: { email: string; phone: string; location: string; instagram: string };
  bookTitle: string;
  bookText: string;
  bookButton: string;
  form: {
    title: string;
    intro: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    consent: string; // text before the privacy link
    privacy: string; // privacy link label
    submit: string;
    tooLong: string;
    waGreeting: string; // first line of the WhatsApp message, e.g. "Hello QUANTEX,"
    waName: string;
    waEmail: string;
    waPhone: string;
  };
};

export type LocaleContent = {
  locale: Locale;
  htmlLang: string;
  dir: "rtl" | "ltr";
  ogLocale: string; // "ar_LB" / "fr_FR"
  switcher: { en: string; ar: string; fr: string }; // language names in their own language: English / العربية / Français
  home: LocalizedHome;
  serviceUi: ServiceUi;
  services: Record<string, LocalizedService>;
  about: LocalizedAbout;
  contact: LocalizedContact;
};
