import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site";
import { AI_ARTICLE_PATH } from "@/lib/site/ai-in-lebanon";
import {
  AI_ARTICLE_AR_PATH,
  AR_ARTICLE,
  AR_ARTICLE_FAQ,
  AR_ARTICLE_SECTIONS,
} from "@/lib/site/ai-in-lebanon-ar";
import { AI_SOLUTIONS_AR_PATH } from "@/lib/site/ai-solutions-ar";
import { CONTACT } from "@/lib/site/contact";
import { LEBANON_PATH } from "@/lib/site/lebanon";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: AR_ARTICLE.seoTitle,
  description: AR_ARTICLE.description,
  path: AI_ARTICLE_AR_PATH,
  locale: "ar_LB",
  languages: {
    en: absoluteUrl(AI_ARTICLE_PATH),
    ar: absoluteUrl(AI_ARTICLE_AR_PATH),
    "x-default": absoluteUrl(AI_ARTICLE_PATH),
  },
  keywords: [
    "الذكاء الاصطناعي في لبنان",
    "الذكاء الاصطناعي للشركات اللبنانية",
    "روبوت دردشة واتساب لبنان",
    "أتمتة الأعمال",
  ],
});

const BODY =
  "text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.9]";

export default function AiInLebanonArticleAr() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${absoluteUrl(AI_ARTICLE_AR_PATH)}#article`,
            headline: AR_ARTICLE.title,
            description: AR_ARTICLE.description,
            datePublished: AR_ARTICLE.datePublished,
            dateModified: AR_ARTICLE.dateModified,
            mainEntityOfPage: absoluteUrl(AI_ARTICLE_AR_PATH),
            image: absoluteUrl("/og.png"),
            author: { "@id": `${getSiteUrl()}/#founder` },
            publisher: { "@id": `${getSiteUrl()}/#organization` },
            inLanguage: "ar",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-answer"],
            },
          },
          buildFaqPageSchema([...AR_ARTICLE_FAQ]),
          buildBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "حلول الذكاء الاصطناعي", path: AI_SOLUTIONS_AR_PATH },
            { name: "الذكاء الاصطناعي في لبنان", path: AI_ARTICLE_AR_PATH },
          ]),
        ]}
      />
      <article lang="ar" dir="rtl" className="about-page page-shell rtl-page">
        <div className="page-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={AI_SOLUTIONS_AR_PATH}
              data-interactive
              className="page-back"
            >
              → حلول الذكاء الاصطناعي
            </Link>
            <Link
              href={AI_ARTICLE_PATH}
              hrefLang="en"
              lang="en"
              dir="ltr"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              English
            </Link>
          </div>

          <header className="mt-8 sm:mt-10">
            <PageEyebrow>دليل</PageEyebrow>
            <h1 className="alu-display page-title page-title--sm mt-4">
              {AR_ARTICLE.title}
            </h1>
            <p className="mt-4 text-sm text-foreground/70">
              بقلم عباس هاشم ·{" "}
              <time dateTime={AR_ARTICLE.datePublished}>
                {AR_ARTICLE.displayDate}
              </time>{" "}
              · {AR_ARTICLE.readingTime}
            </p>
          </header>

          <p className={`aeo-answer alu-glass page-panel mt-8 ${BODY}`}>
            {AR_ARTICLE.summary}
          </p>

          <nav aria-label="المحتويات" className="mt-8">
            <p className="page-label">في هذا الدليل</p>
            <ol className="mt-3 space-y-1 text-sm">
              {AR_ARTICLE_SECTIONS.map((section) => (
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

          {AR_ARTICLE_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mt-14 scroll-mt-24 sm:mt-16"
              aria-labelledby={`${section.id}-h`}
            >
              <h2 id={`${section.id}-h`} className="alu-display page-h2">
                {section.heading}
              </h2>
              <div className={`mt-5 space-y-4 ${BODY}`}>
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
                      <p className="mt-2 text-[0.95rem] leading-[1.9] text-foreground/80">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="faq-section mt-14 sm:mt-16" aria-labelledby="ar-art-faq">
            <h2 id="ar-art-faq" className="alu-display page-h2">
              إجابات سريعة
            </h2>
            <dl className="mt-5 space-y-4">
              {AR_ARTICLE_FAQ.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-foreground">{item.question}</dt>
                  <dd className="mt-1 leading-[1.9] text-foreground/80">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="alu-glass mt-16 px-5 py-10 text-center sm:px-10">
            <h2 className="alu-display page-h2">هل تريد أن نناقش الأمر؟</h2>
            <p className="mx-auto mt-3 max-w-md leading-[1.9] text-foreground/80">
              أخبرنا ما الذي يُبطئ عملك. نردّ خلال 24 ساعة.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
                ابدأ مشروعك
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary w-full max-w-xs sm:w-auto"
              >
                راسلنا على واتساب
              </a>
            </div>
            <p className="mt-5 text-sm text-foreground/70">
              أو تعرّف على{" "}
              <Link href={LEBANON_PATH.ar} className="font-semibold underline underline-offset-4">
                حلول الذكاء الاصطناعي للشركات في لبنان
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
