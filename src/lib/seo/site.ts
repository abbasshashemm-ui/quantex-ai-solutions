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
    "Quantex AI Solutions builds high-converting websites, AI chatbots, custom software, and automation—plus technical SEO and Core Web Vitals—for teams that ship.",
  locale: "en_US",
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  location: CONTACT.location,
  foundingDate: "2024",
  founder: "Abbas Hachem",
  logoPath: "/quantex-logo.png",
  markPath: "/quantex-mark.png",
  social: {
    instagram: CONTACT.instagram,
    linkedin: CONTACT.linkedin,
  },
} as const;

export const DEFAULT_OG_IMAGE = "/quantex-logo.png";
