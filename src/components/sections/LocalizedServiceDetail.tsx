import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { getLocaleContent, localePath } from "@/lib/i18n";
import { PRICE_GROUPS_AR } from "@/lib/pricing/data-ar";
import { PRICE_GROUPS_FR } from "@/lib/i18n/pricing-fr";
import type { Locale } from "@/lib/i18n/types";
import type { Service } from "@/lib/services/data";
import { SERVICES } from "@/lib/services/data";
import { getRelatedNavServices } from "@/lib/services/nav";
import { bookCallHref, CONTACT } from "@/lib/site/contact";

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-signal" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const BOOK_MESSAGE: Record<Locale, string> = {
  ar: "مرحباً كوانتكس، أود حجز مكالمة مدتها 15 دقيقة.",
  fr: "Bonjour QUANTEX, je souhaite réserver un appel de 15 minutes.",
};

export function LocalizedServiceDetail({
  locale,
  service,
}: {
  locale: Locale;
  service: Service;
}) {
  const c = getLocaleContent(locale);
  const ui = c.serviceUi;
  const t = c.services[service.slug];
  const rtl = c.dir === "rtl";
  const index = String(service.index + 1).padStart(2, "0");
  const groups = locale === "ar" ? PRICE_GROUPS_AR : PRICE_GROUPS_FR;
  const priceGroup = groups.find((g) => g.serviceSlug === service.slug);
  const related = getRelatedNavServices(service.slug);
  const unpriced = !priceGroup;
  const arrow = rtl ? "←" : "→";
  const other = locale === "ar" ? { href: `/services/${service.slug}`, label: c.switcher.en, lang: "en" } : { href: `/services/${service.slug}`, label: c.switcher.en, lang: "en" };

  return (
    <article
      lang={c.htmlLang}
      dir={c.dir}
      className={`service-page page-shell min-h-[100dvh]${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href={localePath(locale, "/#solutions")} data-interactive className="page-back">
            {rtl ? "→" : "←"} {ui.allServices}
          </Link>
          <Link
            href={other.href}
            hrefLang={other.lang}
            lang={other.lang}
            dir="ltr"
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {other.label}
          </Link>
        </div>

        <header className="service-page__hero mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12">
          <div>
            <PageEyebrow>
              {index} · {ui.eyebrow}
            </PageEyebrow>
            <h1 className="alu-display page-title mt-4">{t.label}</h1>
            <p className="alu-lede max-w-xl">{t.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href={localePath(locale, "/contact")} data-interactive className="btn-primary">
                {ui.startProject}
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" data-interactive className="btn-secondary">
                {ui.whatsapp}
              </a>
            </div>
          </div>

          <aside className="service-page__aside alu-glass page-panel">
            <div className="flex items-start gap-4">
              <div className="page-icon h-12 w-12">
                <ServiceNavIcon icon={service.nav.icon} className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="page-label">{ui.inShort}</p>
                <p className="mt-1 text-base font-medium text-foreground">{t.tagline}</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.highlights.map((item) => (
                <li key={item} className="alu-chip">
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
              {ui.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="page-label">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        <section className="alu-glass page-panel mt-10 sm:mt-14 sm:p-8">
          <h2 className="page-label">{ui.inPlainWords}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg sm:leading-[1.8]">
            {t.overview}
          </p>
        </section>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
          <section className="alu-glass page-panel sm:p-8">
            <h2 className="alu-display text-[2.4rem] sm:text-[3rem]">{ui.whatYouGet}</h2>
            <ul className="mt-6 space-y-3.5">
              {t.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="alu-glass page-panel sm:p-8">
            <h2 className="alu-display text-[2.4rem] sm:text-[3rem]">{ui.howItWorks}</h2>
            <ol className="mt-6 space-y-0">
              {t.steps.map((step, i) => (
                <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="page-icon h-9 w-9 rounded-full text-[0.7rem] font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < t.steps.length - 1 ? (
                      <span className="mt-2 min-h-[2rem] w-px flex-1 bg-gradient-to-b from-foreground/30 to-transparent" />
                    ) : null}
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-foreground/80">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {priceGroup ? (
          <div className="mt-14 sm:mt-20">
            <PricingPlans group={{ ...priceGroup, title: ui.pricingTitle }} lang={locale} />
            <p className="mt-4 text-sm">
              <Link href={localePath(locale, "/pricing")} data-interactive className="underline underline-offset-4">
                {ui.seePricing}
              </Link>
            </p>
          </div>
        ) : null}

        {unpriced ? (
          <section className="alu-glass page-panel mt-14 sm:mt-20 sm:p-8">
            <p className="page-label">{ui.pricingTitle}</p>
            <h2 className="alu-display mt-3 text-[2.4rem] sm:text-[3rem]">{ui.scopedTitle}</h2>
            <Link href={localePath(locale, "/contact")} data-interactive className="btn-primary mt-6 inline-flex">
              {ui.getQuote}
            </Link>
          </section>
        ) : null}

        <section className="mt-14 sm:mt-20">
          <h2 className="alu-display page-h2">{ui.whatElse}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {related.map((item) => {
              const label = c.services[item.slug]?.label ?? item.label;
              const tagline = c.services[item.slug]?.tagline ?? item.tagline;
              const icon = SERVICES.find((s) => s.slug === item.slug)?.nav.icon ?? item.icon;
              return (
                <li key={item.slug}>
                  <Link href={localePath(locale, `/services/${item.slug}`)} data-interactive className="page-tile h-full items-center">
                    <span className="page-icon h-10 w-10">
                      <ServiceNavIcon icon={icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground">{label}</span>
                      <span className="block text-xs text-foreground/70">{tagline}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {[
              { href: localePath(locale, "/about"), ...ui.aboutLink },
              { href: localePath(locale, "/contact"), ...ui.contactLink },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} data-interactive className="page-tile h-full items-center">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="block text-xs text-foreground/70">{item.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="alu-glass mt-14 px-5 py-12 text-center sm:mt-20 sm:px-10 sm:py-16">
          <h2 className="alu-display mx-auto max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">{ui.readyTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">{ui.readyLead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={localePath(locale, "/contact")} data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
              {ui.startProject}
            </Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" data-interactive className="btn-secondary w-full max-w-xs sm:w-auto">
              {ui.whatsapp}
            </a>
            <a
              href={bookCallHref(BOOK_MESSAGE[locale])}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              data-conversion={CONVERSION_EVENTS.BOOK_CALL_CLICK}
              data-conversion-location="service_cta"
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {ui.bookCall}
            </a>
          </div>
        </div>
        <span className="sr-only">{arrow}</span>
      </div>
    </article>
  );
}
