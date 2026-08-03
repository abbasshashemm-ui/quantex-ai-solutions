import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import type { Service } from "@/lib/services/data";
import { NAV_SERVICE_ITEMS, SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";
import { CONTACT } from "@/lib/site/contact";

type ServiceDetailSectionProps = {
  service: Service;
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-aurora-cyan"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const indexLabel = String(service.index + 1).padStart(2, "0");
  const { nav: navMeta, overview, detail } = service;
  const related = NAV_SERVICE_ITEMS.filter((item) => item.slug !== service.slug);

  return (
    <article
      id="service-page"
      className="service-page relative min-h-[100dvh] px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="aurora-veil aurora-veil--page" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl">
        <Link
          href={SOLUTIONS_OVERVIEW_HREF}
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-muted uppercase transition-opacity hover:opacity-80"
        >
          ← All solutions
        </Link>

        <header className="service-page__hero mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-14">
          <div>
            <PageEyebrow>
              {indexLabel} · Services
            </PageEyebrow>
            <h1 className="section-heading mt-4 text-aurora-text lg:text-[2.5rem]">
              {navMeta?.label ?? service.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-primary"
              >
                Book strategy call
              </a>
              <Link href="/contact" data-interactive className="btn-secondary">
                Send a brief
              </Link>
            </div>
          </div>

          <aside className="service-page__aside border-l border-white/10 pl-0 sm:pl-6 lg:pl-8">
            {navMeta ? (
              <div>
                <p className="text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase">
                  Focus area
                </p>
                <p className="mt-2 text-sm font-medium text-foreground sm:text-base">
                  {navMeta.tagline}
                </p>
              </div>
            ) : null}
            {detail.highlights.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted before:mr-2 before:text-aurora-cyan before:content-['·']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-muted uppercase">
                  Delivery
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  Phased
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-muted uppercase">
                  Handover
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  Documented
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-muted uppercase">
                  Support
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  Post-launch
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="service-page__overview mt-12 max-w-3xl border-t border-white/8 pt-10 sm:mt-14">
          <h2 className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted uppercase sm:text-xs">
            Overview
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/88 sm:text-base sm:leading-relaxed">
            {overview}
          </p>
        </section>

        <div className="service-page__panels mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-14">
          <section>
            <h2 className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted uppercase sm:text-xs">
              What you get
            </h2>
            <ul className="mt-5 space-y-3">
              {detail.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/88"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted uppercase sm:text-xs">
              How we work
            </h2>
            <ol className="mt-5 space-y-5">
              {detail.processSteps.map((step, i) => (
                <li key={step.label} className="flex gap-4">
                  <span className="font-mono text-xs tabular-nums text-aurora-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {step.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-12 border-t border-white/8 pt-10 sm:mt-14">
          <h2 className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted uppercase sm:text-xs">
            Explore more solutions
          </h2>
          <ul className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  data-interactive
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="service-page__cta relative mt-12 overflow-hidden rounded-2xl border border-white/10 px-5 py-8 text-center sm:mt-14 sm:px-8 sm:py-10">
          <div className="aurora-veil aurora-veil--cta" aria-hidden />
          <div className="relative z-[1]">
            <p className="text-[0.65rem] font-medium tracking-[0.28em] text-muted uppercase sm:text-xs">
              Ready to start?
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
              Tell us what you are building. We will scope the first milestone
              and reply with a practical plan—not a generic pitch deck.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-primary w-full max-w-xs sm:w-auto"
              >
                WhatsApp us
              </a>
              <Link
                href="/"
                data-interactive
                className="inline-flex min-h-11 items-center justify-center text-sm text-muted transition-opacity hover:text-foreground"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
