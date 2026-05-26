import type { Service } from "@/lib/services/data";
import { SITE_FAQ, type FaqItem } from "./faq";
import { absoluteUrl } from "./metadata";
import { SITE, getSiteUrl } from "./site";

type JsonLd = Record<string, unknown>;

export function buildOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: SITE.name,
    url: getSiteUrl(),
    logo: absoluteUrl(SITE.logoPath),
    image: absoluteUrl(SITE.markPath),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    founder: {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: "Full Stack Developer",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    sameAs: [SITE.social.instagram],
    areaServed: ["LB", "Middle East", "Worldwide"],
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: SITE.name,
    url: getSiteUrl(),
    description: SITE.description,
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/contact?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProfessionalServiceSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${getSiteUrl()}/#business`,
    name: SITE.name,
    url: getSiteUrl(),
    image: absoluteUrl(SITE.logoPath),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    parentOrganization: { "@id": `${getSiteUrl()}/#organization` },
    areaServed: ["Beirut", "Lebanon", "Middle East"],
    knowsAbout: [
      "Custom software development",
      "Artificial intelligence chatbots",
      "Web development",
      "Business process automation",
      "Technical SEO",
      "Cloud system architecture",
    ],
  };
}

export function buildFaqPageSchema(items: FaqItem[] = SITE_FAQ): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.nav.label,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${getSiteUrl()}/#organization` },
    areaServed: ["LB", "Middle East", "Worldwide"],
    serviceType: service.title,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact"),
    },
  };
}

export function buildGlobalSchemas(): JsonLd[] {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildProfessionalServiceSchema(),
  ];
}
