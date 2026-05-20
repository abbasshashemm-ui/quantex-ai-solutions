"use client";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { LazyViewportScene } from "@/components/three/LazyViewportScene";
import type { Service } from "@/lib/services/data";

type ServicePageShellProps = {
  service: Service;
};

export function ServicePageShell({ service }: ServicePageShellProps) {
  return (
    <>
      <LazyViewportScene />
      <ServiceDetailSection service={service} />
    </>
  );
}
