import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="alu-section"
      aria-labelledby="process-heading"
    >
      <div className="alu-section__inner">
        <header data-reveal>
          <PageEyebrow>{PROCESS.eyebrow}</PageEyebrow>
          <h2 id="process-heading" className="alu-display alu-section__title">
            {PROCESS.heading}
          </h2>
          <p className="alu-lede">{PROCESS.support}</p>
        </header>

        <ol className="alu-steps">
          {PROCESS.stages.map((stage) => (
            <li key={stage.n} data-reveal>
              <article className="alu-step alu-glass h-full">
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
  );
}
