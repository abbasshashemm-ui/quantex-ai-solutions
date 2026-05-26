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
};

export const PROJECTS: Project[] = [
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
  },
];
