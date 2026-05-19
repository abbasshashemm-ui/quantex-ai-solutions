"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSolutionsAllVisible } from "@/lib/scroll/scroll-to-solutions";
import { useLenis } from "./SmoothScrollProvider";

function isSolutionsHashLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? "";
  return href === "#solutions" || href === "/#solutions" || href.endsWith("/#solutions");
}

export function SolutionsScrollHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#solutions") return;

    const run = () => {
      void scrollToSolutionsAllVisible(lenis);
    };

    const frame = requestAnimationFrame(run);
    const delayed = window.setTimeout(run, 400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
    };
  }, [pathname, lenis]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a");
      if (!anchor || !isSolutionsHashLink(anchor)) return;

      if (pathname !== "/") return;

      event.preventDefault();
      window.history.pushState(null, "", "/#solutions");
      void scrollToSolutionsAllVisible(lenis);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, lenis]);

  return null;
}
