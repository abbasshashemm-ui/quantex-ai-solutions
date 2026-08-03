"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { PROJECTS } from "@/lib/projects/data";
import { CONTACT } from "@/lib/site/contact";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ProjectCard } from "./ProjectCard";

export function RecentProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnScroll(sectionRef, "[data-project-card]");

  return (
    <section
      id="work"
      ref={sectionRef}
      className="projects-section relative border-t border-white/5 py-20 sm:py-24 md:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6">
        <header className="projects-section__header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <PageEyebrow>Our work</PageEyebrow>
            <h2
              id="projects-heading"
              className="section-heading text-aurora-text"
            >
              Recent projects
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Real client work—portfolios, custom operations software, and
              industrial brands we have shipped end to end.
            </p>
          </div>

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="btn-secondary shrink-0 gap-2 self-start px-5 md:self-auto"
          >
            Start a project
            <span aria-hidden className="text-muted">
              →
            </span>
          </a>
        </header>

        <div className="projects-section__grid mt-10 sm:mt-12">
          {PROJECTS.map((project, index) => (
            <div key={project.id} data-project-card>
              <ProjectCard project={project} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
