import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/services/data";
import { articlePath, getArticleSlugs } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo/metadata";
import { SITE_CONTENT_UPDATED, toDate } from "@/lib/seo/lastmod";
import { getArticle } from "@/lib/articles";
import { AI_ARTICLE } from "@/lib/site/ai-in-lebanon";
import { AR_ARTICLE } from "@/lib/site/ai-in-lebanon-ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = toDate(SITE_CONTENT_UPDATED);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/ai-solutions"), lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: absoluteUrl("/insights/ai-in-lebanon"), lastModified: toDate(AI_ARTICLE.dateModified), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/ar/ai-solutions"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/ar/insights/ai-in-lebanon"), lastModified: toDate(AR_ARTICLE.dateModified), changeFrequency: "monthly", priority: 0.75 },
    { url: absoluteUrl("/insights"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/ar/insights"), lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: absoluteUrl("/ai-solutions-lebanon"), lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: absoluteUrl("/ar/ai-solutions-lebanon"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/work/eacml-copilot"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/pricing"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/ar/pricing"), lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticleSlugs().flatMap((slug) =>
    (["en", "ar"] as const).map((lang) => ({
      url: absoluteUrl(articlePath(lang, slug)),
      lastModified: toDate(getArticle(lang, slug)?.dateModified ?? SITE_CONTENT_UPDATED),
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? 0.75 : 0.7,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
