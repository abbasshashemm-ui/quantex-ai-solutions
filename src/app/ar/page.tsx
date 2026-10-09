import type { Metadata } from "next";
import { LocalizedHomePage } from "@/components/pages/LocalizedHomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocaleContent } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildFaqPageSchema } from "@/lib/seo/json-ld";

const LOCALE = "ar" as const;
const c = getLocaleContent(LOCALE);

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: c.home.metaTitle,
  description: c.home.metaDescription,
  path: "/ar",
  locale: c.ogLocale,
  languages: {
    en: absoluteUrl("/"),
    ar: absoluteUrl("/ar"),
    fr: absoluteUrl("/fr"),
    "x-default": absoluteUrl("/"),
  },
});

export default function Page() {
  return (
    <>
      <JsonLd data={[buildFaqPageSchema(c.home.faq.items)]} />
      <LocalizedHomePage locale={LOCALE} />
    </>
  );
}
