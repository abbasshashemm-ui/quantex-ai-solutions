import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import type { Service } from "@/lib/services/data";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const index = String(service.index + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${service.slug}`}
      data-interactive
      data-conversion={CONVERSION_EVENTS.SERVICE_CLICK}
      data-conversion-location="services_grid"
      className="alu-card alu-glass"
    >
      <span className="alu-card__top">
        <span className="alu-card__index">{index}</span>
      </span>
      <h3 className="alu-display alu-card__title">{service.nav.label}</h3>
      <p className="alu-card__body">{service.description}</p>
      <span className="alu-link">
        Learn more <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
