import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/services/data";
import { articlePath, getIndustrySlugs } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/ai-solutions"), lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: absoluteUrl("/insights/ai-in-lebanon"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/ar/ai-solutions"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/ar/insights/ai-in-lebanon"), lastModified, changeFrequency: "monthly", priority: 0.75 },
    { url: absoluteUrl("/insights"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/ar/insights"), lastModified, changeFrequency: "weekly", priority: 0.75 },
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

  const articleRoutes: MetadataRoute.Sitemap = getIndustrySlugs().flatMap((slug) =>
    (["en", "ar"] as const).map((lang) => ({
      url: absoluteUrl(articlePath(lang, slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? 0.75 : 0.7,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
