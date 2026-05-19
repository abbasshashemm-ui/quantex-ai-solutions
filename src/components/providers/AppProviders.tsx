"use client";

import type { ReactNode } from "react";
import { SolutionsScrollHandler } from "./SolutionsScrollHandler";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SmoothScrollProvider>
      <SolutionsScrollHandler />
      {children}
    </SmoothScrollProvider>
  );
}
