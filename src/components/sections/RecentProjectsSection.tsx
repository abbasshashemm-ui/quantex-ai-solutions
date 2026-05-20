"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { useMounted } from "@/hooks/useMounted";
import { PROJECTS } from "@/lib/projects/data";
import { ProjectCard } from "./ProjectCard";

export function RecentProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;
      registerGsapPlugins();

      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted], revertOnUpdate: true },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="projects-section relative border-t border-white/5 py-16 sm:py-20 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="projects-section__header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="projects-section__eyebrow text-[0.65rem] font-medium tracking-[0.28em] text-foreground uppercase sm:text-xs sm:tracking-[0.35em]">
              Our work
            </p>
            <h2
              id="projects-heading"
              className="mt-3 text-2xl font-semibold tracking-tight text-metallic-gradient sm:text-3xl md:text-4xl"
            >
              Recent projects
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              A sample of builds we ship for teams in Lebanon and abroad—web,
              software, and automation with measurable outcomes.
            </p>
          </div>

          <a
            href="#work"
            data-interactive
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/25 bg-white/5 px-5 text-xs font-medium tracking-wide text-foreground uppercase transition-colors hover:border-white/45 hover:bg-white/10 md:self-auto"
          >
            View all
            <span aria-hidden className="text-foreground/70">
              →
            </span>
          </a>
        </header>

        <div className="projects-section__grid mt-10 sm:mt-12">
          {PROJECTS.map((project) => (
            <div key={project.id} data-project-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
