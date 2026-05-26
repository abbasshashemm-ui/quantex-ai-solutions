import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageShell } from "@/components/layout/ServicePageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
} from "@/lib/seo/json-ld";
import {
  formatServiceTitle,
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services/data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return createPageMetadata({
    title: formatServiceTitle(service.title),
    description: service.overview,
    path: `/services/${service.slug}`,
    keywords: [
      service.nav.label,
      service.nav.tagline,
      "Quantex AI Solutions",
    ],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(service),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/#solutions" },
            {
              name: service.nav.label,
              path: `/services/${service.slug}`,
            },
          ]),
        ]}
      />
      <ServicePageShell service={service} />
    </>
  );
}
