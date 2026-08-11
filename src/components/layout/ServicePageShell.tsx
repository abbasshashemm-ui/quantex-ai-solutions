"use client";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import type { Service } from "@/lib/services/data";

type ServicePageShellProps = {
  service: Service;
};

export function ServicePageShell({ service }: ServicePageShellProps) {
  return <ServiceDetailSection service={service} />;
}
