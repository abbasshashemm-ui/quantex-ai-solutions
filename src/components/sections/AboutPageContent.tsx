import Image from "next/image";
import Link from "next/link";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PAGE_STILLS } from "@/lib/brand/stills";
import {
  ABOUT_CAPABILITIES,
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_VALUES,
  FOUNDER,
} from "@/lib/site/about";
import { CONTACT } from "@/lib/site/contact";
import { SERVICES } from "@/lib/services/data";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

export function AboutPageContent() {
  return (
    <>
    <HeroMedia src={PAGE_STILLS.about.src} alt={PAGE_STILLS.about.alt} priority />
    <article
      id="about-page"
      className="about-page relative px-4 pb-24 sm:px-6"
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl pt-8 sm:pt-10">
        <Link
          href="/"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-foreground/75 uppercase transition-colors hover:text-foreground"
        >
          ← Home
        </Link>

        <header className="about-page__hero mt-8 max-w-3xl sm:mt-10">
          <PageEyebrow>{ABOUT_HERO.eyebrow}</PageEyebrow>
          <h1 className="display-title mt-4 max-w-4xl">
            {ABOUT_HERO.title}
          </h1>
          <span className="signal-rule" aria-hidden />
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            {ABOUT_HERO.lead}
          </p>
        </header>

        <section
          className="about-page__story mt-14 sm:mt-16"
          aria-labelledby="about-story-heading"
        >
          <PageEyebrow>{ABOUT_STORY.eyebrow}</PageEyebrow>
          <h2
            id="about-story-heading"
            className="section-heading mt-3 max-w-2xl text-foreground"
          >
            {ABOUT_STORY.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/82 sm:text-base sm:leading-relaxed">
            {ABOUT_STORY.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {typeof paragraph === "string" ? (
                  paragraph
                ) : (
                  <>
                    {paragraph.before}
                    <strong className="font-semibold text-foreground">
                      {paragraph.highlight}
                    </strong>
                    {paragraph.after}
                  </>
                )}
              </p>
            ))}
          </div>

          <div className="about-page__founder glass-panel mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-white/16 font-mono text-lg font-semibold text-metallic">
              AH
            </div>
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.22em] text-foreground/55 uppercase">
                {FOUNDER.title}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {FOUNDER.name}
              </p>
              <p className="mt-1 text-sm text-foreground/75">{FOUNDER.role}</p>
            </div>
          </div>
        </section>

        <section
          className="about-page__stats mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4"
          aria-label="Company highlights"
        >
          {ABOUT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="about-page__stat glass-panel px-4 py-5 sm:px-5 sm:py-6"
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-foreground/70 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section
          className="about-page__values mt-16 sm:mt-20"
          aria-labelledby="about-values-heading"
        >
          <PageEyebrow>Working with us</PageEyebrow>
          <h2
            id="about-values-heading"
            className="section-heading mt-3 max-w-2xl text-foreground"
          >
            How we show up on every project.
          </h2>
          <ol className="about-page__values-grid mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {ABOUT_VALUES.map((item) => (
              <li
                key={item.index}
                className="about-page__value glass-panel p-5 sm:p-6"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-metallic">
                  {item.index}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/78">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-page__services mt-16 border-t border-white/8 pt-16 sm:mt-20 sm:pt-20"
          aria-labelledby="about-services-heading"
        >
          <PageEyebrow>{ABOUT_CAPABILITIES.eyebrow}</PageEyebrow>
          <h2
            id="about-services-heading"
            className="section-heading mt-3 max-w-2xl text-foreground"
          >
            {ABOUT_CAPABILITIES.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/78 sm:text-base">
            {ABOUT_CAPABILITIES.lead}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  data-interactive
                  className="about-page__service-link group flex h-full flex-col border border-white/16 bg-surface transition-colors hover:border-white/40"
                >
                  <span className="service-card__media">
                    <Image
                      src={service.imageSrc}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain object-center"
                    />
                  </span>
                  <span className="min-w-0 p-4 sm:p-5">
                    <span className="block text-sm font-semibold tracking-tight text-foreground uppercase">
                      {service.displayTitle}
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-foreground/65">
                      {service.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__cta mt-16 border border-white/16 bg-surface px-5 py-10 sm:mt-20 sm:px-10 sm:py-12">
          <p className="text-[0.65rem] font-medium tracking-[0.28em] text-foreground/70 uppercase sm:text-xs">
            {ABOUT_CTA.eyebrow}
          </p>
          <h2 className="section-heading mx-auto mt-3 max-w-xl text-foreground">
            {ABOUT_CTA.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-foreground/80 sm:text-base">
            {ABOUT_CTA.lead}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              {ABOUT_CTA.primaryLabel}
            </a>
            <Link
              href={SOLUTIONS_OVERVIEW_HREF}
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {ABOUT_CTA.secondaryLabel}
            </Link>
          </div>
        </section>
      </div>
    </article>
    </>
  );
}
