import Image from "next/image";
import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { EACML, EACML_PATH } from "@/lib/projects/eacml";
import {
  PROJECTS,
  getFeaturedProjects,
  type Project,
} from "@/lib/projects/data";

function Tags({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Project type">
      {project.status === "in-progress" ? (
        <li className="alu-chip">
          <span className="alu-chip__dot" aria-hidden />
          In progress
        </li>
      ) : null}
      {project.tags.map((tag) => (
        <li key={tag} className="alu-chip">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function LeadCard({ project }: { project: Project }) {
  return (
    <article className="alu-glass relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14 lg:px-14" data-reveal>
      <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-metallic uppercase sm:text-xs">
        <span className="h-px w-8 bg-current" aria-hidden />
        Flagship project
      </p>
      <h3 className="alu-display mt-5 text-[clamp(3.5rem,11vw,8.5rem)]">
        {project.title}
      </h3>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Tags project={project} />
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
        {project.description}
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" aria-label="Project at a glance">
        {EACML.stats.map((stat) => (
          <div key={stat.label} className="alu-stat alu-glass">
            <dd className="alu-stat__value">{stat.value}</dd>
            <dt className="alu-stat__label">{stat.label}</dt>
          </div>
        ))}
      </dl>

      {project.highlights ? (
        <ul className="mt-10 grid gap-x-10 gap-y-3 lg:grid-cols-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/85">
              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-foreground" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href={EACML_PATH} data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
          See the project
        </Link>
        <Link href="/contact" data-interactive className="btn-secondary w-full max-w-xs sm:w-auto">
          Talk to us
        </Link>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      {project.imageSrc && project.imageWidth && project.imageHeight ? (
        <Image
          src={project.imageSrc}
          alt={project.imageAlt ?? ""}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="(max-width: 768px) 92vw, 30vw"
          className="h-auto w-full"
        />
      ) : null}
      <div className="p-5 sm:p-6">
        <Tags project={project} />
        <h3 className="alu-display mt-4 text-[clamp(1.9rem,3vw,2.4rem)]">
          {project.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
          {project.description}
        </p>
        <p className="mt-3 text-sm text-foreground/65">{project.url}</p>
      </div>
    </>
  );

  return (
    <li data-reveal>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          data-interactive
          className="alu-glass block h-full overflow-hidden"
          aria-label={`${project.title}: visit ${project.url}`}
        >
          {body}
        </a>
      ) : (
        <div className="alu-glass h-full overflow-hidden">{body}</div>
      )}
    </li>
  );
}

export function WorkSection() {
  const lead = PROJECTS.find((project) => project.status === "in-progress");
  const featured = getFeaturedProjects();

  return (
    <section id="work" className="alu-section" aria-labelledby="work-heading">
      <div className="alu-section__inner">
        <div data-reveal>
          <PageEyebrow>Selected work</PageEyebrow>
          <h2 id="work-heading" className="alu-display alu-section__title">
            What we are building.
          </h2>
          <p className="alu-lede max-w-2xl">
            From websites that win customers to AI platforms for regulated
            work.
          </p>
        </div>

        {lead ? (
          <div className="mt-8">
            <LeadCard project={lead} />
          </div>
        ) : null}

        <ul className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
