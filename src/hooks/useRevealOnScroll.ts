"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { useMounted } from "@/hooks/useMounted";

/**
 * Shared fade-up entrance for section content. Targets matching `selector`
 * inside `sectionRef` stagger in when the section scrolls into view.
 * Content stays visible in server HTML and for reduced-motion users.
 */
export function useRevealOnScroll(
  sectionRef: RefObject<HTMLElement | null>,
  selector: string,
) {
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;

      registerGsapPlugins();

      const section = sectionRef.current;
      if (!section) return;

      const targets = gsap.utils.toArray<HTMLElement>(selector, section);
      if (targets.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(targets, {
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
}
