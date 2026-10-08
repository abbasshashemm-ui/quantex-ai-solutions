import Link from "next/link";
import { Ticker } from "@/components/home/Ticker";
import { HeroStage } from "@/components/hero/HeroStage";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { getArticleListing, INSIGHTS_PATH } from "@/lib/articles";
import { getLocaleContent, localePath } from "@/lib/i18n";
import { EACML_AR } from "@/lib/i18n/eacml-ar";
import type { Locale } from "@/lib/i18n/types";
import { SERVICES } from "@/lib/services/data";
import { CONTACT } from "@/lib/site/contact";

const FEATURED = [
  "get-recommended-by-chatgpt-and-ai-search",
  "seo-aeo-geo-explained",
  "ai-for-restaurants-lebanon",
  "ai-for-clinics-lebanon",
  "ai-for-real-estate-lebanon",
];

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  const c = getLocaleContent(locale);
  const h = c.home;
  const rtl = c.dir === "rtl";
  const arrow = rtl ? "←" : "→";
  const guides =
    locale === "ar"
      ? getArticleListing("ar").filter(
          (g) => g.slug === "ai-in-lebanon" || FEATURED.includes(g.slug),
        )
      : [];

  return (
    <div lang={c.htmlLang} dir={c.dir} className={rtl ? "rtl-page" : undefined}>
      <HeroStage>
        <div className="alu-hero">
          <PageEyebrow>{h.hero.eyebrow}</PageEyebrow>
          <h1 className="alu-display alu-h1">
            {h.hero.headline.map((line, index) => (
              <span key={line} className="alu-h1__line" style={{ "--i": index } as React.CSSProperties}>
                {line}
              </span>
            ))}
          </h1>
          <p className="alu-lede">{h.hero.lede}</p>
          <div className="alu-ctas">
            <Link
              href={localePath(locale, "/contact")}
              data-interactive
              data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
              data-conversion-location="hero"
              className="btn-primary"
            >
              {h.hero.primary}
            </Link>
            <a href="#solutions" data-interactive className="btn-secondary">
              {h.hero.secondary}
            </a>
          </div>
          <ul className="alu-chips" aria-label={h.hero.eyebrow}>
            <li className="alu-chip">
              <span className="alu-chip__dot" aria-hidden />
              {h.hero.chips[0]}
            </li>
            <li className="alu-chip">{h.hero.chips[1]}</li>
          </ul>
        </div>

        {h.beats.map((beat, i) => (
          <div key={beat.slug} className={`alu-beat alu-beat--${i === 0 ? "one" : "two"}`}>
            <p className="alu-beat__index">{beat.index}</p>
            <h2 className="alu-display alu-beat__title">{beat.title}</h2>
            <p className="alu-lede">{beat.lede}</p>
            <Link href={localePath(locale, `/services/${beat.slug}`)} data-interactive className="alu-link">
              {beat.link} <span aria-hidden>{arrow}</span>
            </Link>
          </div>
        ))}
      </HeroStage>

      <Ticker />

      <section className="alu-section !py-8 sm:!py-10">
        <div className="alu-section__inner">
          <div data-reveal className="alu-glass flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7">
            <div className="min-w-0">
              <p className="page-label">{h.siteCheck.label}</p>
              <h2 className="alu-display mt-2 text-[1.9rem] sm:text-[2.4rem]">{h.siteCheck.title}</h2>
              <p className="mt-2 max-w-xl text-sm text-foreground/80 sm:text-base">{h.siteCheck.text}</p>
            </div>
            <Link
              href="/site-check"
              data-interactive
              data-conversion="cta_click"
              data-conversion-location="site_check_band"
              className="btn-primary w-full shrink-0 sm:w-auto"
            >
              {h.siteCheck.button}
            </Link>
          </div>
        </div>
      </section>

      <section className="aeo-block alu-section" aria-labelledby="aeo-heading">
        <div className="alu-section__inner alu-split alu-split--top">
          <div>
            <PageEyebrow>{h.aeo.eyebrow}</PageEyebrow>
            <h2 id="aeo-heading" className="alu-display alu-section__title">
              {h.aeo.title}
            </h2>
          </div>
          <div>
            <div className="aeo-answer space-y-4 text-base leading-[1.8] text-foreground/85 sm:text-[1.0625rem]">
              {h.aeo.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {h.aeo.pillars.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.slug ? localePath(locale, `/services/${item.slug}`) : localePath(locale, item.path ?? "")}
                    data-interactive
                    className="alu-chip alu-chip--link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="solutions" className="alu-section" aria-labelledby="services-heading">
        <div className="alu-section__inner">
          <header data-reveal>
            <PageEyebrow>{h.services.eyebrow}</PageEyebrow>
            <h2 id="services-heading" className="alu-display alu-section__title">
              {h.services.title}
            </h2>
            <p className="alu-lede">{h.services.lede}</p>
          </header>
          <ul className="alu-offers">
            {SERVICES.map((service) => {
              const t = c.services[service.slug];
              return (
                <li key={service.id} data-reveal>
                  <Link
                    href={localePath(locale, `/services/${service.slug}`)}
                    data-interactive
                    data-conversion={CONVERSION_EVENTS.SERVICE_CLICK}
                    data-conversion-location="services_grid"
                    className="alu-card alu-glass"
                  >
                    <span className="alu-card__top">
                      <span className="alu-card__index">{String(service.index + 1).padStart(2, "0")}</span>
                    </span>
                    <h3 className="alu-display alu-card__title">{t.label}</h3>
                    <p className="alu-card__body">{t.description}</p>
                    <span className="alu-link">
                      {h.services.learnMore} <span aria-hidden>{arrow}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="alu-section alu-section--tight" aria-label={h.aeo.title}>
        <dl className="alu-section__inner alu-stats">
          {h.stats.map((stat) => (
            <div key={stat.label} className="alu-stat alu-glass" data-reveal>
              <dd className="alu-stat__value">{stat.value}</dd>
              <dt className="alu-stat__label">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {locale === "ar" ? (
        <section id="work" className="alu-section" aria-labelledby="work-heading">
          <div className="alu-section__inner">
            <article className="alu-glass px-5 py-10 sm:px-10 sm:py-14 lg:px-14" data-reveal>
              <p className="page-label">{EACML_AR.eyebrow}</p>
              <h2 id="work-heading" className="alu-display mt-4 text-[clamp(3rem,9vw,7rem)]" dir="ltr">
                {EACML_AR.title}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/90">{EACML_AR.pitch}</p>
              <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {EACML_AR.stats.map((stat) => (
                  <div key={stat.label} className="alu-stat alu-glass">
                    <dd className="alu-stat__value" dir="ltr">{stat.value}</dd>
                    <dt className="alu-stat__label">{stat.label}</dt>
                  </div>
                ))}
              </dl>
              <Link href="/ar/work/eacml-copilot" data-interactive className="btn-primary mt-8 inline-flex">
                {h.services.learnMore}
              </Link>
            </article>
          </div>
        </section>
      ) : null}

      <section id="process" className="alu-section" aria-labelledby="process-heading">
        <div className="alu-section__inner">
          <header data-reveal>
            <PageEyebrow>{h.process.eyebrow}</PageEyebrow>
            <h2 id="process-heading" className="alu-display alu-section__title">
              {h.process.heading}
            </h2>
            <p className="alu-lede">{h.process.support}</p>
          </header>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {h.process.stages.map((stage) => (
              <li key={stage.n}>
                <article className="alu-step alu-glass h-full" data-reveal>
                  <p className="alu-step__meta">
                    <span className="alu-step__n">{stage.n}</span>
                    <span className="alu-step__code">{stage.code}</span>
                  </p>
                  <h3 className="alu-display alu-step__title">{stage.title}</h3>
                  <p className="alu-step__body">{stage.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="guides" className="alu-section" aria-labelledby="guides-heading">
        <div className="alu-section__inner">
          <div data-reveal>
            <PageEyebrow>{h.guides.eyebrow}</PageEyebrow>
            <h2 id="guides-heading" className="alu-display alu-section__title">
              {h.guides.title}
            </h2>
            <p className="alu-lede max-w-2xl">{h.guides.lede}</p>
          </div>
          {guides.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.href} data-reveal>
                  <Link href={guide.href} data-interactive className="alu-glass page-panel flex h-full flex-col">
                    <h3 className="text-lg font-semibold text-foreground">{guide.title}</h3>
                    <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-foreground/80">{guide.description}</p>
                    <span className="mt-4 text-sm font-semibold text-foreground underline underline-offset-4">
                      {h.guides.readGuide}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-6 text-sm">
            <Link
              href={locale === "ar" ? INSIGHTS_PATH.ar : INSIGHTS_PATH.en}
              data-interactive
              className="font-semibold underline underline-offset-4"
            >
              {h.guides.viewAll}
            </Link>
          </p>
        </div>
      </section>

      <section id="faq" className="faq-section alu-section" aria-labelledby="faq-heading">
        <div className="alu-section__inner alu-split alu-split--top">
          <div data-reveal>
            <PageEyebrow>{h.faq.eyebrow}</PageEyebrow>
            <h2 id="faq-heading" className="alu-display alu-section__title">
              {h.faq.title}
            </h2>
            <p className="alu-lede">
              {h.faq.lede}{" "}
              <Link href={localePath(locale, "/about")} className="font-semibold underline underline-offset-4">
                {h.faq.aboutLink}
              </Link>
            </p>
          </div>
          <ul className="space-y-3">
            {h.faq.items.map((item) => (
              <li key={item.question}>
                <details className="faq-item faq-card alu-glass group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-[1.0625rem]">{item.question}</h3>
                    <span className="text-xl leading-none transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className="faq-card__answer px-4 pb-4 pt-3 text-base leading-[1.8] sm:px-5 sm:pb-5">{item.answer}</div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="alu-section alu-section--last">
        <div className="alu-section__inner">
          <ul className="alu-promises">
            {h.closing.promises.map((promise) => (
              <li key={promise.title} className="alu-promise alu-glass" data-reveal>
                <span className="alu-display alu-promise__title">{promise.title}</span>
                <span className="alu-promise__body">{promise.body}</span>
              </li>
            ))}
          </ul>
          <div className="alu-final">
            <h2 className="alu-display alu-section__title">{h.closing.title}</h2>
            <div className="alu-ctas">
              <Link
                href={localePath(locale, "/contact")}
                data-interactive
                data-conversion={CONVERSION_EVENTS.CTA_CLICK}
                data-conversion-location="closing"
                className="btn-primary"
              >
                {h.closing.primary}
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" data-interactive className="btn-secondary">
                {h.closing.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
