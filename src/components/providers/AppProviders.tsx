"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { HashScrollHandler } from "./HashScrollHandler";
import { ScrollToTopOnNavigate } from "./ScrollToTopOnNavigate";

const ConversionTracker = dynamic(
  () =>
    import("@/components/analytics/ConversionTracker").then((module) => ({
      default: module.ConversionTracker,
    })),
  { ssr: false },
);

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
