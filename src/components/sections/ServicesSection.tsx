import { SERVICES } from "@/lib/services/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section
      id="solutions"
      className="alu-section"
      aria-labelledby="services-heading"
    >
      <div className="alu-section__inner">
        <header data-reveal>
          <PageEyebrow>What we build</PageEyebrow>
          <h2 id="services-heading" className="alu-display alu-section__title">
            One studio. Six ways to grow.
          </h2>
          <p className="alu-lede">
            Start with a website and an assistant, or pick exactly what you
            need. Everything is designed to work together.
          </p>
        </header>

        <ul className="alu-offers">
          {SERVICES.map((service) => (
            <li key={service.id} data-reveal>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
