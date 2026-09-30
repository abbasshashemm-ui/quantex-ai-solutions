import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="spec-band"
      aria-labelledby="process-heading"
    >
      <div className="spec-band__inner">
        <h2 id="process-heading" className="spec-kicker">
          {PROCESS.eyebrow}
        </h2>
        <p className="spec-support">{PROCESS.support}</p>
        <ol className="spec-list">
          {PROCESS.stages.map((stage) => (
            <li key={stage.n} className="spec-row spec-row--static">
              <span className="spec-n">{stage.n}</span>
              <span className="spec-row__text">
                <span className="spec-row__title">{stage.title}</span>
                <span className="spec-row__body">{stage.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
