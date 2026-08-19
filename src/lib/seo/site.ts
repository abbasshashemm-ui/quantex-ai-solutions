import { COMPANY, CONTACT, SITE_URL } from "@/lib/site/contact";
import { PRODUCT } from "@/lib/site/product";

/**
 * Canonical origin for metadata, sitemap, robots, and JSON-LD.
 * Preview `VERCEL_URL` / `*.vercel.app` hosts must never leak into public URLs.
 */
export function getSiteUrl(): string {
  return SITE_URL.replace(/\/$/, "");
}

export const SITE = {
  name: COMPANY.name,
  tagline: COMPANY.tagline,
  description: `${PRODUCT.name} is ${PRODUCT.priceLabel}. Quantex AI Solutions also builds high-converting websites, custom software, and automation for teams that ship.`,
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
