import type { Metadata } from "next";
import { ContactPageShell } from "@/components/layout/ContactPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";
import { CONTACT } from "@/lib/site/contact";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    `Contact Quantex AI Solutions about web design, custom software, AI chatbots, and automation. Email ${CONTACT.email} or message on WhatsApp—we respond within 24 hours.`,
  path: "/contact",
  keywords: ["contact Quantex", "hire web developer Beirut", "AI agency Lebanon"],
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
      <ContactPageShell />
    </>
  );
}
