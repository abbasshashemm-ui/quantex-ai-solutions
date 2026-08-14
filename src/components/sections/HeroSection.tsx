"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { HeroChat } from "@/components/chat/HeroChat";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { useMounted } from "@/hooks/useMounted";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { CONTACT } from "@/lib/site/contact";

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
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.06,
      });
    },
    { scope: sectionRef, dependencies: [mounted], revertOnUpdate: true },
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-studio"
      aria-labelledby="hero-heading"
    >
      <div className="hero-veil" aria-hidden />

      <div className="hero-studio__inner">
        <div className="hero-studio__copy">
          <PageEyebrow data-hero-animate>Beirut · AI studio</PageEyebrow>
          <h1
            id="hero-heading"
            data-hero-animate
            className="text-metallic-gradient"
          >
            Websites.
            <br />
            Chatbots.
            <br />
            Shipped.
          </h1>
          <p data-hero-animate>
            High-converting websites and on-brand AI assistants—built to
            perform, convert, and hand off to humans when it matters.
          </p>
          <div className="hero-ctas" data-hero-animate>
            <a
              href="/contact"
              data-interactive
              data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
              data-conversion-location="hero"
              className="btn-primary"
            >
              Start a project
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
              data-conversion-location="hero"
              className="btn-secondary"
            >
              Book strategy call
            </a>
          </div>
          <div className="hero-meta" data-hero-animate>
            <span className="hero-meta__chip">
              <span className="hero-meta__dot" aria-hidden />
              Assistant online
            </span>
            <span className="hero-meta__chip">10+ businesses</span>
            <span className="hero-meta__chip">Founded 2024</span>
          </div>
        </div>

        <div data-hero-animate>
          <HeroChat />
        </div>
      </div>
    </section>
  );
}
