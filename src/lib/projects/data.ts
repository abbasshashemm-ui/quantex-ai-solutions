export type ProjectTag = string;

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  href?: string;
  tags: ProjectTag[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const FEATURED_PROJECT_IDS = [
  "almanya",
  "chandelier-solderie",
  "shop-pro",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "chandelier-solderie",
    slug: "chandelier-solderie",
    title: "Chandelier Solderie",
    description:
      "Luxury lighting atelier site for a Lebanon-based brand—curated chandeliers, pendants, and sculptural lighting.",
    url: "chandelier-solderie.vercel.app",
    href: "https://chandelier-solderie.vercel.app/",
    tags: ["WEBSITE", "LUXURY"],
    imageSrc: "/projects/chandelier-solderie.png",
    imageAlt: "Chandelier Solderie luxury lighting website preview",
    imageWidth: 1024,
    imageHeight: 487,
  },
  {
    id: "hmayed",
    slug: "hmayed",
    title: "Hmayed",
    description:
      "Portfolio for a content creator—cinema, restaurant work, and brand presence in one immersive site.",
    url: "hmayed.online",
    href: "https://hmayed.online",
    tags: ["PORTFOLIO", "WEB"],
    imageSrc: "/projects/hmayed.png",
    imageAlt: "Hmayed portfolio website preview",
    imageWidth: 1024,
    imageHeight: 487,
  },
  {
    id: "shop-pro",
    slug: "shop-pro",
    title: "Shop Pro",
    description:
      "Custom sales and stock app built for Hachem Services—orders, inventory, dashboards, and day-to-day operations.",
    url: "Hachem Services · internal",
    tags: ["CUSTOM APP", "SALES & STOCK"],
    imageSrc: "/projects/shop-pro.png",
    imageAlt: "Shop Pro sales and stock dashboard preview",
    imageWidth: 1024,
    imageHeight: 524,
  },
  {
    id: "almanya",
    slug: "almanya-lubricants",
    title: "Almanya Lubricants Factory",
    description:
      "Website for an industrial lubricants manufacturer in Egypt—product line, certificates, and quote requests.",
    url: "almanya-luboil.com",
    href: "https://almanya-luboil.com",
    tags: ["WEBSITE", "INDUSTRIAL"],
    imageSrc: "/projects/almanya.png",
    imageAlt: "Almanya Lubricants Factory website preview",
    imageWidth: 1024,
    imageHeight: 482,
  },
  {
    id: "trago",
    slug: "trago",
    title: "TRAGO house",
    description:
      "Digital-to-physical fabrication site for DTF and plexiglass—upload a canvas and craft tangible pieces.",
    url: "TRAGO house",
    tags: ["WEBSITE", "FABRICATION"],
    imageSrc: "/projects/trago.png",
    imageAlt: "TRAGO house website preview",
    imageWidth: 1024,
    imageHeight: 475,
  },
];

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_IDS.flatMap((id) =>
    PROJECTS.filter((project) => project.id === id),
  );
}

export function getAdditionalProjects(): Project[] {
  const featured = new Set<string>(FEATURED_PROJECT_IDS);
  return PROJECTS.filter((project) => !featured.has(project.id));
}
