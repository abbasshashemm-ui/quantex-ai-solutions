import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { PricingPlans } from "@/components/sections/PricingPlans";
import {
  CUSTOM_SCOPES,
  PRICE_GROUPS,
  PRICING_FAQ,
} from "@/lib/pricing/data";
import { CONTACT } from "@/lib/site/contact";

export function PricingPageContent() {
  return (
    <article id="pricing-page" className="page-shell min-h-[100dvh]">
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <Link href="/" data-interactive className="page-back">
          ← Home
        </Link>

        <header className="mt-8 sm:mt-10">
          <PageEyebrow>Pricing</PageEyebrow>
          <h1 className="alu-display page-title page-title--sm mt-4">
            Clear prices, in dollars
          </h1>
          <p className="alu-lede max-w-2xl">
            Websites, search and AI assistants have a starting price. Custom
            work is quoted after a short call. Everything is built and looked
            after by the founder, so every project gets personal attention.
          </p>
        </header>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          {PRICE_GROUPS.map((group) => (
            <PricingPlans key={group.id} group={group} />
          ))}
        </div>

        <section className="mt-16 sm:mt-24" aria-labelledby="price-custom">
          <h2
            id="price-custom"
            className="alu-display text-[2.4rem] sm:text-[3rem]"
          >
            Custom work, quoted per project
          </h2>
          <p className="mt-3 max-w-2xl text-base text-foreground/80">
            Tell us the problem. We reply within 24 hours with a fixed quote.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {CUSTOM_SCOPES.map((item) => (
              <li key={item.slug} className="alu-glass page-panel">
                <p className="page-label">Scoped per project</p>
                <h3 className="alu-display mt-3 text-[1.9rem]">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground/85">{item.text}</p>
                <Link
                  href={`/services/${item.slug}`}
                  data-interactive
                  className="btn-secondary mt-5 w-full text-center"
                >
                  See what it covers
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 sm:mt-24" aria-labelledby="price-faq">
          <h2 id="price-faq" className="alu-display text-[2.4rem] sm:text-[3rem]">
            Pricing questions
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {PRICING_FAQ.map((item) => (
              <div key={item.question} className="alu-glass page-panel">
                <dt className="text-base font-semibold text-foreground">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="alu-glass mt-16 px-5 py-12 text-center sm:mt-24 sm:px-10 sm:py-16">
          <h2 className="alu-display mx-auto max-w-3xl text-[clamp(3rem,7vw,5.5rem)]">
            Not sure which plan?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
            Tell us what you need. We reply within 24 hours and recommend the
            smallest plan that does the job.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
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
          </div>
        </div>
      </div>
    </article>
  );
}
