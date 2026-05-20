import Image from "next/image";
import type { Project } from "@/lib/projects/data";

type ProjectCardProps = {
  project: Project;
};

function ProjectCardContent({ project }: ProjectCardProps) {
  return (
    <>
      <div className="project-card__browser overflow-hidden rounded-xl border border-white/10 bg-surface-elevated/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-void/90 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-xs text-foreground/50">
            {project.url}
          </p>
        </div>
        <div className="project-card__preview project-card__preview--image relative">
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain object-center p-1"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-foreground/85 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground sm:text-lg">
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
