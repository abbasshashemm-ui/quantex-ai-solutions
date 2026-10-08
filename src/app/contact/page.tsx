import type { Metadata } from "next";
import { ContactPageTracker } from "@/components/analytics/ContactPageTracker";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { CONTACT } from "@/lib/site/contact";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    `Tell Quantex what you need: a website, AI assistant, custom software or automation. Email ${CONTACT.email} or message us on WhatsApp. We reply within 24 hours.`,
  path: "/contact",
  languages: {
    en: absoluteUrl("/contact"),
    ar: absoluteUrl("/ar/contact"),
    fr: absoluteUrl("/fr/contact"),
    "x-default": absoluteUrl("/contact"),
  },
  keywords: ["contact Quantex", "web design Beirut", "get a website quote Lebanon"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPageTracker />
      <ContactSection />
    </>
  );
}
