"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useMounted } from "@/hooks/useMounted";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

type SiteMotionProps = {
  children: ReactNode;
};

export function SiteMotion({ children }: SiteMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted) return;

      registerGsapPlugins();

      const root = rootRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

      if (reducedMotion) {
        gsap.set(reveals, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [mounted], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="site-motion">
      {children}
    </div>
  );
}
