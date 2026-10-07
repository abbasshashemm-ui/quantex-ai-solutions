import { AI_ARTICLE, AI_ARTICLE_PATH } from "@/lib/site/ai-in-lebanon";
import { AR_ARTICLE, AI_ARTICLE_AR_PATH } from "@/lib/site/ai-in-lebanon-ar";
import { CHOOSE_ARTICLE_AR } from "./choose-ar";
import { CHOOSE_ARTICLE_EN } from "./choose-en";
import { INDUSTRY_ARTICLES_AR } from "./industry-ar";
import { INDUSTRY_ARTICLES_EN } from "./industry-en";
import { SEARCH_ARTICLES_AR } from "./search-ar";
import { SEARCH_ARTICLES_EN } from "./search-en";
import type { Article } from "./types";

export type Lang = "en" | "ar";

export const INSIGHTS_PATH = { en: "/insights", ar: "/ar/insights" } as const;

export function articlePath(lang: Lang, slug: string): string {
  return `${INSIGHTS_PATH[lang]}/${slug}`;
}

export function getArticles(lang: Lang): Article[] {
  return lang === "ar"
    ? [CHOOSE_ARTICLE_AR, ...INDUSTRY_ARTICLES_AR, ...SEARCH_ARTICLES_AR]
    : [CHOOSE_ARTICLE_EN, ...INDUSTRY_ARTICLES_EN, ...SEARCH_ARTICLES_EN];
}

export function getArticle(lang: Lang, slug: string): Article | undefined {
  return getArticles(lang).find((a) => a.slug === slug);
}

export function getArticleSlugs(): string[] {
  return getArticles("en").map((a) => a.slug);
}

/** Every article (including the standalone AI in Lebanon guide) for index pages. */
export function getArticleListing(lang: Lang) {
  const guide =
    lang === "ar"
      ? { title: AR_ARTICLE.title, description: AR_ARTICLE.description, href: AI_ARTICLE_AR_PATH }
      : { title: AI_ARTICLE.title, description: AI_ARTICLE.description, href: AI_ARTICLE_PATH };
  return [
    guide,
    ...getArticles(lang).map((a) => ({
      title: a.title,
      description: a.description,
      href: articlePath(lang, a.slug),
    })),
  ];
}
