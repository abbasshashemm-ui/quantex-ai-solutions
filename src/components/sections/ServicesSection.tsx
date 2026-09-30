import Link from "next/link";
import { Figure } from "@/components/sections/Figure";
import { SERVICES } from "@/lib/services/data";
import { FIGURES, SERVICE_FIGURE } from "@/lib/site/machines";

export function ServicesSection() {
  return (
    <section id="solutions" className="spec-band" aria-labelledby="services-heading">
      <div className="spec-band__inner">
        <h2 id="services-heading" className="spec-kicker">
          Solutions
        </h2>
        <ol className="spec-list">
          {SERVICES.map((service) => {
            const figureId = SERVICE_FIGURE[service.id];
            const figure = figureId ? FIGURES[figureId] : null;
            const index = String(service.index + 1).padStart(2, "0");
            return (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`} data-interactive className="spec-row">
                  <span className="spec-n">{index}</span>
                  {figure ? (
                    <Figure figure={figure} size={72} />
                  ) : (
                    <span className="spec-figure spec-figure--empty" aria-hidden />
                  )}
                  <span className="spec-row__text">
                    <span className="spec-row__title">{service.nav.label}</span>
                    <span className="spec-row__body">{service.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
