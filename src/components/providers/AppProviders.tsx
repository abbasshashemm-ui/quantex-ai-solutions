"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ConversionTracker } from "@/components/analytics/ConversionTracker";
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
      <ConversionTracker />
      <ScrollToTopOnNavigate />
      {isHome ? <SolutionsScrollHandler /> : null}
      {children}
    </GsapProvider>
  );
}
