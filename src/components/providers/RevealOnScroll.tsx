"use client";

import { useEffect } from "react";

/**
 * Subtle one-shot reveal for [data-reveal] elements. The hidden state is only
 * applied once this runs (html.js-reveal), so content stays visible without JS
 * or with reduced motion.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-revealed)")
        .forEach((node) => observer.observe(node));
    };

    root.classList.add("js-reveal");
    observeAll();
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
