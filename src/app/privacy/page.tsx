import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { PRIVACY_POLICY } from "@/lib/site/legal/privacy-policy";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Quantex AI Solutions collects and uses personal information from contact forms, email, WhatsApp, and website analytics.",
  path: "/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalDocument
        eyebrow="Legal"
        title={PRIVACY_POLICY.title}
        lastUpdated={PRIVACY_POLICY.lastUpdated}
        intro={PRIVACY_POLICY.intro}
        sections={PRIVACY_POLICY.sections}
      />
    </>
  );
}
