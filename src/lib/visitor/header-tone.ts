"use client";

import { useEffect, useState } from "react";

/**
 * Whether the header currently sits over a dark zone (the hero, or the band
 * the visitor's answer unlocks). It looks at what is directly under the
 * header as the page scrolls. `fallback` is what the route implies, so the
 * first paint is already right before any script has run.
 */
export function useHeaderOverDark(fallback: boolean, deps: unknown[]): boolean {
  const [over, setOver] = useState(fallback);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const header = document.querySelector<HTMLElement>(".site-header");
      const y = (header?.offsetHeight ?? 72) + 1;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((node) => !header?.contains(node));
      setOver(Boolean(under?.closest("[data-dark-zone]")));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // Re-read when the page or the visitor's answer changes what is on it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return over;
}
