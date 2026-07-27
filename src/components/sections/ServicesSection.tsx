"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { SERVICES } from "@/lib/services/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnScroll(sectionRef, "[data-service-card]");

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="services-section relative scroll-mt-24 py-16 sm:py-20 md:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header className="services-section__header mb-8 sm:mb-10">
          <PageEyebrow>Expertise</PageEyebrow>
          <h2
            id="services-heading"
            className="section-heading mt-3 max-w-2xl text-metallic-gradient"
          >
            Core services engineered for impact
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            Strategy, build, and launch—each engagement scoped for measurable
            outcomes.
          </p>
        </header>

        <div className="services-section__grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
