import Image from "next/image";
import { getGalleryProjects, type Project } from "@/lib/projects/data";

type ProjectGalleryProps = {
  /** Label for the outbound link, in the page's language. */
  visitLabel?: string;
  /** Hide the English descriptions on translated pages. */
  showDescriptions?: boolean;
  /** Show only these projects, in gallery order. Defaults to all of them. */
  only?: readonly string[];
  locale?: keyof typeof SAMPLE_LABEL;
};

const SAMPLE_LABEL = {
  en: "Sample data",
  ar: "بيانات تجريبية",
  fr: "Données d'exemple",
} as const;

function Frame({
  project,
  lead,
  sampleLabel,
}: {
  project: Project;
  lead: boolean;
  sampleLabel: string;
}) {
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
          sizes={
            lead
              ? "(max-width: 1360px) 100vw, 1280px"
              : "(max-width: 799px) 100vw, (max-width: 1360px) 50vw, 640px"
          }
        />
        {project.sampleData ? (
          <span className="work-frame__note">{sampleLabel}</span>
        ) : null}
      </div>
    </div>
  );
}

function Card({
  project,
  lead,
  visitLabel,
  showDescriptions,
  sampleLabel,
}: { project: Project; lead: boolean; sampleLabel: string } & Required<
  Omit<ProjectGalleryProps, "only" | "locale">
>) {
  return (
    <article className={lead ? "work-card work-card--lead" : "work-card"} data-reveal>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          data-interactive
          className="work-card__link"
          aria-label={`${project.title}: ${visitLabel}`}
        >
          <Frame project={project} lead={lead} sampleLabel={sampleLabel} />
        </a>
      ) : (
        <Frame project={project} lead={lead} sampleLabel={sampleLabel} />
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
  locale = "en",
}: ProjectGalleryProps) {
  const projects = getGalleryProjects().filter(
    (project) => !only || only.includes(project.id),
  );
  return (
    <div className="work-grid">
      {projects.map((project, index) => (
        <Card
          key={project.id}
          // An odd count leaves the first project a row to itself.
          lead={index === 0 && projects.length % 2 === 1 && projects.length > 1}
          project={project}
          visitLabel={visitLabel}
          showDescriptions={showDescriptions}
          sampleLabel={SAMPLE_LABEL[locale]}
        />
      ))}
    </div>
  );
}
