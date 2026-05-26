"use client";

import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import type { Service } from "@/lib/services/data";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-interactive
      className="service-card-link"
    >
      <article data-service-card className="service-card">
        <div className="service-card__inner">
          <span className="service-card__icon" aria-hidden>
            <ServiceNavIcon icon={service.nav.icon} className="h-5 w-5" />
          </span>
          <h3 className="service-card__title">{service.nav.label}</h3>
          <p className="service-card__description">{service.description}</p>
          <span className="service-card__more">
            <span className="service-card__more-label">Learn more</span>
            <svg
              className="service-card__more-arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
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
        </div>
      </article>
    </Link>
  );
}
