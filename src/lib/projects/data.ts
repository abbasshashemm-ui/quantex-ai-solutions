export type ProjectTag = string;

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Shown in the preview frame: a domain, or a short label when there is no public address. */
  url: string;
  /** Set only when the live site can be linked. */
  href?: string;
  tags: ProjectTag[];
  /** Defaults to live work. "in-progress" projects are shown with a status tag. */
  status?: "live" | "in-progress";
  /** Short facts shown on a lead card. */
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/**
 * Client work shown on the home page, in this order. The first one is shown
 * full width, so it should have a screenshot at least 1900px wide. Hmayed is left out while
 * its site is being redesigned: add "hmayed" back here once the new screenshot
 * is in public/projects.
 */
export const GALLERY_PROJECT_IDS = [
  "bahira",
  "almanya",
  "chandelier-solderie",
  "trago",
  "shop-pro",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "eacml-copilot",
    slug: "eacml-copilot",
    title: "EACML Copilot",
    description:
      "An on-premises AI platform that checks concept drawing packages against planning and building regulations, and helps case officers review the results.",
    url: "On-premises · in development",
    tags: ["AI PLATFORM", "REGULATION", "ON-PREMISES"],
    status: "in-progress",
    highlights: [
      "Reads drawing packages of 30 to 50 sheets (PDF, DXF and DWG) and measures the geometry.",
      "Checks 92 regulation rules, each with its clause and page, and shows the evidence on the drawing.",
      "A rules engine decides every pass or fail. The AI explains and asks questions, and never decides.",
      "Runs entirely on-premises, with an audit log of every officer decision.",
    ],
  },
  {
    id: "bahira",
    slug: "bahira-expeditions",
    title: "Bahira Expeditions",
    description:
      "An interactive 3D trip site for a Beirut expedition company. Visitors travel the route from Kathmandu to Annapurna Base Camp as they scroll, with the altitude tracked live, then reserve a seat.",
    url: "bahiralb.com",
    href: "https://www.bahiralb.com/",
    tags: ["WEBSITE", "INTERACTIVE 3D"],
    imageSrc: "/projects/bahira.webp",
    imageAlt: "Bahira Expeditions website: a 3D mountain landscape with the trip summary and an altitude gauge",
    imageWidth: 1902,
    imageHeight: 867,
  },
  {
    id: "chandelier-solderie",
    slug: "chandelier-solderie",
    title: "Chandelier Solderie",
    description:
      "Luxury lighting atelier site for a Lebanon-based brand—curated chandeliers, pendants, and sculptural lighting.",
    // No public address is shown or linked for this project.
    url: "Luxury lighting · Lebanon",
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
    imageSrc: "/projects/shop-pro.webp",
    imageAlt: "Shop Pro dashboard with sales totals, a revenue chart, sales by category and recent orders",
    imageWidth: 1920,
    imageHeight: 914,
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

export function getGalleryProjects(): Project[] {
  return GALLERY_PROJECT_IDS.flatMap((id) =>
    PROJECTS.filter((project) => project.id === id),
  );
}

/** Client work shown on a service page, by service slug. */
export const SERVICE_PROJECT_IDS: Record<string, readonly string[]> = {
  "high-converting-websites": ["bahira", "almanya", "chandelier-solderie"],
  "custom-software-development": ["shop-pro"],
};
