import type { Metadata } from "next";
import { PricingPageContent } from "@/components/sections/PricingPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { PRICING_FAQ_FR, PRICING_FR_PATH } from "@/lib/i18n/pricing-fr";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Tarifs : sites web, SEO et assistants IA au Liban",
  description:
    "Prix de départ : sites web dès $700, SEO dès $250 par mois, assistants IA sur abonnement. Les logiciels sur mesure et l'automatisation sont chiffrés par projet.",
  path: PRICING_FR_PATH,
  locale: "fr_FR",
  languages: {
    en: absoluteUrl("/pricing"),
    ar: absoluteUrl("/ar/pricing"),
    fr: absoluteUrl(PRICING_FR_PATH),
    "x-default": absoluteUrl("/pricing"),
  },
  keywords: ["prix site web Liban", "tarif SEO Liban", "prix chatbot WhatsApp"],
});

export default function PricingFrPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqPageSchema([...PRICING_FAQ_FR]),
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "Tarifs", path: PRICING_FR_PATH },
          ]),
        ]}
      />
      <PricingPageContent lang="fr" />
    </>
  );
}
