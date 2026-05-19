"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "./useMediaQuery";

const DEFAULT_SELECTORS = ["#home", "#solutions"];

/**
 * Returns true while hero or services intersect the viewport.
 * Used to mount / unmount the WebGL canvas when off-screen.
 */
export function useViewportSceneActive(
  selectors: string[] = DEFAULT_SELECTORS,
  rootMargin = "12% 0px 28% 0px",
) {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const effectiveMargin = isMobile ? "0px" : rootMargin;
    const elements = selectors
      .map((selector) => document.querySelector(selector))
      .filter((el): el is Element => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<Element, boolean>();
    elements.forEach((el) => visibility.set(el, true));

    const sync = () => {
      setActive([...visibility.values()].some(Boolean));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting);
        });
        sync();
      },
      { root: null, rootMargin: effectiveMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    sync();

    return () => observer.disconnect();
  }, [selectors, rootMargin, isMobile]);

  return active;
}
