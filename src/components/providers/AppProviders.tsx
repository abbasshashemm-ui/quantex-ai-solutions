"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ScrollToTopOnNavigate } from "./ScrollToTopOnNavigate";
import { SolutionsScrollHandler } from "./SolutionsScrollHandler";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <SmoothScrollProvider>
      <ScrollToTopOnNavigate />
      {isHome ? <SolutionsScrollHandler /> : null}
      {children}
    </SmoothScrollProvider>
  );
}
