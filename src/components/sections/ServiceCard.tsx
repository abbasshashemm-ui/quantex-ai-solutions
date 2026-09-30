"use client";

import Image from "next/image";
import Link from "next/link";
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
      className="service-card-link"
    >
      <article data-service-card className="service-card">
        <div className="service-card__media">
          <Image
            src={service.imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center"
          />
        </div>
        <div className="service-card__inner">
          <p className="service-card__index">{indexLabel}</p>
          <h3 className="service-card__title">{service.displayTitle}</h3>
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
