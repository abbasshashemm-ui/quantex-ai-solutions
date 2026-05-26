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
    "Quantex AI Solutions builds custom software, high-converting websites, intelligent chatbots, and business automation for companies in Lebanon and worldwide.",
  locale: "en_US",
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  location: CONTACT.location,
  foundingDate: "2024",
  founder: "Abbas Hachem",
  logoPath: "/quantex-logo.png",
  markPath: "/quantex-mark-reference.png",
  social: {
    instagram: CONTACT.instagram,
  },
} as const;

export const DEFAULT_OG_IMAGE = "/quantex-logo.png";
