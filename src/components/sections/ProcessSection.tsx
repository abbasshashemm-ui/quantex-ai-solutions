import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="process-section relative scroll-mt-24 border-t border-accent/20 py-16 sm:py-20 md:py-24"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="process-section__header mb-8 sm:mb-10" data-reveal>
          <PageEyebrow>{PROCESS.eyebrow}</PageEyebrow>
          <h2
            id="process-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            {PROCESS.heading}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            {PROCESS.support}
          </p>
        </header>

        <ol className="process-section__grid">
          {PROCESS.stages.map((stage) => (
            <li key={stage.n} className="process-card" data-reveal>
              <p className="process-card__meta">
                <span className="process-card__n">{stage.n}</span>
                <span className="process-card__code">{stage.code}</span>
              </p>
              <h3 className="process-card__title">{stage.title}</h3>
              <p className="process-card__body">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
