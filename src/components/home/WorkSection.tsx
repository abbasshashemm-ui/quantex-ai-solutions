import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { EACML, EACML_PATH } from "@/lib/projects/eacml";
import { PROJECTS } from "@/lib/projects/data";

/** The in-progress platform: one quiet panel under the shipped work. */
function Flagship() {
  const project = PROJECTS.find((item) => item.status === "in-progress");
  if (!project) return null;

  return (
    <article className="work-flagship alu-glass" data-reveal>
      <div>
        <p className="page-label">In progress · {project.tags.join(" · ")}</p>
        <h3 className="alu-display work-flagship__title">{project.title}</h3>
        <p className="work-flagship__body">{project.description}</p>
        <Link href={EACML_PATH} data-interactive className="alu-link">
          See the project <span aria-hidden>→</span>
        </Link>
      </div>
      <dl className="work-flagship__stats" aria-label="Project at a glance">
        {EACML.stats.map((stat) => (
          <div key={stat.label}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="alu-section" aria-labelledby="work-heading">
      <div className="alu-section__inner">
        <div data-reveal>
          <PageEyebrow>Selected work</PageEyebrow>
          <h2 id="work-heading" className="alu-display alu-section__title">
            Work we have shipped.
          </h2>
          <p className="alu-lede max-w-2xl">
            Websites and apps running today for businesses in Lebanon and the
            region.
          </p>
        </div>

        <ProjectGallery />
        <Flagship />
      </div>
    </section>
  );
}
