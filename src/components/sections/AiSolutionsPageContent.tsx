import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import {
  AI_BENEFITS,
  AI_LEBANON,
  AI_SOLUTIONS_ANSWER,
  AI_SOLUTIONS_CTA,
  AI_SOLUTIONS_FAQ,
  AI_SOLUTIONS_HERO,
  AI_STEPS,
  AI_USE_CASES,
  AI_WORLDWIDE,
} from "@/lib/site/ai-solutions";
import { CONTACT } from "@/lib/site/contact";

export function AiSolutionsPageContent() {
  return (
    <article id="ai-solutions-page" className="about-page page-shell">
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-interactive className="page-back">
            ← Home
          </Link>
          <Link
            href="/ar/ai-solutions"
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
          <PageEyebrow>{AI_SOLUTIONS_HERO.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4 max-w-4xl">
            {AI_SOLUTIONS_HERO.title}
          </h1>
          <p className="alu-lede max-w-2xl">{AI_SOLUTIONS_HERO.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
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
        </header>

        <section
          className="aeo-answer alu-glass page-panel mt-14 sm:mt-20"
          aria-labelledby="ai-answer-heading"
        >
          <h2
            id="ai-answer-heading"
            className="text-lg font-semibold text-foreground sm:text-xl"
          >
            {AI_SOLUTIONS_ANSWER.question}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.75]">
            {AI_SOLUTIONS_ANSWER.answer}
          </p>
        </section>

        <section
          className="mt-20 sm:mt-28"
          aria-labelledby="ai-use-cases-heading"
        >
          <PageEyebrow>What AI can do</PageEyebrow>
          <h2
            id="ai-use-cases-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            Where can AI help your business?
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {AI_USE_CASES.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                  {item.body}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    data-interactive
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
                  >
                    Learn more
                    <span className="sr-only">: {item.title}</span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mt-20 sm:mt-28"
          aria-labelledby="ai-benefits-heading"
        >
          <PageEyebrow>The payoff</PageEyebrow>
          <h2
            id="ai-benefits-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            How does AI elevate the way you work?
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {AI_BENEFITS.map((item, index) => (
              <li key={item.title} className="alu-glass page-panel">
                <span className="page-label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="alu-display mt-3 text-[1.6rem] sm:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="mt-20 sm:mt-28"
          aria-labelledby="ai-lebanon-heading"
        >
          <PageEyebrow>{AI_LEBANON.eyebrow}</PageEyebrow>
          <h2
            id="ai-lebanon-heading"
            className="alu-display page-h2 mt-3 max-w-3xl"
          >
            {AI_LEBANON.title}
          </h2>
          <p className="alu-lede max-w-2xl">{AI_LEBANON.lead}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {AI_LEBANON.points.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mt-20 sm:mt-28"
          aria-labelledby="ai-worldwide-heading"
        >
          <PageEyebrow>{AI_WORLDWIDE.eyebrow}</PageEyebrow>
          <h2
            id="ai-worldwide-heading"
            className="alu-display page-h2 mt-3 max-w-3xl"
          >
            {AI_WORLDWIDE.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.75]">
            {AI_WORLDWIDE.body}
          </p>
          <p className="mt-6">
            <Link
              href="/ai-solutions-lebanon"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              AI solutions in Lebanon
            </Link>
            {" · "}
            <Link
              href="/insights/ai-in-lebanon"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              Read: AI in Lebanon, a practical guide for businesses →
            </Link>
            {" · "}
            <Link
              href="/insights"
              data-interactive
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              All guides
            </Link>
          </p>
        </section>

        <section
          className="mt-20 sm:mt-28"
          aria-labelledby="ai-process-heading"
        >
          <PageEyebrow>How it works</PageEyebrow>
          <h2
            id="ai-process-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            How do we start?
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AI_STEPS.map((step, index) => (
              <li key={step.label} className="alu-glass page-panel">
                <span className="page-label">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {step.label}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="faq-section mt-20 sm:mt-28"
          aria-labelledby="ai-faq-heading"
        >
          <PageEyebrow>Questions</PageEyebrow>
          <h2
            id="ai-faq-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            AI solutions: common questions
          </h2>
          <ul className="mt-8 max-w-3xl space-y-3">
            {AI_SOLUTIONS_FAQ.map((item) => (
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
                  <div className="faq-card__answer px-4 pb-4 pt-3 text-base leading-[1.7] sm:px-5 sm:pb-5">
                    {item.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__cta alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
          <p className="page-label">{AI_SOLUTIONS_CTA.eyebrow}</p>
          <h2 className="alu-display mx-auto mt-3 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)]">
            {AI_SOLUTIONS_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
            {AI_SOLUTIONS_CTA.lead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              Start a project
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              Message us on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
