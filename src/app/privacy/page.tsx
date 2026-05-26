import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { PRIVACY_POLICY } from "@/lib/site/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Quantex AI Solutions",
  description:
    "How Quantex AI Solutions collects and uses personal information from contact forms, email, WhatsApp, and website analytics.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title={PRIVACY_POLICY.title}
      lastUpdated={PRIVACY_POLICY.lastUpdated}
      intro={PRIVACY_POLICY.intro}
      sections={PRIVACY_POLICY.sections}
    />
  );
}
