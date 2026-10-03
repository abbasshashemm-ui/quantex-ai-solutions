import Image from "next/image";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PROCESS } from "@/lib/site/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="process-section relative scroll-mt-24 border-t border-white/8 px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="process-section__header mb-8 grid items-end gap-8 sm:mb-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12" data-reveal>
          <div>
          <PageEyebrow>[ 03 / {PROCESS.eyebrow} ]</PageEyebrow>
          <h2
            id="process-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            {PROCESS.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.75] text-foreground/70 sm:text-[1.0625rem]">
            {PROCESS.support}
          </p>
          </div>
          <Image
            src="/visuals/process-row.webp"
            alt="Four numbered steel modules with one, two, three and four amber lights lit in turn"
            width={2000}
            height={667}
            quality={85}
            sizes="(max-width: 1024px) 92vw, 520px"
            className="process-row-art"
          />
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
