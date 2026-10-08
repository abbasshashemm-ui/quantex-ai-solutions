import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import type { Service } from "@/lib/services/data";
import {
  SOLUTIONS_OVERVIEW_HREF,
  getRelatedNavServices,
} from "@/lib/services/nav";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { CUSTOM_SCOPES, PRICE_GROUPS } from "@/lib/pricing/data";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { bookCallHref, CONTACT } from "@/lib/site/contact";

type ServiceDetailSectionProps = {
  service: Service;
};

function CheckIcon() {
  return (
    <svg
      className="service-page__check mt-0.5 h-4 w-4 shrink-0 text-signal"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FACTS = [
  { label: "Ownership", value: "Yours" },
  { label: "Replies", value: "Within 24h" },
  { label: "Contact", value: "Direct" },
] as const;

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const indexLabel = String(service.index + 1).padStart(2, "0");
  const { nav: navMeta, overview, detail } = service;
  const related = getRelatedNavServices(service.slug);
  const priceGroup = PRICE_GROUPS.find((g) => g.serviceSlug === service.slug);
  const customScope = CUSTOM_SCOPES.find((c) => c.slug === service.slug);
  const spokePages = [
    { href: "/about", label: "About the studio", tagline: "Who builds this" },
    {
      href: "/contact",
      label: "Start a project",
      tagline: "Tell us what you need",
    },
  ] as const;

  return (
    <article
      id="service-page"
      className="service-page page-shell min-h-[100dvh]"
    >
      <div className="page-grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href={SOLUTIONS_OVERVIEW_HREF}
          data-interactive
          className="page-back"
        >
          ← All services
        </Link>

        <header className="service-page__hero mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12">
          <div>
            <PageEyebrow>{indexLabel} · Services</PageEyebrow>
            <h1 className="alu-display page-title mt-4">
              {navMeta?.label ?? service.title}
            </h1>
            <p className="alu-lede max-w-xl">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/contact" data-interactive className="btn-primary">
                Start a project
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="btn-secondary"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>

          <aside className="service-page__aside alu-glass page-panel">
            {navMeta ? (
              <div className="flex items-start gap-4">
                <div className="page-icon h-12 w-12">
                  <ServiceNavIcon icon={navMeta.icon} className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="page-label">In short</p>
                  <p className="mt-1 text-base font-medium text-foreground">
                    {navMeta.tagline}
                  </p>
                </div>
              </div>
            ) : null}
            {detail.highlights.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {detail.highlights.map((item) => (
                  <li key={item} className="alu-chip">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <dl className="service-page__stats mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="page-label">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        <section className="service-page__overview alu-glass page-panel mt-10 sm:mt-14 sm:p-8">
          <h2 className="page-label">In plain words</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg sm:leading-[1.7]">
            {overview}
          </p>
        </section>

        <div className="service-page__panels mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
          <section className="service-page__panel alu-glass page-panel sm:p-8">
            <h2 className="alu-display text-[2.4rem] sm:text-[3rem]">
              What you get
            </h2>
            <ul className="mt-6 space-y-3.5">
              {detail.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="service-page__panel alu-glass page-panel sm:p-8">
            <h2 className="alu-display text-[2.4rem] sm:text-[3rem]">
              How it works
            </h2>
            <ol className="service-page__timeline mt-6 space-y-0">
              {detail.processSteps.map((step, i) => (
                <li
                  key={step.label}
                  className="service-page__timeline-item relative flex gap-4 pb-6 last:pb-0"
                >
                  <div className="flex flex-col items-center">
                    <span className="page-icon h-9 w-9 rounded-full text-[0.7rem] font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < detail.processSteps.length - 1 ? (
                      <span className="service-page__timeline-line mt-2 min-h-[2rem] w-px flex-1 bg-gradient-to-b from-foreground/30 to-transparent" />
                    ) : null}
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-sm font-semibold text-foreground">
                      {step.label}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-foreground/80">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {priceGroup ? (
          <div className="mt-14 sm:mt-20">
            <PricingPlans group={{ ...priceGroup, title: "Pricing" }} />
            <p className="mt-4 text-sm">
              <Link href="/pricing" data-interactive className="underline underline-offset-4">
                See all pricing
              </Link>
            </p>
          </div>
        ) : null}

        {customScope ? (
          <section className="service-page__panel alu-glass page-panel mt-14 sm:mt-20 sm:p-8">
            <p className="page-label">Pricing</p>
            <h2 className="alu-display mt-3 text-[2.4rem] sm:text-[3rem]">
              Scoped per project
            </h2>
            <p className="mt-3 max-w-2xl text-base text-foreground/85">
              {customScope.text} Tell us the problem and we reply within 24
              hours.
            </p>
            <Link href="/contact" data-interactive className="btn-primary mt-6 inline-flex">
              Get a quote
            </Link>
          </section>
        ) : null}

        <section className="mt-14 sm:mt-20">
          <h2 className="alu-display page-h2">What else do we offer?</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  data-interactive
                  className="page-tile h-full items-center"
                >
                  <span className="page-icon h-10 w-10">
                    <ServiceNavIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="block text-xs text-foreground/70">
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
                  className="page-tile h-full items-center"
                >
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="block text-xs text-foreground/70">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="service-page__cta alu-glass mt-14 px-5 py-12 text-center sm:mt-20 sm:px-10 sm:py-16">
          <h2 className="alu-display mx-auto max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">
            Ready to start?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
            Tell us what you need. We will reply within 24 hours with a
            practical plan and a realistic first step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-interactive
              className="btn-primary w-full max-w-xs sm:w-auto"
            >
              Start a project
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              Message us on WhatsApp
            </a>
            <a
              href={bookCallHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              data-conversion={CONVERSION_EVENTS.BOOK_CALL_CLICK}
              data-conversion-location="service_cta"
              className="btn-secondary w-full max-w-xs sm:w-auto"
            >
              Book a 15-minute call
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
