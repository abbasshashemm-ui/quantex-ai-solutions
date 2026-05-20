"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLenis } from "./SmoothScrollProvider";

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const run = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      scrollWindowToTop();
    };

    run();
    const frame = requestAnimationFrame(run);

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}
