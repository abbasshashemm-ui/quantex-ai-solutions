import type { Metadata } from "next";
import { LebanonPageContent } from "@/components/sections/LebanonPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site";
import { LEBANON_PATH, getLebanonContent } from "@/lib/site/lebanon";

const LANG = "en" as "en" | "ar";
const c = getLebanonContent(LANG);

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: c.seoTitle,
  description: c.description,
  path: LEBANON_PATH[LANG],
  locale: LANG === "ar" ? "ar_LB" : undefined,
  languages: {
    en: absoluteUrl(LEBANON_PATH.en),
    ar: absoluteUrl(LEBANON_PATH.ar),
    "x-default": absoluteUrl(LEBANON_PATH.en),
  },
  keywords: c.keywords,
});

export default function Page() {
  const url = absoluteUrl(LEBANON_PATH[LANG]);
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: c.seoTitle,
            description: c.answer.answer,
            inLanguage: LANG,
            isPartOf: { "@id": `${getSiteUrl()}/#website` },
            about: { "@id": `${getSiteUrl()}/#organization` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-answer", ".faq-section"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: c.schemaName,
            serviceType: "Artificial intelligence solutions",
            description: c.answer.answer,
            url,
            provider: { "@id": `${getSiteUrl()}/#organization` },
            areaServed: [
              { "@type": "Country", name: "Lebanon" },
              { "@type": "City", name: "Beirut" },
              { "@type": "City", name: "Tripoli" },
              { "@type": "City", name: "Jounieh" },
              { "@type": "City", name: "Sidon" },
              { "@type": "City", name: "Zahle" },
            ],
          },
          buildFaqPageSchema(c.faq),
          buildBreadcrumbSchema([
            { name: LANG === "ar" ? "الرئيسية" : "Home", path: "/" },
            { name: c.schemaName, path: LEBANON_PATH[LANG] },
          ]),
        ]}
      />
      <LebanonPageContent lang={LANG} />
    </>
  );
}
