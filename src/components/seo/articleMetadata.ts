import type { Metadata } from "next";
import { articlePath, type Lang } from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { SITE, getSiteUrl } from "@/lib/seo/site";
import { AI_SOLUTIONS_PATH } from "@/lib/site/ai-solutions";
import { AI_SOLUTIONS_AR_PATH } from "@/lib/site/ai-solutions-ar";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";

export function buildArticleMetadata(lang: Lang, article: Article): Metadata {
  const path = articlePath(lang, article.slug);
  return {
    ...createPageMetadata({
      title: article.seoTitle,
      description: article.description,
      path,
      locale: lang === "ar" ? "ar_LB" : undefined,
      languages: {
        en: absoluteUrl(articlePath("en", article.slug)),
        ar: absoluteUrl(articlePath("ar", article.slug)),
        "x-default": absoluteUrl(articlePath("en", article.slug)),
      },
      keywords: article.keywords,
    }),
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      siteName: SITE.name,
      locale: lang === "ar" ? "ar_LB" : "en_US",
      title: article.seoTitle,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [SITE.founder],
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630 }],
    },
  };
}

export function buildArticleSchemas(lang: Lang, article: Article) {
  const path = articlePath(lang, article.slug);
  const rtl = lang === "ar";
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${absoluteUrl(path)}#article`,
      headline: article.title,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      mainEntityOfPage: absoluteUrl(path),
      image: absoluteUrl("/og.png"),
      author: { "@id": `${getSiteUrl()}/#founder` },
      publisher: { "@id": `${getSiteUrl()}/#organization` },
      inLanguage: lang,
      speakable: { "@type": "SpeakableSpecification", cssSelector: [".aeo-answer"] },
    },
    buildFaqPageSchema(article.faq),
    buildBreadcrumbSchema([
      { name: rtl ? "الرئيسية" : "Home", path: "/" },
      { name: rtl ? "حلول الذكاء الاصطناعي" : "AI Solutions", path: rtl ? AI_SOLUTIONS_AR_PATH : AI_SOLUTIONS_PATH },
      { name: article.title, path },
    ]),
  ];
}
