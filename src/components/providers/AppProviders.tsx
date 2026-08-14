"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ConversionTracker } from "@/components/analytics/ConversionTracker";
import { HashScrollHandler } from "./HashScrollHandler";
import { ScrollToTopOnNavigate } from "./ScrollToTopOnNavigate";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <ConversionTracker />
      <ScrollToTopOnNavigate />
      {isHome ? <HashScrollHandler /> : null}
      {children}
    </>
  );
}
