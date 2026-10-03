import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
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
    <article id="about-page" className="about-page page-shell">
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Link href="/" data-interactive className="page-back">
          ← Home
        </Link>

        <header className="about-page__hero mt-8 max-w-4xl sm:mt-10">
          <PageEyebrow>{ABOUT_HERO.eyebrow}</PageEyebrow>
          <h1 className="alu-display page-title mt-4">{ABOUT_HERO.title}</h1>
          <p className="alu-lede max-w-2xl">{ABOUT_HERO.lead}</p>
        </header>

        <section
          className="about-page__story mt-16 sm:mt-24"
          aria-labelledby="about-story-heading"
        >
          <PageEyebrow>{ABOUT_STORY.eyebrow}</PageEyebrow>
          <h2
            id="about-story-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            {ABOUT_STORY.title}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem] sm:leading-[1.75]">
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

          <div className="about-page__founder alu-glass page-panel mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="page-icon h-16 w-16 font-display text-3xl font-extrabold italic">
              AH
            </div>
            <div>
              <p className="page-label">{FOUNDER.title}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {FOUNDER.name}
              </p>
              <p className="mt-1 text-sm text-foreground/75">{FOUNDER.role}</p>
            </div>
          </div>
        </section>

        <dl
          className="about-page__stats alu-stats mt-16 sm:mt-20"
          aria-label="Company highlights"
        >
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="alu-stat alu-glass">
              <dd className="alu-stat__value">{stat.value}</dd>
              <dt className="alu-stat__label">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <section
          className="about-page__values mt-20 sm:mt-28"
          aria-labelledby="about-values-heading"
        >
          <PageEyebrow>Working with us</PageEyebrow>
          <h2
            id="about-values-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            How do we work with clients?
          </h2>
          <ol className="about-page__values-grid mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {ABOUT_VALUES.map((item) => (
              <li
                key={item.index}
                className="about-page__value alu-glass page-panel"
              >
                <span className="page-label">{item.index}</span>
                <h3 className="alu-display mt-3 text-[2rem] sm:text-[2.4rem]">
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
          className="about-page__services mt-20 sm:mt-28"
          aria-labelledby="about-services-heading"
        >
          <PageEyebrow>{ABOUT_CAPABILITIES.eyebrow}</PageEyebrow>
          <h2
            id="about-services-heading"
            className="alu-display page-h2 mt-3 max-w-2xl"
          >
            {ABOUT_CAPABILITIES.title}
          </h2>
          <p className="alu-lede max-w-2xl">{ABOUT_CAPABILITIES.lead}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  data-interactive
                  className="page-tile h-full"
                >
                  <span className="page-icon h-11 w-11">
                    <ServiceNavIcon
                      icon={service.nav.icon}
                      className="h-5 w-5"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">
                      {service.nav.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-foreground/70">
                      {service.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-page__cta alu-glass mt-20 px-5 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
          <p className="page-label">{ABOUT_CTA.eyebrow}</p>
          <h2 className="alu-display mx-auto mt-3 max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">
            {ABOUT_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
            {ABOUT_CTA.lead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ABOUT_CTA.primaryHref}
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              {ABOUT_CTA.primaryLabel}
            </Link>
            <Link
              href={SOLUTIONS_OVERVIEW_HREF}
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {ABOUT_CTA.secondaryLabel}
            </Link>
          </div>
          <p className="mt-5 text-sm text-foreground/70">
            Prefer chat?{" "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="font-semibold text-foreground underline underline-offset-4"
            >
              Message us on WhatsApp
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
