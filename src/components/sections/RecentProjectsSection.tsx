import Link from "next/link";
import {
  getAdditionalProjects,
  getFeaturedProjects,
} from "@/lib/projects/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ProjectCard } from "./ProjectCard";

export function RecentProjectsSection() {
  const featured = getFeaturedProjects();
  const more = getAdditionalProjects();

  return (
    <section
      id="work"
      className="projects-section relative border-t border-white/8 py-20 sm:py-24 md:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="projects-section__header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <PageEyebrow>Work</PageEyebrow>
            <h2 id="projects-heading" className="section-heading text-metallic-gradient">
              What has Quantex shipped?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
              Live client systems—sites, operations software, and brands shipped
              end to end.
            </p>
          </div>

          <Link
            href="/about"
            data-interactive
            className="btn-secondary shrink-0 gap-2 self-start px-5 md:self-auto"
          >
            How we build
            <span aria-hidden className="text-foreground/70">
              →
            </span>
          </Link>
        </header>

        <div className="projects-section__grid mt-10 sm:mt-12">
          {featured.map((project) => (
            <div key={project.id} className="project-card-reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {more.length > 0 ? (
          <details className="projects-more mt-8">
            <summary className="projects-more__tab" data-interactive>
              <span className="projects-more__open">Show more</span>
              <span className="projects-more__close">Show less</span>
            </summary>
            <div className="projects-section__grid mt-8">
              {more.map((project) => (
                <div key={project.id} className="project-card-reveal">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </section>
  );
}
