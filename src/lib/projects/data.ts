export type ProjectTag = string;

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  tags: ProjectTag[];
  /** Placeholder preview variant for CSS-only mock UI */
  previewVariant: "studio" | "commerce" | "saas" | "portal";
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    slug: "brand-studio-site",
    title: "Brand Studio Site",
    description: "Marketing site with portfolio grid and lead capture flows.",
    url: "brandstudio.example",
    tags: ["NEXT.JS", "TAILWIND"],
    previewVariant: "studio",
  },
  {
    id: "project-2",
    slug: "commerce-relaunch",
    title: "Commerce Relaunch",
    description: "Storefront refresh with catalog, checkout, and analytics.",
    url: "commerce.example",
    tags: ["WOOCOMMERCE", "WORDPRESS"],
    previewVariant: "commerce",
  },
  {
    id: "project-3",
    slug: "operations-dashboard",
    title: "Operations Dashboard",
    description: "Internal SaaS for workflows, reporting, and role-based access.",
    url: "opsdash.example",
    tags: ["CUSTOM SOFTWARE", "API"],
    previewVariant: "saas",
  },
  {
    id: "project-4",
    slug: "support-assistant",
    title: "Support Assistant",
    description: "Web chat assistant wired to knowledge base and handoff rules.",
    url: "support.example",
    tags: ["AI CHATBOT", "INTEGRATIONS"],
    previewVariant: "portal",
  },
];
