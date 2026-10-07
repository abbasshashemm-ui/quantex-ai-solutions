import Link from "next/link";
import { ArticleFigure } from "@/components/figures/ArticleFigure";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { getArticleFigure } from "@/lib/figures/data";
import { SITE } from "@/lib/seo/site";
import {
  articlePath,
  getArticleListing,
  INSIGHTS_PATH,
  type Lang,
} from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import { AI_SOLUTIONS_PATH } from "@/lib/site/ai-solutions";
import { AI_SOLUTIONS_AR_PATH } from "@/lib/site/ai-solutions-ar";
import { CONTACT } from "@/lib/site/contact";
import { LEBANON_PATH } from "@/lib/site/lebanon";

const UI = {
  en: {
    back: "← AI Solutions",
    switchLabel: "العربية",
    eyebrow: "Guide",
    by: `By ${SITE.founder}`,
    contents: "Contents",
    inGuide: "In this guide",
    quick: "Quick answers",
    ctaTitle: "Want to talk it through?",
    ctaLead: "Tell us what slows your business down. We reply within 24 hours.",
    start: "Start a project",
    whatsapp: "Chat on WhatsApp",
    lebanonLead: "Or see our",
    lebanon: "AI solutions for businesses in Lebanon",
    more: "More guides",
    all: "All guides",
    body: "sm:leading-[1.75]",
  },
  ar: {
    back: "→ حلول الذكاء الاصطناعي",
    switchLabel: "English",
    eyebrow: "دليل",
    by: "بقلم عباس هاشم",
    contents: "المحتويات",
    inGuide: "في هذا الدليل",
    quick: "إجابات سريعة",
    ctaTitle: "هل تريد أن نناقش الأمر؟",
    ctaLead: "أخبرنا ما الذي يُبطئ عملك. نردّ خلال 24 ساعة.",
    start: "ابدأ مشروعك",
    whatsapp: "راسلنا على واتساب",
    lebanonLead: "أو تعرّف على",
    lebanon: "حلول الذكاء الاصطناعي للشركات في لبنان",
    more: "أدلة أخرى",
    all: "كل الأدلة",
    body: "sm:leading-[1.9]",
  },
} as const;

type Props = { lang: Lang; article: Article };

export function ArticleView({ lang, article }: Props) {
  const t = UI[lang];
  const rtl = lang === "ar";
  const other: Lang = rtl ? "en" : "ar";
  const bodyClass = `text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] ${t.body}`;
  const figure = getArticleFigure(lang, article.slug);
  const related = getArticleListing(lang).filter(
    (item) => item.href !== articlePath(lang, article.slug),
  );

  return (
    <article
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className={`about-page page-shell${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={rtl ? AI_SOLUTIONS_AR_PATH : AI_SOLUTIONS_PATH}
            data-interactive
            className="page-back"
          >
            {t.back}
          </Link>
          <Link
            href={articlePath(other, article.slug)}
            hrefLang={other}
            lang={other}
            dir={rtl ? "ltr" : "rtl"}
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {t.switchLabel}
          </Link>
        </div>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>{t.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-foreground/70">
            {t.by} ·{" "}
            <time dateTime={article.datePublished}>{article.displayDate}</time>{" "}
            · {article.readingTime}
          </p>
        </header>

        <p className={`aeo-answer alu-glass page-panel mt-8 ${bodyClass}`}>
          {article.summary}
        </p>

        <nav aria-label={t.contents} className="mt-8">
          <p className="page-label">{t.inGuide}</p>
          <ol className="mt-3 space-y-1 text-sm">
            {figure?.after === "top" ? (
          <div className="mt-10">
            <ArticleFigure lang={lang} data={figure.data} />
          </div>
        ) : null}

        {article.sections.map((section) => (
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

        {article.sections.map((section) => (
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
            {section.paragraphs.length ? (
              <div className={`mt-5 space-y-4 ${bodyClass}`}>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}
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
              <ArticleFigure lang={lang} data={figure.data} />
            </div>
          ) : null}
          </div>
        ))}

        <section className="faq-section mt-14 sm:mt-16" aria-labelledby="art-faq">
          <h2
            id="art-faq"
            className="alu-display page-h2 text-[clamp(1.75rem,4vw,2.5rem)]"
          >
            {t.quick}
          </h2>
          <dl className="mt-5 space-y-4">
            {article.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-foreground">{item.question}</dt>
                <dd className="mt-1 leading-relaxed text-foreground/80">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="alu-glass mt-16 px-5 py-10 text-center sm:px-10">
          <h2 className="alu-display text-[clamp(2rem,5vw,3rem)]">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-foreground/80">{t.ctaLead}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              {t.start}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {t.whatsapp}
            </a>
          </div>
          <p className="mt-5 text-sm text-foreground/70">
            {t.lebanonLead}{" "}
            <Link
              href={LEBANON_PATH[lang]}
              className="font-semibold underline underline-offset-4"
            >
              {t.lebanon}
            </Link>
            .
          </p>
        </section>

        <section className="mt-14" aria-labelledby="more-guides">
          <h2 id="more-guides" className="page-label">
            {t.more}
          </h2>
          <ul className="mt-3 space-y-1">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-interactive
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={INSIGHTS_PATH[lang]}
                data-interactive
                className="inline-flex min-h-11 items-center text-sm text-foreground/80 underline underline-offset-4"
              >
                {t.all}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
