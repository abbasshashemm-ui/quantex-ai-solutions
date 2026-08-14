import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { StackedDeck } from "@/components/ui/StackedDeck";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="process-section relative scroll-mt-24 border-t border-white/8 py-20 sm:py-24 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="stacked-section">
          <header className="process-section__header stacked-section__copy">
            <PageEyebrow>{PROCESS.eyebrow}</PageEyebrow>
            <h2
              id="process-heading"
              className="section-heading mt-3 max-w-2xl text-metallic-gradient"
            >
              {PROCESS.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
              {PROCESS.support}{" "}
              <Link
                href="#work"
                data-interactive
                className="text-foreground/85 underline-offset-2 hover:underline"
              >
                Then see it live.
              </Link>
            </p>
          </header>

          <StackedDeck label="Process">
            {PROCESS.stages.map((stage) => (
              <article key={stage.n} className="process-card">
                <p className="process-card__meta">
                  <span className="process-card__n">{stage.n}</span>
                  <span className="process-card__code">{stage.code}</span>
                </p>
                <h3 className="process-card__title">{stage.title}</h3>
                <p className="process-card__body">{stage.body}</p>
                <p className="process-card__prompt" aria-hidden>
                  &gt; {stage.code} _
                </p>
              </article>
            ))}
          </StackedDeck>
        </div>
      </div>
    </section>
  );
}
