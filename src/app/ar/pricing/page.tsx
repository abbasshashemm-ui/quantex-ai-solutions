import type { Metadata } from "next";
import { PricingPageContent } from "@/components/sections/PricingPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { PRICING_AR_PATH, PRICING_FAQ_AR } from "@/lib/pricing/data-ar";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "الأسعار: مواقع وسيو ومساعدو ذكاء اصطناعي في لبنان",
  description:
    "أسعار البداية: مواقع ابتداءً من $700، والسيو من $250 شهرياً، ومساعدو الذكاء الاصطناعي باشتراك. البرمجيات المخصصة والأتمتة تُسعَّر لكل مشروع.",
  path: PRICING_AR_PATH,
  locale: "ar_LB",
  languages: {
    en: absoluteUrl("/pricing"),
    ar: absoluteUrl(PRICING_AR_PATH),
    "x-default": absoluteUrl("/pricing"),
  },
  keywords: [
    "سعر تصميم موقع في لبنان",
    "أسعار السيو لبنان",
    "سعر روبوت دردشة واتساب",
  ],
});

export default function PricingArPage() {
  return (
    <>
      <JsonLd
        data={[
          buildFaqPageSchema([...PRICING_FAQ_AR]),
          buildBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "الأسعار", path: PRICING_AR_PATH },
          ]),
        ]}
      />
      <PricingPageContent lang="ar" />
    </>
  );
}
