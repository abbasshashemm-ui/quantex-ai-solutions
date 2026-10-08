import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE, getSiteUrl } from "./site";
import { ogImageForPath } from "./og-pages";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  locale?: string;
  languages?: Record<string, string>;
};

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
  keywords = [],
  locale = SITE.locale,
  languages,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  // Arabic pages keep the default card: the generated cards have no Arabic font.
  const imageUrl = absoluteUrl(
    ogImage ?? (locale === "ar_LB" ? DEFAULT_OG_IMAGE : ogImageForPath(path)),
  );
  const pageTitle = path === "/" ? SITE.name : `${title} | ${SITE.name}`;

  return {
    ...(path === "/" ? {} : { title }),
    description,
    keywords: [
      "Quantex",
      "Quantex AI Solutions",
      "website design Lebanon",
      "AI chatbot WhatsApp",
      "business automation",
      "custom software Lebanon",
      "SEO Lebanon",
      ...keywords,
    ],
    alternates: { canonical, ...(languages ? { languages } : {}) },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      siteName: SITE.name,
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Quantex",
    "Quantex AI Solutions",
    "website design Beirut",
    "AI chatbots Beirut",
    "WhatsApp chatbot Lebanon",
    "business automation",
    "custom software Lebanon",
    "SEO Lebanon",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: SITE.name,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  authors: [{ name: SITE.founder, url: absoluteUrl("/about") }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
