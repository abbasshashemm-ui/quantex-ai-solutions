import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFigure } from "@/components/figures/ArticleFigure";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticleFigure } from "@/lib/figures/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { SITE, getSiteUrl } from "@/lib/seo/site";
import {
  AI_ARTICLE,
  AI_ARTICLE_FAQ,
  AI_ARTICLE_PATH,
  AI_ARTICLE_SECTIONS,
} from "@/lib/site/ai-in-lebanon";
import { AI_ARTICLE_AR_PATH } from "@/lib/site/ai-in-lebanon-ar";
import { AI_SOLUTIONS_PATH } from "@/lib/site/ai-solutions";
import { CONTACT } from "@/lib/site/contact";
import { LEBANON_PATH } from "@/lib/site/lebanon";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: AI_ARTICLE.seoTitle,
    description: AI_ARTICLE.description,
    path: AI_ARTICLE_PATH,
    languages: {
      en: absoluteUrl(AI_ARTICLE_PATH),
      ar: absoluteUrl(AI_ARTICLE_AR_PATH),
      "x-default": absoluteUrl(AI_ARTICLE_PATH),
    },
    keywords: [
      "AI in Lebanon",
      "AI Lebanon",
      "artificial intelligence Lebanon",
      "AI for business Lebanon",
      "WhatsApp chatbot Lebanon",
    ],
  }),
  openGraph: {
    type: "article",
    url: absoluteUrl(AI_ARTICLE_PATH),
    siteName: SITE.name,
    title: AI_ARTICLE.seoTitle,
    description: AI_ARTICLE.description,
    publishedTime: AI_ARTICLE.datePublished,
    modifiedTime: AI_ARTICLE.dateModified,
    authors: [SITE.founder],
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630 }],
  },
};

export default function AiInLebanonArticle() {
  const figure = getArticleFigure("en", "ai-in-lebanon");
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${absoluteUrl(AI_ARTICLE_PATH)}#article`,
            headline: AI_ARTICLE.title,
            description: AI_ARTICLE.description,
            datePublished: AI_ARTICLE.datePublished,
            dateModified: AI_ARTICLE.dateModified,
            mainEntityOfPage: absoluteUrl(AI_ARTICLE_PATH),
            image: absoluteUrl("/og.png"),
            author: { "@id": `${getSiteUrl()}/#founder` },
            publisher: { "@id": `${getSiteUrl()}/#organization` },
            inLanguage: "en",
            about: ["Artificial intelligence", "Lebanon", "Business automation"],
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-answer"],
            },
          },
          buildFaqPageSchema([...AI_ARTICLE_FAQ]),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Solutions", path: AI_SOLUTIONS_PATH },
            { name: "AI in Lebanon", path: AI_ARTICLE_PATH },
          ]),
        ]}
      />
      <article className="about-page page-shell">
        <div className="page-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <Link href={AI_SOLUTIONS_PATH} data-interactive className="page-back">
              ← AI Solutions
            </Link>
            <Link
              href={AI_ARTICLE_AR_PATH}
              hrefLang="ar"
              lang="ar"
              dir="rtl"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              العربية
            </Link>
          </div>

          <header className="mt-8 sm:mt-10">
            <PageEyebrow>Guide</PageEyebrow>
            <h1 className="alu-display page-title page-title--sm mt-4">
              {AI_ARTICLE.title}
            </h1>
            <p className="mt-4 text-sm text-foreground/70">
              By {SITE.founder} ·{" "}
              <time dateTime={AI_ARTICLE.datePublished}>October 7, 2026</time>{" "}
              · {AI_ARTICLE.readingTime}
            </p>
          </header>

          <p className="aeo-answer alu-glass page-panel mt-8 text-base leading-relaxed text-foreground/90 sm:text-[1.0625rem] sm:leading-[1.75]">
            {AI_ARTICLE.summary}
          </p>

          <nav aria-label="Contents" className="mt-8">
            <p className="page-label">In this guide</p>
            <ol className="mt-3 space-y-1 text-sm">
              {AI_ARTICLE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-11 items-center text-foreground/80 underline underline-offset-4 hover:text-foreground"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {AI_ARTICLE_SECTIONS.map((section) => (
            <div key={section.id}>
            <section
              id={section.id}
              className="mt-14 scroll-mt-24 sm:mt-16"
              aria-labelledby={`${section.id}-h`}
            >
              <h2
                id={`${section.id}-h`}
                className="alu-display page-h2 text-[clamp(1.75rem,4vw,2.5rem)]"
              >
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.75]">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {section.list ? (
                <ul className="mt-6 space-y-4">
                  {section.list.map((item) => (
                    <li key={item.title} className="alu-glass page-panel">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
            {figure?.after === section.id ? (
              <div className="mt-8">
                <ArticleFigure lang="en" data={figure.data} />
              </div>
            ) : null}
            </div>
          ))}

          <section className="faq-section mt-14 sm:mt-16" aria-labelledby="art-faq">
            <h2 id="art-faq" className="alu-display page-h2 text-[clamp(1.75rem,4vw,2.5rem)]">
              Quick answers
            </h2>
            <dl className="mt-5 space-y-4">
              {AI_ARTICLE_FAQ.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-foreground">{item.question}</dt>
                  <dd className="mt-1 text-foreground/80">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="alu-glass mt-16 px-5 py-10 text-center sm:px-10">
            <h2 className="alu-display text-[clamp(2rem,5vw,3rem)]">
              Want to talk it through?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-foreground/80">
              Tell us what slows your business down. We reply within 24 hours.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
                Start a project
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary w-full max-w-xs sm:w-auto"
              >
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-5 text-sm text-foreground/70">
              Or see our{" "}
              <Link href={AI_SOLUTIONS_PATH} className="font-semibold underline underline-offset-4">
                AI solutions
              </Link>{" "}
              and how we work with{" "}
              <Link href={LEBANON_PATH.en} className="font-semibold underline underline-offset-4">
                businesses in Lebanon
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
