import type { Metadata } from "next";
import { InsightsIndex } from "@/components/sections/InsightsIndex";
import { createPageMetadata, absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "أدلة الذكاء الاصطناعي للشركات في لبنان",
  description:
    "أدلة عملية لاستخدام الذكاء الاصطناعي في الشركات اللبنانية: المطاعم والعيادات والعقارات وغيرها. بقلم فريق كوانتكس في بيروت.",
  path: "/ar/insights",
  locale: "ar_LB",
  languages: {
    en: absoluteUrl("/insights"),
    ar: absoluteUrl("/ar/insights"),
    "x-default": absoluteUrl("/insights"),
  },
  keywords: ["أدلة الذكاء الاصطناعي لبنان", "الذكاء الاصطناعي للشركات"],
});

export default function InsightsPageAr() {
  return <InsightsIndex lang="ar" />;
}
