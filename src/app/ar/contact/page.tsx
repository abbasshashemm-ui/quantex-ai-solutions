import type { Metadata } from "next";
import { ContactPageTracker } from "@/components/analytics/ContactPageTracker";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocaleContent } from "@/lib/i18n";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

const LOCALE = "ar" as const;
const c = getLocaleContent(LOCALE);
const BOOK = "مرحباً كوانتكس، أود حجز مكالمة مدتها 15 دقيقة.";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: c.contact.metaTitle,
  description: c.contact.metaDescription,
  path: "/ar/contact",
  locale: c.ogLocale,
  languages: {
    en: absoluteUrl("/contact"),
    ar: absoluteUrl("/ar/contact"),
    fr: absoluteUrl("/fr/contact"),
    "x-default": absoluteUrl("/contact"),
  },
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: c.contact.back, path: "/ar" },
            { name: c.contact.eyebrow, path: "/ar/contact" },
          ]),
        ]}
      />
      <ContactPageTracker />
      <ContactSection
        copy={c.contact}
        rtl={c.dir === "rtl"}
        bookMessage={BOOK}
        homeHref="/ar"
        solutionsHref="/ar#solutions"
        aboutHref="/ar/about"
        switchLink={{ href: "/contact", label: c.switcher.en, lang: "en" }}
      />
    </>
  );
}
