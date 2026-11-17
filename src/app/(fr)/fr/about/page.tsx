import type { Metadata } from "next";
import { LocalizedAbout } from "@/components/sections/LocalizedAbout";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocaleContent } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildPersonSchema } from "@/lib/seo/json-ld";

const LOCALE = "fr" as const;
const c = getLocaleContent(LOCALE);

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: c.about.metaTitle,
  description: c.about.metaDescription,
  path: "/fr/about",
  locale: c.ogLocale,
  languages: {
    en: absoluteUrl("/about"),
    ar: absoluteUrl("/ar/about"),
    fr: absoluteUrl("/fr/about"),
    "x-default": absoluteUrl("/about"),
  },
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildPersonSchema(),
          buildBreadcrumbSchema([
            { name: c.about.back, path: "/fr" },
            { name: c.about.hero.eyebrow, path: "/fr/about" },
          ]),
        ]}
      />
      <LocalizedAbout locale={LOCALE} />
    </>
  );
}
