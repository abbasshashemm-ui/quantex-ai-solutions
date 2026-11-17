import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PROCESS } from "@/lib/site/process";

/** Four steps on one line that fills in as the section scrolls into view. */
type ProcessContent = {
  eyebrow: string;
  heading: string;
  support: string;
  stages: readonly { n: string; code: string; title: string; body: string }[];
};

export function ProcessSection({
  process = PROCESS,
}: {
  process?: ProcessContent;
}) {
  return (
    <section id="process" className="alu-section" aria-labelledby="process-heading">
      <div className="alu-section__inner">
        <header data-reveal>
          <PageEyebrow>{process.eyebrow}</PageEyebrow>
          <h2 id="process-heading" className="alu-display alu-section__title">
            {process.heading}
          </h2>
          <p className="alu-lede">{process.support}</p>
        </header>

        <ol className="process-line">
          {process.stages.map((stage) => (
            <li key={stage.n} className="process-line__step">
              <span className="process-line__n" aria-hidden>
                {stage.n}
              </span>
              <p className="process-line__code">{stage.code}</p>
              <h3 className="alu-display process-line__title">{stage.title}</h3>
              <p className="process-line__body">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
