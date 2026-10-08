import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { TERMS } from "@/lib/site/legal/terms";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms for using the Quantex AI Solutions website, the free site check, prices and the on-site assistant.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <LegalDocument
        eyebrow="Legal"
        title={TERMS.title}
        lastUpdated={TERMS.lastUpdated}
        intro={TERMS.intro}
        sections={TERMS.sections}
      />
    </>
  );
}
