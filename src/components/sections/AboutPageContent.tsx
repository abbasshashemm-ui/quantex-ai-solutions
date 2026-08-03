import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import {
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_STORY,
  ABOUT_VALUES,
  FOUNDER,
} from "@/lib/site/about";
import { CONTACT } from "@/lib/site/contact";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

export function AboutPageContent() {
  return (
    <article
      id="about-page"
      className="about-page relative px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="aurora-veil aurora-veil--page" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl">
        <Link
          href="/"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-muted uppercase transition-colors hover:text-foreground"
        >
          ← Home
        </Link>

        <header className="about-page__hero mt-8 max-w-3xl sm:mt-10">
          <PageEyebrow>{ABOUT_HERO.eyebrow}</PageEyebrow>
          <h1 className="section-heading mt-4 text-aurora-text lg:text-[2.5rem]">
            {ABOUT_HERO.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
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
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">
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

          <div className="about-page__founder mt-8 flex flex-col gap-4 border-l-2 border-aurora-cyan/40 pl-5 sm:flex-row sm:items-center sm:gap-6 sm:pl-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/5 font-display text-lg font-semibold text-aurora-cyan">
              AH
            </div>
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.22em] text-muted uppercase">
                {FOUNDER.title}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-foreground">
                {FOUNDER.name}
              </p>
              <p className="mt-1 text-sm text-muted">{FOUNDER.role}</p>
            </div>
          </div>
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
          <ol className="about-page__values-list mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
            {ABOUT_VALUES.map((item) => (
              <li key={item.index} className="about-page__value">
                <span className="font-mono text-xs tracking-[0.2em] text-aurora-cyan">
                  {item.index}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-page__cta relative mt-16 overflow-hidden rounded-2xl border border-white/10 px-5 py-10 text-center sm:mt-20 sm:px-10 sm:py-12">
          <div className="aurora-veil aurora-veil--cta" aria-hidden />
          <div className="relative z-[1]">
            <p className="text-[0.65rem] font-medium tracking-[0.28em] text-muted uppercase sm:text-xs">
              {ABOUT_CTA.eyebrow}
            </p>
            <h2 className="section-heading mx-auto mt-3 max-w-xl text-foreground">
              {ABOUT_CTA.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
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
          </div>
        </section>
      </div>
    </article>
  );
}
