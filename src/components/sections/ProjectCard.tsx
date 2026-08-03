import Image from "next/image";
import type { Project } from "@/lib/projects/data";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function ProjectCardContent({ project, priority }: ProjectCardProps) {
  return (
    <>
      <div className="project-card__media">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top"
        />
        <div className="project-card__media-veil" aria-hidden />
      </div>

      <div className="project-card__body">
        <p className="project-card__url">{project.url}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        {project.href ? (
          <span className="project-card__more" aria-hidden>
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
      </div>
    </>
  );
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        data-interactive
        className="project-card-link group flex flex-col"
      >
        <ProjectCardContent project={project} priority={priority} />
      </a>
    );
  }

  return (
    <article className="project-card group flex flex-col">
      <ProjectCardContent project={project} priority={priority} />
    </article>
  );
}
