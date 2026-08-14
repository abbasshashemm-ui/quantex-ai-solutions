import Link from "next/link";
import { SERVICES } from "@/lib/services/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section
      id="solutions"
      className="services-section relative scroll-mt-24 py-20 sm:py-24 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="services-section__header mb-8 sm:mb-10">
          <PageEyebrow>Solutions</PageEyebrow>
          <h2
            id="services-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            What we design and ship
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-base">
            Websites, chatbots, software, and the systems around them—each
            engagement scoped for a measurable outcome.
          </p>
        </header>

        <div className="services-section__grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <p className="explore-next">
          <Link href="#work" data-interactive>
            See them live in the work
            <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
