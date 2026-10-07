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

export type ListedGuide = {
  slug: string;
  title: string;
  description: string;
  href: string;
  readingTime: string;
};

/** Every article (including the standalone AI in Lebanon guide) for index pages. */
export function getArticleListing(lang: Lang): ListedGuide[] {
  const guide: ListedGuide =
    lang === "ar"
      ? { slug: "ai-in-lebanon", title: AR_ARTICLE.title, description: AR_ARTICLE.description, href: AI_ARTICLE_AR_PATH, readingTime: AR_ARTICLE.readingTime }
      : { slug: "ai-in-lebanon", title: AI_ARTICLE.title, description: AI_ARTICLE.description, href: AI_ARTICLE_PATH, readingTime: AI_ARTICLE.readingTime };
  return [
    guide,
    ...getArticles(lang).map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
      href: articlePath(lang, a.slug),
      readingTime: a.readingTime,
    })),
  ];
}

const GROUPS = [
  {
    id: "business",
    label: { en: "AI for your business", ar: "الذكاء الاصطناعي لعملك" },
    blurb: { en: "Where to start, and how to choose a partner.", ar: "من أين تبدأ وكيف تختار شريكاً." },
    slugs: ["ai-in-lebanon", "how-to-choose-ai-solutions-provider-lebanon"],
  },
  {
    id: "industries",
    label: { en: "Guides by industry", ar: "أدلة حسب القطاع" },
    blurb: { en: "What AI does for restaurants, clinics and real estate.", ar: "ما يفعله الذكاء الاصطناعي للمطاعم والعيادات والعقارات." },
    slugs: ["ai-for-restaurants-lebanon", "ai-for-clinics-lebanon", "ai-for-real-estate-lebanon"],
  },
  {
    id: "search",
    label: { en: "Be found: SEO and AI search", ar: "كن ظاهراً: SEO والبحث بالذكاء الاصطناعي" },
    blurb: { en: "Get found on Google and in ChatGPT, Gemini and Perplexity.", ar: "كن ظاهراً في غوغل وفي ChatGPT وGemini وPerplexity." },
    slugs: ["seo-aeo-geo-explained", "get-recommended-by-chatgpt-and-ai-search", "search-visibility-checklist"],
  },
] as const;

export type GuideGroup = { id: string; label: string; blurb: string; items: ListedGuide[] };

/** Guides grouped by topic. Any guide not placed in a group lands in "More guides", so none is lost. */
export function getGuideGroups(lang: Lang): GuideGroup[] {
  const all = getArticleListing(lang);
  const used = new Set<string>();
  const groups: GuideGroup[] = GROUPS.map((group) => {
    const items = group.slugs.flatMap((slug) => all.filter((g) => g.slug === slug));
    items.forEach((g) => used.add(g.slug));
    return { id: group.id, label: group.label[lang], blurb: group.blurb[lang], items };
  });
  const rest = all.filter((g) => !used.has(g.slug));
  if (rest.length) {
    groups.push({
      id: "more",
      label: lang === "ar" ? "أدلة أخرى" : "More guides",
      blurb: "",
      items: rest,
    });
  }
  return groups;
}
