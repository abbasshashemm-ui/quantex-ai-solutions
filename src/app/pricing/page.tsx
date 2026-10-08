import type { Metadata } from "next";
import { PricingPageContent } from "@/components/sections/PricingPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { PRICING_FAQ } from "@/lib/pricing/data";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing: websites, SEO and AI assistants in Lebanon",
  description:
    "Starting prices for websites from $700, SEO from $250 a month and AI assistants on subscription. Custom software and automation are quoted per project.",
  path: "/pricing",
  languages: {
    en: absoluteUrl("/pricing"),
    ar: absoluteUrl("/ar/pricing"),
    "x-default": absoluteUrl("/pricing"),
  },
  keywords: ["website cost Lebanon", "SEO price Lebanon", "AI chatbot cost Lebanon"],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqPageSchema([...PRICING_FAQ]),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <PricingPageContent />
    </>
  );
}
