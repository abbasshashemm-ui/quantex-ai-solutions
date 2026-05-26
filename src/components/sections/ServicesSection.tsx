"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { useMounted } from "@/hooks/useMounted";
import { SERVICES } from "@/lib/services/data";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;

      registerGsapPlugins();

      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 32,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted], revertOnUpdate: true },
  );

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
