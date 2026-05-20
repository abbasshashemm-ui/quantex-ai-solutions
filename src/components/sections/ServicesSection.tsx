"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { useMounted } from "@/hooks/useMounted";
import { SERVICES } from "@/lib/services/data";
import { sceneScrollStore } from "@/lib/scene/scene-scroll-store";
import { SERVICES_SCROLL_TRIGGER_ID } from "@/lib/scroll/scroll-to-solutions";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { ServiceCard } from "./ServiceCard";

const SCROLL_PER_SERVICE = 0.85;

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;

      registerGsapPlugins();

      const section = sectionRef.current;
      const pin = pinRef.current;
      const progressBar = progressRef.current;
      if (!section || !pin) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const setServicesActive = (active: boolean) => {
        sceneScrollStore.setState({
          isInServices: active,
          servicesProgress: active ? 0 : 0,
          activeServiceIndex: 0,
        });
      };

      if (reducedMotion || isMobile) {
        gsap.set(cards, {
          opacity: 1,
          rotateX: 0,
          z: 0,
          scale: 1,
          force3D: true,
          clearProps: "filter",
        });

        if (!reducedMotion) {
          gsap.from(cards, {
            opacity: 0,
            y: 36,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => setServicesActive(true),
          onLeave: () => setServicesActive(false),
          onEnterBack: () => setServicesActive(true),
          onLeaveBack: () => setServicesActive(false),
        });

        return () => setServicesActive(false);
      }

      gsap.set(cards, {
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      const scrollLength = SERVICES.length * SCROLL_PER_SERVICE * 100;

      gsap.set(cards, {
        opacity: 0,
        rotateX: 58,
        z: -320,
        scale: 0.68,
        force3D: true,
      });

      let lastActiveIndex = -1;

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: SERVICES_SCROLL_TRIGGER_ID,
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}%`,
          pin: pin,
          scrub: 1.15,
          anticipatePin: 1,
          fastScrollEnd: false,
          invalidateOnRefresh: true,
          onEnter: () => setServicesActive(true),
          onLeave: () => setServicesActive(false),
          onEnterBack: () => setServicesActive(true),
          onLeaveBack: () => setServicesActive(false),
          onUpdate: (self) => {
            const progress = self.progress;

            if (progressBar) {
              progressBar.style.width = `${progress * 100}%`;
            }

            const activeIndex = Math.min(
              Math.floor(progress * SERVICES.length),
              SERVICES.length - 1,
            );

            if (activeIndex === lastActiveIndex) return;
            lastActiveIndex = activeIndex;

            sceneScrollStore.setState({
              servicesProgress: progress,
              activeServiceIndex: activeIndex,
              isInServices: true,
            });

            cards.forEach((card, index) => {
              card.dataset.active = index === activeIndex ? "true" : "false";
            });
          },
        },
      });

      cards.forEach((card, index) => {
        const segment = 1 / SERVICES.length;
        const start = index * segment * 0.9;

        timeline.to(
          card,
          {
            opacity: 1,
            rotateX: 0,
            z: 0,
            scale: 1,
            duration: segment * 0.75,
            ease: "none",
            force3D: true,
          },
          start,
        );
      });

      return () => setServicesActive(false);
    },
    { scope: sectionRef, dependencies: [mounted], revertOnUpdate: true },
  );

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="services-section relative"
      aria-labelledby="services-heading"
    >
      <div ref={pinRef} className="services-section__pin">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <header className="services-section__header">
            <PageEyebrow>Expertise</PageEyebrow>
            <h2
              id="services-heading"
              className="section-heading max-w-2xl text-metallic-gradient"
            >
              Core services engineered for impact
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
              Strategy, build, and launch—each engagement scoped for measurable
              outcomes.
            </p>
            <div
              className="services-section__progress-track services-section__progress-track--desktop"
              aria-hidden
            >
              <div ref={progressRef} className="services-section__progress-bar" />
            </div>
          </header>

          <div className="services-section__grid">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                className={
                  index % 2 === 1 ? "services-section__card--offset" : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
