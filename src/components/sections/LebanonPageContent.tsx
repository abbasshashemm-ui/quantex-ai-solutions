import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { articlePath, type Lang } from "@/lib/articles";
import { CHOOSE_SLUG } from "@/lib/articles/choose-slug";
import { CONTACT } from "@/lib/site/contact";
import { LEBANON_PATH, getLebanonContent } from "@/lib/site/lebanon";

const BODY =
  "text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.8]";
const LINK =
  "inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4";

export function LebanonPageContent({ lang }: { lang: Lang }) {
  const c = getLebanonContent(lang);
  const rtl = lang === "ar";
  const other: Lang = rtl ? "en" : "ar";

  return (
    <article
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className={`about-page page-shell${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-interactive className="page-back">
            {c.ui.home}
          </Link>
          <Link
            href={LEBANON_PATH[other]}
            hrefLang={other}
            lang={other}
            dir={rtl ? "ltr" : "rtl"}
            data-interactive
            className={LINK}
          >
            {c.ui.other}
          </Link>
        </div>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>{c.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4 max-w-4xl">
            {c.title}
          </h1>
          <p className="alu-lede max-w-2xl">{c.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
              {c.cta.start}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {c.cta.whatsapp}
            </a>
          </div>
        </header>

        <section className="aeo-answer alu-glass page-panel mt-14 sm:mt-20" aria-labelledby="leb-answer">
          <h2 id="leb-answer" className="text-lg font-semibold text-foreground sm:text-xl">
            {c.answer.question}
          </h2>
          <p className={`mt-3 max-w-3xl ${BODY}`}>{c.answer.answer}</p>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-services">
          <PageEyebrow>{c.services.eyebrow}</PageEyebrow>
          <h2 id="leb-services" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.services.title}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {c.services.items.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{item.body}</p>
                <Link href={item.href} data-interactive className={`mt-4 ${LINK}`}>
                  {c.services.more}
                  <span className="sr-only">: {item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-cities">
          <PageEyebrow>{c.cities.eyebrow}</PageEyebrow>
          <h2 id="leb-cities" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.cities.title}
          </h2>
          <p className={`mt-6 max-w-3xl ${BODY}`}>{c.cities.body}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.cities.list.map((city) => (
              <li key={city} className="alu-glass rounded-full px-4 py-2 text-sm font-semibold text-foreground">
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm text-foreground/75">{c.cities.note}</p>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-fit">
          <PageEyebrow>{c.fit.eyebrow}</PageEyebrow>
          <h2 id="leb-fit" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.fit.title}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {c.fit.items.map((item) => (
              <li key={item.title} className="alu-glass page-panel">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-industries">
          <PageEyebrow>{c.industries.eyebrow}</PageEyebrow>
          <h2 id="leb-industries" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.industries.title}
          </h2>
          <ul className="mt-6 space-y-1">
            {c.industries.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} data-interactive className={LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-steps">
          <PageEyebrow>{c.steps.eyebrow}</PageEyebrow>
          <h2 id="leb-steps" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.steps.title}
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.items.map((step, index) => (
              <li key={step.label} className="alu-glass page-panel">
                <span className="page-label">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.label}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/80">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="leb-cost">
          <PageEyebrow>{c.cost.eyebrow}</PageEyebrow>
          <h2 id="leb-cost" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.cost.title}
          </h2>
          <p className={`mt-6 max-w-3xl ${BODY}`}>{c.cost.body}</p>
          <p className="mt-4">
            <Link href={articlePath(lang, CHOOSE_SLUG)} data-interactive className={LINK}>
              {c.cost.guideLabel} {rtl ? "←" : "→"}
            </Link>
          </p>
        </section>

        <section className="faq-section mt-20 sm:mt-28" aria-labelledby="leb-faq">
          <PageEyebrow>{c.ui.faqEyebrow}</PageEyebrow>
          <h2 id="leb-faq" className="alu-display page-h2 mt-3 max-w-3xl">
            {c.faqHeading}
          </h2>
          <ul className="mt-8 max-w-3xl space-y-3">
            {c.faq.map((item) => (
              <li key={item.question}>
                <details className="faq-item faq-card alu-glass group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-[1.0625rem]">{item.question}</h3>
                    <span className="text-xl leading-none transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className={`faq-card__answer px-4 pb-4 pt-3 sm:px-5 sm:pb-5 ${BODY}`}>
                    {item.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__cta alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
          <h2 className="alu-display page-h2 mx-auto max-w-3xl">{c.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/80">{c.cta.lead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
              {c.cta.start}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {c.cta.whatsapp}
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
