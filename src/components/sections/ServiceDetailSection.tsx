import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import type { Service } from "@/lib/services/data";
import { SOLUTIONS_OVERVIEW_HREF, getRelatedNavServices } from "@/lib/services/nav";
import { CONTACT, WHATSAPP_CTA_LABEL } from "@/lib/site/contact";
import { PRODUCT } from "@/lib/site/product";

type ServiceDetailSectionProps = {
  service: Service;
};

function CheckIcon() {
  return (
    <svg
      className="service-page__check h-4 w-4 shrink-0 text-signal"
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
  const related = getRelatedNavServices(service.slug);
  const spokePages = [
    { href: "/about", label: "About the studio", tagline: "Who builds this" },
    { href: "/contact", label: "Start a project", tagline: "Send a brief" },
  ] as const;

  return (
    <article
      id="service-page"
      className="service-page relative min-h-[100dvh] px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="service-page__glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href={SOLUTIONS_OVERVIEW_HREF}
          data-interactive
          className="inline-flex min-h-11 items-center text-xs tracking-wide text-foreground/65 transition-colors hover:text-foreground"
        >
          ← All solutions
        </Link>

        <header className="service-page__hero mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10 xl:gap-14">
          <div>
            <PageEyebrow className="text-foreground/80">
              {indexLabel} · Services
            </PageEyebrow>
            <h1 className="section-heading mt-4 text-metallic-gradient lg:text-[2.35rem]">
              {navMeta?.label ?? service.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/90 sm:text-base">
              {service.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/contact"
                data-interactive
                className="btn-primary"
              >
                {service.slug === PRODUCT.serviceSlug
                  ? PRODUCT.ctaLabel
                  : "Send a brief"}
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary"
              >
                {WHATSAPP_CTA_LABEL}
              </a>
            </div>
          </div>

          <aside className="service-page__aside border border-white/10 bg-surface p-5 sm:p-6">
            {navMeta ? (
              <div className="flex items-start gap-4">
                <div className="service-page__icon-wrap flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-void text-metallic">
                  <ServiceNavIcon icon={navMeta.icon} className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-medium tracking-[0.2em] text-foreground/55 uppercase">
                    Focus area
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground sm:text-base">
                    {navMeta.tagline}
                  </p>
                </div>
              </div>
            ) : null}
            {detail.highlights.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/12 bg-void px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-metallic uppercase sm:text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <dl className="service-page__stats mt-6 grid grid-cols-1 gap-4 border-t border-white/8 pt-5 sm:grid-cols-3 sm:gap-3">
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-foreground/50 uppercase">
                  Delivery
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  {service.slug === PRODUCT.serviceSlug
                    ? PRODUCT.priceLabel
                    : "Phased"}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-foreground/50 uppercase">
                  Handover
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  Documented
                </dd>
              </div>
              <div>
                <dt className="text-[0.6rem] tracking-[0.18em] text-foreground/50 uppercase">
                  Support
                </dt>
                <dd className="mt-1 text-xs font-medium text-foreground sm:text-sm">
                  Post-launch
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <section className="service-page__overview glass-panel mt-10 p-5 sm:mt-12 sm:p-7 md:p-8">
          <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-metallic uppercase sm:text-xs">
            What is {service.nav.label} at Quantex?
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/88 sm:text-base sm:leading-relaxed">
            {overview}
          </p>
        </section>

        <div className="service-page__panels mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
          <section className="service-page__panel glass-panel p-5 sm:p-6 md:p-7">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-metallic uppercase sm:text-xs">
              What do you get?
            </h2>
            <p className="mt-3 text-sm text-foreground/75">
              Tangible outcomes from engagement through handover.
            </p>
            <ul className="mt-5 space-y-3">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/88">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="service-page__panel glass-panel p-5 sm:p-6 md:p-7">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-metallic uppercase sm:text-xs">
              How does Quantex deliver this?
            </h2>
            <p className="mt-3 text-sm text-foreground/75">
              A clear sequence so you always know what happens next.
            </p>
            <ol className="service-page__timeline mt-6 space-y-0">
              {detail.processSteps.map((step, i) => (
                <li key={step.label} className="service-page__timeline-item relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-void text-[0.65rem] font-semibold tabular-nums text-metallic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < detail.processSteps.length - 1 ? (
                      <span className="service-page__timeline-line mt-2 w-px flex-1 min-h-[2rem] bg-gradient-to-b from-metallic/50 to-transparent" />
                    ) : null}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-10 sm:mt-12">
          <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-metallic uppercase sm:text-xs">
            What else does Quantex offer?
          </h2>
          <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  data-interactive
                  className="service-page__related group inline-flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/5 sm:w-auto"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-void text-metallic transition-colors group-hover:border-white/30">
                    <ServiceNavIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-xs font-medium text-foreground sm:text-sm">
                      {item.label}
                    </span>
                    <span className="block truncate text-[0.65rem] text-foreground/60 sm:max-w-[12rem]">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            {spokePages.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-interactive
                  className="service-page__related group inline-flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-surface px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/5 sm:w-auto"
                >
                  <span className="min-w-0 text-left">
                    <span className="block text-xs font-medium text-foreground sm:text-sm">
                      {item.label}
                    </span>
                    <span className="block truncate text-[0.65rem] text-foreground/60 sm:max-w-[12rem]">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="service-page__cta mt-10 rounded-3xl border border-white/12 bg-surface px-5 py-8 text-center sm:mt-12 sm:px-8 sm:py-10">
          <h2 className="mx-auto max-w-lg text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How do I start this with Quantex?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-foreground/85 sm:text-base">
            Tell us what you are building. We will scope the first milestone and reply with a
            practical plan—not a generic pitch deck.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              Send a brief
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              {WHATSAPP_CTA_LABEL}
            </a>
          </div>
          <p className="mt-5 text-sm text-foreground/55">
            <Link
              href="/"
              data-interactive
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
