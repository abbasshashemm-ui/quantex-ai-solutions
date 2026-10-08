import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { getLocaleContent, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { SERVICES } from "@/lib/services/data";
import { FOUNDER } from "@/lib/site/about";
import { CONTACT } from "@/lib/site/contact";

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const c = getLocaleContent(locale);
  const a = c.about;
  const rtl = c.dir === "rtl";
  const founderName = locale === "ar" ? "عباس هاشم" : FOUNDER.name;

  return (
    <article
      lang={c.htmlLang}
      dir={c.dir}
      className={`about-page page-shell${rtl ? " rtl-page" : ""}`}
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href={localePath(locale)} data-interactive className="page-back">
            {rtl ? "→" : "←"} {a.back}
          </Link>
          <Link
            href="/about"
            hrefLang="en"
            lang="en"
            dir="ltr"
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            {c.switcher.en}
          </Link>
        </div>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>{a.hero.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4 max-w-4xl">{a.hero.title}</h1>
          <p className="alu-lede max-w-2xl">{a.hero.lead}</p>
        </header>

        <section className="mt-16 sm:mt-24" aria-labelledby="about-story-heading">
          <PageEyebrow>{a.story.eyebrow}</PageEyebrow>
          <h2 id="about-story-heading" className="alu-display page-h2 mt-3 max-w-2xl">
            {a.story.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.85]">
            {a.story.paragraphs.map((p, i) => (
              <p key={i}>
                {typeof p === "string" ? (
                  p
                ) : (
                  <>
                    {p.before}
                    <strong className="font-semibold text-foreground">{p.highlight}</strong>
                    {p.after}
                  </>
                )}
              </p>
            ))}
          </div>
          <div className="alu-glass page-panel mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="page-icon h-16 w-16 font-display text-3xl font-extrabold italic" dir="ltr">
              AH
            </div>
            <div>
              <p className="page-label">{FOUNDER.title}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{founderName}</p>
              <p className="mt-1 text-sm text-foreground/75">{a.founderRole}</p>
            </div>
          </div>
        </section>

        <dl className="alu-stats mt-16 sm:mt-20">
          {a.stats.map((stat) => (
            <div key={stat.label} className="alu-stat alu-glass">
              <dd className="alu-stat__value">{stat.value}</dd>
              <dt className="alu-stat__label">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <section className="mt-20 sm:mt-28" aria-label={a.hero.title}>
          <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {a.values.map((item) => (
              <li key={item.index} className="alu-glass page-panel">
                <span className="page-label">{item.index}</span>
                <h3 className="alu-display mt-3 text-[2rem] sm:text-[2.4rem]">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 sm:mt-28" aria-labelledby="about-services-heading">
          <PageEyebrow>{a.capabilities.eyebrow}</PageEyebrow>
          <h2 id="about-services-heading" className="alu-display page-h2 mt-3 max-w-2xl">
            {a.capabilities.title}
          </h2>
          <p className="alu-lede max-w-2xl">{a.capabilities.lead}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const t = c.services[service.slug];
              return (
                <li key={service.id}>
                  <Link href={localePath(locale, `/services/${service.slug}`)} data-interactive className="page-tile h-full">
                    <span className="page-icon h-11 w-11">
                      <ServiceNavIcon icon={service.nav.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground">{t.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-foreground/70">{t.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
          <p className="page-label">{a.cta.eyebrow}</p>
          <h2 className="alu-display mx-auto mt-3 max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">{a.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">{a.cta.lead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={localePath(locale, "/contact")} data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
              {a.cta.primary}
            </Link>
            <Link href={localePath(locale, "/#solutions")} data-interactive className="btn-secondary w-full max-w-xs sm:w-auto">
              {a.cta.secondary}
            </Link>
          </div>
          <p className="mt-5 text-sm text-foreground/70">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" data-interactive className="font-semibold text-foreground underline underline-offset-4">
              {c.serviceUi.whatsapp}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
