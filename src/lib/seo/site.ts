import { COMPANY, CONTACT, SITE_URL } from "@/lib/site/contact";

/**
 * The address search engines should see for this site.
 *
 * Production always uses the canonical domain (SITE_URL). It must never fall
 * back to Vercel's per-deployment address (*.vercel.app): the sitemap,
 * robots.txt and every canonical tag are built from this, and Google rejects a
 * sitemap whose addresses are not on the site it was submitted for.
 * Previews use their own address, and local builds use SITE_URL.
 */
export function getSiteUrl(): string {
  const canonical = SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return canonical;

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const previewHost = process.env.VERCEL_URL;
  if (process.env.VERCEL_ENV === "preview" && previewHost) {
    return `https://${previewHost}`;
  }

  return canonical;
}

export const SITE = {
  name: COMPANY.name,
  tagline: COMPANY.tagline,
  description:
    "Quantex is a Beirut studio building websites that win customers, AI assistants for your website and WhatsApp, and the software behind your business.",
  locale: "en_US",
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  location: CONTACT.location,
  founder: "Abbas Hachem",
  logoPath: "/quantex-logo-dark.png",
  markPath: "/quantex-mark-dark.png",
  social: {
    instagram: CONTACT.instagram,
    linkedin: CONTACT.linkedin,
  },
} as const;

export const DEFAULT_OG_IMAGE = "/og.png";
