import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import {
  AR_ANSWER,
  AR_BENEFITS,
  AR_CTA,
  AR_FAQ,
  AR_HERO,
  AR_LEBANON,
  AR_STEPS,
  AR_USE_CASES,
  AR_WORLDWIDE,
} from "@/lib/site/ai-solutions-ar";
import { AI_ARTICLE_AR_PATH } from "@/lib/site/ai-in-lebanon-ar";
import { CONTACT } from "@/lib/site/contact";

const BODY =
  "text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.9]";

export function AiSolutionsPageContentAr() {
  return (
    <article
      id="ai-solutions-page-ar"
      lang="ar"
      dir="rtl"
      className="about-page page-shell rtl-page"
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-interactive className="page-back">
            → الرئيسية
          </Link>
          <Link
            href="/ai-solutions"
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
          <PageEyebrow>{AR_HERO.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4 max-w-4xl">
            {AR_HERO.title}
          </h1>
          <p className="alu-lede max-w-2xl">{AR_HERO.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
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
        </header>

        <section
          className="aeo-answer alu-glass page-panel mt-14 sm:mt-20"
          aria-labelledby="ar-answer-heading"
        >
          <h2
            id="ar-answer-heading"
            className="text-lg font-semibold text-foreground sm:text-xl"
          >
            {AR_ANSWER.question}
          </h2>
          <p className={`mt-3 max-w-3xl ${BODY}`}>{AR_ANSWER.answer}</p>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="ar-use-cases">
          <PageEyebrow>ما يستطيعه الذكاء الاصطناعي</PageEyebrow>
          <h2 id="ar-use-cases" className="alu-display page-h2 mt-3 max-w-2xl">
            أين يمكن للذكاء الاصطناعي أن يساعد عملك؟
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {AR_USE_CASES.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-foreground/80">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  data-interactive
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  اعرف المزيد
                  <span className="sr-only">: {item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="ar-benefits">
          <PageEyebrow>العائد</PageEyebrow>
          <h2 id="ar-benefits" className="alu-display page-h2 mt-3 max-w-2xl">
            كيف يرتقي الذكاء الاصطناعي بطريقة عملك؟
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {AR_BENEFITS.map((item, index) => (
              <li key={item.title} className="alu-glass page-panel">
                <span className="page-label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="alu-display mt-3 text-[1.5rem] sm:text-[1.8rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="ar-lebanon">
          <PageEyebrow>{AR_LEBANON.eyebrow}</PageEyebrow>
          <h2 id="ar-lebanon" className="alu-display page-h2 mt-3 max-w-3xl">
            {AR_LEBANON.title}
          </h2>
          <p className="alu-lede max-w-2xl">{AR_LEBANON.lead}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {AR_LEBANON.points.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="ar-worldwide">
          <PageEyebrow>{AR_WORLDWIDE.eyebrow}</PageEyebrow>
          <h2 id="ar-worldwide" className="alu-display page-h2 mt-3 max-w-3xl">
            {AR_WORLDWIDE.title}
          </h2>
          <p className={`mt-6 max-w-3xl ${BODY}`}>{AR_WORLDWIDE.body}</p>
          <p className="mt-6">
            <Link
              href={AI_ARTICLE_AR_PATH}
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              اقرأ: الذكاء الاصطناعي في لبنان، دليل عملي للشركات ←
            </Link>
            {" · "}
            <Link
              href="/ar/insights"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              كل الأدلة
            </Link>
          </p>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="ar-process">
          <PageEyebrow>كيف نعمل</PageEyebrow>
          <h2 id="ar-process" className="alu-display page-h2 mt-3 max-w-2xl">
            كيف نبدأ؟
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AR_STEPS.map((step, index) => (
              <li key={step.label} className="alu-glass page-panel">
                <span className="page-label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {step.label}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.9] text-foreground/80">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="faq-section mt-20 sm:mt-28"
          aria-labelledby="ar-faq"
        >
          <PageEyebrow>أسئلة</PageEyebrow>
          <h2 id="ar-faq" className="alu-display page-h2 mt-3 max-w-2xl">
            حلول الذكاء الاصطناعي: أسئلة شائعة
          </h2>
          <ul className="mt-8 max-w-3xl space-y-3">
            {AR_FAQ.map((item) => (
              <li key={item.question}>
                <details className="faq-item faq-card alu-glass group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-[1.0625rem]">
                      {item.question}
                    </h3>
                    <span
                      className="text-xl leading-none transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className={`faq-card__answer px-4 pb-4 pt-3 sm:px-5 sm:pb-5 ${BODY}`}
                  >
                    {item.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__cta alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
          <p className="page-label">{AR_CTA.eyebrow}</p>
          <h2 className="alu-display page-h2 mx-auto mt-3 max-w-3xl">
            {AR_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-[1.9] text-foreground/80">
            {AR_CTA.lead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
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
        </section>
      </div>
    </article>
  );
}
