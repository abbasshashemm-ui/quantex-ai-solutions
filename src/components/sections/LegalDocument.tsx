import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import type { LegalSection } from "@/lib/site/legal/privacy-policy";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: readonly LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article
      className="legal-page relative px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-foreground/75 uppercase transition-colors hover:text-foreground"
        >
          ← Home
        </Link>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>{eyebrow}</PageEyebrow>
          <h1 className="section-heading mt-4 text-foreground">{title}</h1>
          <p className="mt-3 text-sm text-foreground/60">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
            {intro}
          </p>
        </header>

        <div className="legal-page__sections mt-12 space-y-10 sm:mt-14 sm:space-y-12">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`legal-${section.id}`}>
              <h2
                id={`legal-${section.id}`}
                className="text-base font-semibold text-foreground sm:text-lg"
              >
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/82 sm:text-[0.9375rem] sm:leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="list-disc space-y-2 pl-5 marker:text-foreground/50">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
