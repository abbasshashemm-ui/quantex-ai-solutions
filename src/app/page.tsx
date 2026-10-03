import { HomePage } from "@/components/pages/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildHomePageSchemas } from "@/lib/seo/json-ld";
import { SITE } from "@/lib/seo/site";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: SITE.name,
  description:
    "Quantex builds websites that win customers and AI assistants that answer them, plus software, automation and search, for businesses in Lebanon and beyond. We reply within 24 hours.",
  path: "/",
  keywords: [
    "web development Lebanon",
    "AI chatbots Beirut",
    "WhatsApp chatbot Lebanon",
    "website design Beirut",
    "Quantex AI Solutions",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomePageSchemas()} />
      <HomePage />
    </>
  );
}
