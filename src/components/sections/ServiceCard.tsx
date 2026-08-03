import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import type { Service } from "@/lib/services/data";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const indexLabel = String(service.index + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${service.slug}`}
      data-interactive
      data-conversion={CONVERSION_EVENTS.SERVICE_CLICK}
      data-conversion-location="services_grid"
      className="service-row-link"
    >
      <article data-service-card className="service-row">
        <span className="service-row__index" aria-hidden>
          {indexLabel}
        </span>
        <span className="service-row__icon" aria-hidden>
          <ServiceNavIcon icon={service.nav.icon} className="h-5 w-5" />
        </span>
        <div className="service-row__copy min-w-0">
          <h3 className="service-row__title">{service.nav.label}</h3>
          <p className="service-row__description">{service.description}</p>
        </div>
        <span className="service-row__more" aria-hidden>
          <span className="service-row__more-label">Explore</span>
          <svg
            className="service-row__more-arrow"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </article>
    </Link>
  );
}
