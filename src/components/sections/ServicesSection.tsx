import { SERVICES } from "@/lib/services/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";
import { SpotlightGrid } from "./SpotlightGrid";

export function ServicesSection() {
  return (
    <section
      id="solutions"
      className="services-section relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="services-section__header mb-8 sm:mb-10">
          <PageEyebrow>Solutions</PageEyebrow>
          <h2
            id="services-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            What services does Quantex offer?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-[1.75] text-foreground/70 sm:text-[1.0625rem]">
            Websites, chatbots, software, and the systems around them—each
            engagement scoped for a measurable outcome.
          </p>
        </header>

        <SpotlightGrid className="services-section__grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} index={SERVICES.indexOf(service) + 1} />
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
