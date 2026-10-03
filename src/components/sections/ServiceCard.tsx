import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceNavIcon } from "@/components/layout/ServiceNavIcon";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import type { Service } from "@/lib/services/data";

const SERVICE_ART: Record<string, { src: string; alt: string }> = {
  "custom-software-development": {
    src: "/visuals/svc-01-software.webp",
    alt: "Steel handheld unit with a screen showing an app wireframe, the Quantex emblem engraved above and four lit navigation buttons",
  },
  seo: {
    src: "/visuals/svc-05-seo.webp",
    alt: "Steel analysis instrument with a dial gauge, a site-map display in amber and a coiled probe cable",
  },
  "custom-intelligent-chatbots": {
    src: "/visuals/svc-06-chatbots.webp",
    alt: "Steel cube with the Quantex emblem, an amber signal-bar strip with a knob and a glowing amber side panel",
  },
  "business-process-automation": {
    src: "/visuals/svc-02-automation.webp",
    alt: "Wall-mounted steel switch box with four orange switches and braided cables",
  },
  "custom-system-architectures": {
    src: "/visuals/svc-03-architecture.webp",
    alt: "Upright steel server blade with a vented side and the engraved Quantex emblem",
  },
  "high-converting-websites": {
    src: "/visuals/svc-04-websites.webp",
    alt: "Steel desk unit with a screen showing website layout wireframes and three knurled knobs",
  },
};

type ServiceCardProps = {
  service: Service;
  index?: number;
  total?: number;
};

export function ServiceCard({ service, index, total }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-interactive
      data-conversion={CONVERSION_EVENTS.SERVICE_CLICK}
      data-conversion-location="services_grid"
      className="service-card-link card-stack"
      data-reveal
      style={{ "--i": index ? (index - 1) % 2 : 0 } as CSSProperties}
    >
      <article
        data-service-card
        className={`service-card${SERVICE_ART[service.slug] ? " service-card--art" : ""}`}
      >
        {SERVICE_ART[service.slug] ? (
          <Image
            src={SERVICE_ART[service.slug].src}
            alt={SERVICE_ART[service.slug].alt}
            width={1400}
            height={934}
            quality={85}
            sizes="(max-width: 640px) 92vw, 560px"
            className="service-card__art"
          />
        ) : null}
        <div className="service-card__inner">
          <div className="service-card__top">
            <span className="service-card__icon" aria-hidden>
              <ServiceNavIcon icon={service.nav.icon} className="h-5 w-5" />
            </span>
            {index ? (
              <span className="service-card__spec" aria-hidden>
                {String(index).padStart(2, "0")} / {String(total ?? 0).padStart(2, "0")}
              </span>
            ) : null}
          </div>
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
