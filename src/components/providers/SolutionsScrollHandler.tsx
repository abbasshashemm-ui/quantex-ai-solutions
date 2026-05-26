"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SolutionsScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#solutions") return;

    const scrollToSection = () => {
      const target = document.getElementById("solutions");
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
