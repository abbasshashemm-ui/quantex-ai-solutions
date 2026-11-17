import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedServiceDetail } from "@/components/sections/LocalizedServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocaleContent } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services/data";

const LOCALE = "fr" as const;
const content = getLocaleContent(LOCALE);

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = content.services[slug];
  if (!t) return { title: "Not found" };
  return createPageMetadata({
    title: `${t.label} ${content.serviceUi.seoTitleSuffix}`.trim(),
    description: t.overview,
    path: `/${LOCALE}/services/${slug}`,
    locale: content.ogLocale,
    languages: {
      en: absoluteUrl(`/services/${slug}`),
      ar: absoluteUrl(`/ar/services/${slug}`),
      fr: absoluteUrl(`/fr/services/${slug}`),
      "x-default": absoluteUrl(`/services/${slug}`),
    },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const t = content.services[slug];
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: content.about.back, path: `/${LOCALE}` },
            { name: t.label, path: `/${LOCALE}/services/${slug}` },
          ]),
        ]}
      />
      <LocalizedServiceDetail locale={LOCALE} service={service} />
    </>
  );
}
