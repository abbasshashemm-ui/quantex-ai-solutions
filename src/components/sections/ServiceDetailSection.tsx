import Link from "next/link";
import type { Service } from "@/lib/services/data";
import { CONTACT } from "@/lib/site/contact";

const heroMetallic =
  "bg-[linear-gradient(135deg,#6b7280_0%,#c0c5ce_28%,#ffffff_52%,#9ca3af_78%,#4b5563_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]";

type ServiceDetailSectionProps = {
  service: Service;
};

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const indexLabel = String(service.index + 1).padStart(2, "0");

  return (
    <article
      id="service-page"
      className="relative min-h-[100dvh] px-4 pb-20 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 sm:pt-28"
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#solutions"
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-foreground/80 uppercase transition-opacity hover:opacity-80"
        >
          ← All solutions
        </Link>

        <p className="mt-6 text-[0.65rem] font-medium tracking-[0.28em] text-foreground/80 uppercase sm:text-xs">
          {indexLabel} · Services
        </p>
        <h1
          className={`mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl ${heroMetallic}`}
        >
          {service.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/90 sm:text-base">
          {service.description}
        </p>

        <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
          {service.placeholders.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md sm:p-6"
            >
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase sm:text-base">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-xs font-medium tracking-wide text-foreground uppercase transition-colors hover:border-white/40 hover:bg-white/10"
          >
            Book Strategy Call
          </a>
          <Link
            href="/"
            data-interactive
            className="inline-flex min-h-11 items-center justify-center text-sm text-foreground/80 transition-opacity hover:opacity-80"
          >
            Back to home
          </Link>
        </div>
      </div>
    </article>
  );
}
