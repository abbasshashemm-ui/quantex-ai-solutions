import { SERVICES, type Service } from "@/lib/services/data";
import { SITE_FAQ, type FaqItem } from "./faq";
import { absoluteUrl } from "./metadata";
import { SITE, getSiteUrl } from "./site";
import { PRODUCT } from "@/lib/site/product";

type JsonLd = Record<string, unknown>;

export function buildPersonSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${getSiteUrl()}/#founder`,
    name: SITE.founder,
    jobTitle: "Full Stack Developer",
    url: absoluteUrl("/about"),
    worksFor: { "@id": `${getSiteUrl()}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
  };
}

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
    founder: { "@id": `${getSiteUrl()}/#founder` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    sameAs: [SITE.social.instagram, SITE.social.linkedin],
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
  };
}

export function buildOfferCatalogSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${getSiteUrl()}/#offer-catalog`,
    name: `${SITE.name} services`,
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.nav.label,
        description: service.description,
        url: absoluteUrl(`/services/${service.slug}`),
      },
    })),
  };
}

export function buildProductSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${getSiteUrl()}/#${PRODUCT.id}`,
    name: PRODUCT.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: PRODUCT.tagline,
    url: absoluteUrl(PRODUCT.href),
    offers: {
      "@type": "Offer",
      price: String(PRODUCT.priceUsd),
      priceCurrency: PRODUCT.currency,
      url: absoluteUrl(PRODUCT.href),
      availability: "https://schema.org/InStock",
    },
    provider: { "@id": `${getSiteUrl()}/#organization` },
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
    priceRange: PRODUCT.priceLabel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    parentOrganization: { "@id": `${getSiteUrl()}/#organization` },
    hasOfferCatalog: { "@id": `${getSiteUrl()}/#offer-catalog` },
    makesOffer: {
      "@type": "Offer",
      name: PRODUCT.name,
      price: String(PRODUCT.priceUsd),
      priceCurrency: PRODUCT.currency,
      url: absoluteUrl(PRODUCT.href),
      availability: "https://schema.org/InStock",
    },
    areaServed: ["Beirut", "Lebanon", "Middle East"],
    knowsAbout: [
      "Custom software development",
      "Artificial intelligence chatbots",
      "Web development",
      "Business process automation",
      "Technical SEO",
      "Cloud system architecture",
      "Next.js",
      "Core Web Vitals",
      "Google Search Console",
    ],
  };
}

export function buildWebPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${getSiteUrl()}/#webpage`,
    url: getSiteUrl(),
    name: SITE.name,
    description: SITE.description,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".aeo-answer", ".faq-section"],
    },
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

export function buildHomePageSchemas(): JsonLd[] {
  return [buildFaqPageSchema(), buildWebPageSchema()];
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
  const isProduct = service.slug === PRODUCT.serviceSlug;

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
    offers: isProduct
      ? {
          "@type": "Offer",
          name: PRODUCT.name,
          price: String(PRODUCT.priceUsd),
          priceCurrency: PRODUCT.currency,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(PRODUCT.href),
        }
      : {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: absoluteUrl("/contact"),
        },
  };
}

export function buildGlobalSchemas(): JsonLd[] {
  return [
    buildPersonSchema(),
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildProductSchema(),
    buildOfferCatalogSchema(),
    buildProfessionalServiceSchema(),
  ];
}
