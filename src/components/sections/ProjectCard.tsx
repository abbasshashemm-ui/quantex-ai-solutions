import type { Project } from "@/lib/projects/data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card group flex flex-col">
      <div className="project-card__browser overflow-hidden rounded-lg border border-white/10 bg-surface-elevated/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1 sm:rounded-xl">
        <div className="flex items-center gap-1 border-b border-white/8 bg-void/90 px-2 py-1.5 sm:gap-2 sm:px-4 sm:py-2.5">
          <div className="flex shrink-0 gap-1" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center text-[0.5rem] text-foreground/50 sm:text-xs">
            {project.url}
          </p>
        </div>
        <div
          className={`project-card__preview project-card__preview--${project.previewVariant}`}
          aria-hidden
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-white/15 bg-white/5 px-1 py-px text-[0.5rem] font-medium tracking-wide text-foreground/85 uppercase sm:px-2 sm:py-0.5 sm:text-[0.65rem]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-2 text-xs font-semibold tracking-tight text-foreground sm:mt-3 sm:text-lg">
        {project.title}
      </h3>
      <p className="mt-1 text-[0.65rem] leading-snug text-foreground/75 sm:mt-1.5 sm:text-sm sm:leading-relaxed">
        {project.description}
      </p>
    </article>
  );
}
