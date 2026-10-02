"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const scrollToSection = () => {
      const target = document.getElementById(hash);
      if (!target) return;
      target.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const frame = requestAnimationFrame(scrollToSection);
    const delayed = window.setTimeout(scrollToSection, 50);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
    };
  }, [pathname]);

  return null;
}
