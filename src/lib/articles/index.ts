import { AI_ARTICLE, AI_ARTICLE_PATH } from "@/lib/site/ai-in-lebanon";
import { AR_ARTICLE, AI_ARTICLE_AR_PATH } from "@/lib/site/ai-in-lebanon-ar";
import { INDUSTRY_ARTICLES_AR } from "./industry-ar";
import { INDUSTRY_ARTICLES_EN } from "./industry-en";
import type { Article } from "./types";

export type Lang = "en" | "ar";

export const INSIGHTS_PATH = { en: "/insights", ar: "/ar/insights" } as const;

export function articlePath(lang: Lang, slug: string): string {
  return `${INSIGHTS_PATH[lang]}/${slug}`;
}

export function getIndustryArticles(lang: Lang): Article[] {
  return lang === "ar" ? INDUSTRY_ARTICLES_AR : INDUSTRY_ARTICLES_EN;
}

export function getIndustryArticle(lang: Lang, slug: string): Article | undefined {
  return getIndustryArticles(lang).find((a) => a.slug === slug);
}

export function getIndustrySlugs(): string[] {
  return INDUSTRY_ARTICLES_EN.map((a) => a.slug);
}

/** Every article (including the standalone AI in Lebanon guide) for index pages. */
export function getArticleListing(lang: Lang) {
  const guide =
    lang === "ar"
      ? { title: AR_ARTICLE.title, description: AR_ARTICLE.description, href: AI_ARTICLE_AR_PATH }
      : { title: AI_ARTICLE.title, description: AI_ARTICLE.description, href: AI_ARTICLE_PATH };
  return [
    guide,
    ...getIndustryArticles(lang).map((a) => ({
      title: a.title,
      description: a.description,
      href: articlePath(lang, a.slug),
    })),
  ];
}
