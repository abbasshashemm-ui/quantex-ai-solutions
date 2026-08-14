import Image from "next/image";
import type { Project } from "@/lib/projects/data";

type ProjectCardProps = {
  project: Project;
};

function ProjectCardContent({ project }: ProjectCardProps) {
  return (
    <>
      <div className="project-card__browser overflow-hidden border border-white/10 bg-surface-elevated">
        <div className="flex items-center gap-2 border-b border-white/8 bg-void/80 px-3 py-2.5 sm:px-4">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-xs text-foreground/55">
            {project.url}
          </p>
        </div>
        <div className="project-card__preview project-card__preview--image relative">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/12 bg-void px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-metallic uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-display mt-3 text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {project.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
        {project.description}
      </p>

      {project.href ? (
        <span className="project-card__more mt-4" aria-hidden>
          <span className="project-card__more-label">View site</span>
          <svg
            className="project-card__more-arrow"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        data-interactive
        className="project-card-link group flex flex-col"
      >
        <ProjectCardContent project={project} />
      </a>
    );
  }

  return (
    <article className="project-card group flex flex-col">
      <ProjectCardContent project={project} />
    </article>
  );
}
