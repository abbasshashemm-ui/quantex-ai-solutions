"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { useMounted } from "@/hooks/useMounted";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import { SOLUTIONS_OVERVIEW_HREF } from "@/lib/services/nav";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;
      registerGsapPlugins();

      const root = sectionRef.current;
      if (!root) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-hero-animate]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-hero-animate]", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.08,
      });
    },
    { scope: sectionRef, dependencies: [mounted], revertOnUpdate: true },
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section relative grid min-h-[100dvh] grid-rows-[minmax(0,1fr)_auto_minmax(4rem,0.7fr)] px-4 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32"
    >
      <div className="aurora-veil aurora-veil--hero" aria-hidden />

      <div aria-hidden className="min-h-0" />

      <div className="relative z-[1] mx-auto w-full max-w-4xl px-1 text-center sm:px-2">
        <PageEyebrow
          align="center"
          className="text-aurora-muted"
          data-hero-animate
        >
          AI Solutions · Beirut
        </PageEyebrow>

        <h1
          data-hero-animate
          className="brand-display mt-4 text-balance text-aurora-brand"
        >
          Quantex
        </h1>

        <p
          data-hero-animate
          className="mx-auto mt-5 max-w-2xl text-balance font-display text-xl font-semibold leading-snug tracking-tight text-foreground sm:mt-6 sm:text-2xl md:text-3xl"
        >
          Digital products built to perform—and convert
        </p>

        <p
          data-hero-animate
          className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:mt-5 sm:text-base"
        >
          Custom software, high-converting websites, automation, and AI
          assistants—designed, built, and shipped with clarity from first call
          to launch.
        </p>

        <div
          data-hero-animate
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
            data-conversion-location="hero"
            className="btn-primary w-full sm:w-auto"
          >
            Book strategy call
          </a>
          <a
            href={SOLUTIONS_OVERVIEW_HREF}
            data-interactive
            data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
            data-conversion-location="hero"
            className="btn-secondary w-full sm:w-auto"
          >
            View solutions
          </a>
        </div>
      </div>

      <div aria-hidden className="min-h-0" />
    </section>
  );
}
