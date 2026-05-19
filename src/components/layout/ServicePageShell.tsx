"use client";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { ViewportScene } from "@/components/three/ViewportScene";
import type { Service } from "@/lib/services/data";

type ServicePageShellProps = {
  service: Service;
};

export function ServicePageShell({ service }: ServicePageShellProps) {
  return (
    <>
      <ViewportScene alwaysActive />
      <ServiceDetailSection service={service} />
    </>
  );
}
