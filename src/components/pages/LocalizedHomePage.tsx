import Link from "next/link";
import { HeroStage } from "@/components/hero/HeroStage";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { getArticleListing, INSIGHTS_PATH } from "@/lib/articles";
import { getLocaleContent, localePath } from "@/lib/i18n";
import { EACML_AR } from "@/lib/i18n/eacml-ar";
import type { Locale } from "@/lib/i18n/types";
import { SERVICES } from "@/lib/services/data";
import { HeroAsk } from "@/components/hero/HeroAsk";
import { MiniSculpture } from "@/components/hero/MiniSculpture";
import { ClosingTitle } from "@/components/home/ClosingTitle";
import { ForYouSection } from "@/components/home/ForYouSection";
import { GuidesList } from "@/components/home/GuidesList";
import { SiteCheckBand } from "@/components/home/SiteCheckBand";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesList } from "@/components/sections/ServicesList";
import { StatBand } from "@/components/sections/StatBand";
import { ProjectGallery } from "@/components/work/ProjectGallery";
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
  const cards = Object.fromEntries(
    SERVICES.map((service) => [
      service.slug,
      {
        href: localePath(locale, `/services/${service.slug}`),
        label: c.services[service.slug].label,
        description: c.services[service.slug].description,
      },
    ]),
  );
  const guides =
    locale === "ar"
      ? getArticleListing("ar").filter(
          (g) => g.slug === "ai-in-lebanon" || FEATURED.includes(g.slug),
        )
      : [];

  return (
    <div lang={c.htmlLang} dir={c.dir} className={rtl ? "rtl-page" : undefined}>
      <HeroStage>
        <HeroAsk
          locale={locale}
          eyebrow={`${h.hero.eyebrow} · ${h.hero.chips[0]} · ${h.hero.chips[1]}`}
        />

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
      <ForYouSection locale={locale} />

      <section id="work" className="alu-section" aria-labelledby="work-heading">
        <div className="alu-section__inner">
          <div data-reveal>
            <PageEyebrow>{h.work.eyebrow}</PageEyebrow>
            <h2 id="work-heading" className="alu-display alu-section__title">
              {h.work.title}
            </h2>
            <p className="alu-lede max-w-2xl">{h.work.lede}</p>
          </div>
          <ProjectGallery visitLabel={h.work.visit} showDescriptions={false} locale={locale} />
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
          <ServicesList
            locale={locale}
            cards={cards}
            learnMore={h.services.learnMore}
            arrow={arrow}
          />
        </div>
      </section>

      <StatBand stats={h.stats} label={h.aeo.title} />

      {locale === "ar" ? (
        <section id="flagship" className="alu-section" aria-labelledby="flagship-heading">
          <div className="alu-section__inner">
            <article className="alu-glass px-5 py-10 sm:px-10 sm:py-14 lg:px-14" data-reveal>
              <p className="page-label">{EACML_AR.eyebrow}</p>
              <h2 id="flagship-heading" className="alu-display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]" dir="ltr">
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

      <ProcessSection process={h.process} />

      <SiteCheckBand locale={locale} copy={h.siteCheck} />

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
            <GuidesList
              locale={locale}
              guides={guides.map(({ href, title, description, readingTime }) => ({
                href,
                title,
                description,
                readingTime,
              }))}
            />
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

      <section className="aeo-block alu-section" aria-labelledby="aeo-heading">
        <div className="alu-section__inner alu-split alu-split--top">
          <div>
            <PageEyebrow>{h.aeo.eyebrow}</PageEyebrow>
            <h2 id="aeo-heading" className="alu-display alu-section__title">
              {h.aeo.title}
            </h2>
          </div>
          <div>
            <div className="aeo-answer aeo-answer--statement space-y-4 text-base leading-[1.8] text-foreground/85 sm:text-lead">
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
          <ul className="faq-list">
            {h.faq.items.map((item) => (
              <li key={item.question}>
                <details className="faq-item faq-card faq-card--plain group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-lead">{item.question}</h3>
                    <span className="text-xl leading-none transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className="faq-card__answer pb-5 text-base leading-[1.8]">{item.answer}</div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="alu-section alu-section--last band-dark"
        data-force-dark
        data-dark-zone
      >
        <div className="alu-section__inner">
          <ul className="alu-promises">
            {h.closing.promises.map((promise) => (
              <li key={promise.title} className="alu-promise rule-item" data-reveal>
                <span className="alu-display alu-promise__title">{promise.title}</span>
                <span className="alu-promise__body">{promise.body}</span>
              </li>
            ))}
          </ul>
          <div className="alu-final">
            <div className="alu-final__sculpture" aria-hidden>
              <MiniSculpture mode="idle" minWidth={900} />
            </div>
            <ClosingTitle locale={locale} fallback={h.closing.title} />
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
