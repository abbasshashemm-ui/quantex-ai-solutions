import { getArticles } from "@/lib/articles";
import { SERVICES } from "@/lib/services/data";
import { AI_ARTICLE, AI_ARTICLE_PATH } from "@/lib/site/ai-in-lebanon";
import { EACML, EACML_PATH } from "@/lib/projects/eacml";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/site";

export type OgPage = { eyebrow: string; title: string };

export function ogKeyFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
}

function buildPages(): Record<string, OgPage> {
  const pages: Record<string, OgPage> = {
    home: { eyebrow: "Beirut · AI studio", title: "Websites and AI assistants that win customers" },
    pricing: { eyebrow: "Pricing", title: "Clear prices for websites, SEO and AI assistants" },
    "site-check": { eyebrow: "Free tool", title: "Can customers and AI find your website?" },
    "ai-solutions": { eyebrow: "AI solutions", title: "AI solutions for businesses in Lebanon and worldwide" },
    "ai-solutions-lebanon": { eyebrow: "AI in Lebanon", title: "AI chatbots, automation and custom AI across Lebanon" },
    insights: { eyebrow: "Guides", title: "AI and search guides for your business" },
    about: { eyebrow: "About", title: "A Beirut studio you can message directly" },
    contact: { eyebrow: "Contact", title: "Tell us what you need" },
    [ogKeyFromPath(EACML_PATH)]: { eyebrow: "Flagship project", title: EACML.title },
    [ogKeyFromPath(AI_ARTICLE_PATH)]: { eyebrow: "Guide", title: AI_ARTICLE.title },
  };
  for (const service of SERVICES) {
    pages[ogKeyFromPath(`/services/${service.slug}`)] = {
      eyebrow: "Service",
      title: service.nav.label,
    };
  }
  for (const article of getArticles("en")) {
    pages[ogKeyFromPath(`/insights/${article.slug}`)] = {
      eyebrow: "Guide",
      title: article.title,
    };
  }
  return pages;
}

let cache: Record<string, OgPage> | undefined;
export function getOgPages(): Record<string, OgPage> {
  return (cache ??= buildPages());
}

/** Share image for an English page path, or the default image if none. */
export function ogImageForPath(path: string): string {
  const key = ogKeyFromPath(path);
  return getOgPages()[key] ? `/og/${key}` : DEFAULT_OG_IMAGE;
}
