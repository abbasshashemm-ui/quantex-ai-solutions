import { MiniSculpture } from "@/components/hero/MiniSculpture";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="alu-section alu-process-section"
      aria-labelledby="process-heading"
    >
      <div className="alu-section__inner">
        {/*
          On large screens this is a tall track with a pinned panel inside, like
          the hero: the steps take turns in one spot while the sculpture unfolds.
          Smaller screens show the steps as an ordinary grid.
        */}
        <div className="alu-process" data-sculpture-track>
          <div className="alu-process__panel">
            <header data-reveal>
              <PageEyebrow>{PROCESS.eyebrow}</PageEyebrow>
              <h2
                id="process-heading"
                className="alu-display alu-section__title"
              >
                {PROCESS.heading}
              </h2>
              <p className="alu-lede">{PROCESS.support}</p>
            </header>

            <div className="alu-process__stage">
              <div className="alu-process__sculpture">
                <MiniSculpture
                  mode="scroll"
                  pinned
                  steps={PROCESS.stages.length}
                />
              </div>

              <ol className="alu-steps">
                {PROCESS.stages.map((stage, index) => (
                  <li
                    key={stage.n}
                    className="alu-steps__item"
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    <article className="alu-step alu-glass h-full">
                      <p className="alu-step__meta">
                        <span className="alu-step__n">{stage.n}</span>
                        <span className="alu-step__code">{stage.code}</span>
                      </p>
                      <h3 className="alu-display alu-step__title">
                        {stage.title}
                      </h3>
                      <p className="alu-step__body">{stage.body}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>

            <div className="alu-process__ticks" aria-hidden>
              {PROCESS.stages.map((stage, index) => (
                <span
                  key={stage.n}
                  style={{ "--i": index } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
