import { MiniSculpture } from "@/components/hero/MiniSculpture";
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

        {/* On large screens the sculpture stays in view and unfolds step by step. */}
        <div className="alu-process" data-sculpture-track>
          <div className="alu-process__sculpture">
            <MiniSculpture mode="scroll" steps={PROCESS.stages.length} />
          </div>

          <ol className="alu-steps">
            {PROCESS.stages.map((stage, index) => (
              <li
                key={stage.n}
                data-reveal
                className="alu-steps__item"
                style={{ "--i": index } as React.CSSProperties}
              >
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
      </div>
    </section>
  );
}
