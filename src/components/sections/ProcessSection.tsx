import Image from "next/image";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { MACHINES } from "@/lib/site/machines";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="process-section relative scroll-mt-24"
      aria-labelledby="process-heading"
    >
      <div className="instrument-band">
        <Image
          src={MACHINES.toggles.src}
          alt={MACHINES.toggles.alt}
          fill
          quality={90}
          sizes="100vw"
          className="poster__photo"
        />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <header className="process-section__header mb-8 sm:mb-10" data-reveal>
          <PageEyebrow>{PROCESS.eyebrow}</PageEyebrow>
          <h2
            id="process-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            {PROCESS.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
            {PROCESS.support}
          </p>
        </header>

        <ol className="process-section__grid">
          {PROCESS.stages.map((stage) => (
            <li key={stage.n} className="card-stack" data-reveal>
              <article className="process-card">
                <p className="process-card__meta">
                  <span className="process-card__n">{stage.n}</span>
                  <span className="process-card__code">{stage.code}</span>
                </p>
                <h3 className="process-card__title">{stage.title}</h3>
                <p className="process-card__body">{stage.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
