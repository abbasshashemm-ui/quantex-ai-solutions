import { COMPANY, CONTACT, SITE_URL } from "@/lib/site/contact";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelHost = process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return SITE_URL.replace(/\/$/, "");
}

export const SITE = {
  name: COMPANY.name,
  tagline: COMPANY.tagline,
  description:
    "Quantex is a Beirut studio that builds websites that win customers, AI assistants that answer them on your website and WhatsApp, and the software and automation behind your business.",
  locale: "en_US",
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  location: CONTACT.location,
  foundingDate: "2024",
  founder: "Abbas Hachem",
  logoPath: "/quantex-logo-dark.png",
  markPath: "/quantex-mark-dark.png",
  social: {
    instagram: CONTACT.instagram,
    linkedin: CONTACT.linkedin,
  },
} as const;

export const DEFAULT_OG_IMAGE = "/og.png";
