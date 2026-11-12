import Image from "next/image";
import { getGalleryProjects, type Project } from "@/lib/projects/data";

type ProjectGalleryProps = {
  /** Label for the outbound link, in the page's language. */
  visitLabel?: string;
  /** Hide the English descriptions on translated pages. */
  showDescriptions?: boolean;
  /** Show only these projects, in gallery order. Defaults to all of them. */
  only?: readonly string[];
};

function Frame({ project }: { project: Project }) {
  if (!project.imageSrc) return null;
  return (
    <div className="work-frame">
      <div className="work-frame__bar" aria-hidden>
        <span className="work-frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="work-frame__address" dir="ltr">
          {project.url}
        </span>
      </div>
      <div className="work-frame__shot">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt ?? `${project.title} preview`}
          width={project.imageWidth ?? 1024}
          height={project.imageHeight ?? 487}
          quality={70}
          sizes="(max-width: 799px) 100vw, (max-width: 1360px) 50vw, 640px"
        />
      </div>
    </div>
  );
}

function Card({
  project,
  visitLabel,
  showDescriptions,
}: { project: Project } & Required<Omit<ProjectGalleryProps, "only">>) {
  return (
    <article className="work-card" data-reveal>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          data-interactive
          className="work-card__link"
          aria-label={`${project.title}: ${visitLabel}`}
        >
          <Frame project={project} />
        </a>
      ) : (
        <Frame project={project} />
      )}
      <div className="work-card__meta">
        <h3 className="work-card__title" dir="ltr">
          {project.title}
        </h3>
        <p className="work-card__tags" dir="ltr">
          {project.tags.join(" · ")}
        </p>
      </div>
      {showDescriptions ? (
        <p className="work-card__body">{project.description}</p>
      ) : null}
    </article>
  );
}

/** Client work as framed screenshots. The frames carry the colour on the page. */
export function ProjectGallery({
  visitLabel = "Visit the site",
  showDescriptions = true,
  only,
}: ProjectGalleryProps) {
  const projects = getGalleryProjects().filter(
    (project) => !only || only.includes(project.id),
  );
  return (
    <div className="work-grid">
      {projects.map((project) => (
        <Card
          key={project.id}
          project={project}
          visitLabel={visitLabel}
          showDescriptions={showDescriptions}
        />
      ))}
    </div>
  );
}
