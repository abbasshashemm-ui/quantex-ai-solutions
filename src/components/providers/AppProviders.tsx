"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { GsapProvider } from "./GsapProvider";
import { ScrollToTopOnNavigate } from "./ScrollToTopOnNavigate";
import { SolutionsScrollHandler } from "./SolutionsScrollHandler";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <GsapProvider>
      <ScrollToTopOnNavigate />
      {isHome ? <SolutionsScrollHandler /> : null}
      {children}
    </GsapProvider>
  );
}
