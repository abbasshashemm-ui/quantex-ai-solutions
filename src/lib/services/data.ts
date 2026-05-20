import type { NavServiceIcon } from "./icons";

export type ServiceAccent = "white" | "grey" | "metallic";

export type ServiceNav = {
  label: string;
  tagline: string;
  icon: NavServiceIcon;
};

export type ServiceContentSection = {
  title: string;
  body: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  accent: ServiceAccent;
  index: number;
  nav: ServiceNav;
  sections: ServiceContentSection[];
};

export const SERVICES: Service[] = [
  {
    id: "software",
    slug: "custom-software-development",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    description:
      "Bespoke applications engineered for scale, security, and long-term maintainability.",
    accent: "white",
    index: 0,
    nav: {
      label: "Custom software",
      tagline: "Dashboards, portals & bespoke apps",
      icon: "code",
    },
    sections: [
      {
        title: "Overview",
        body: "We design and build software around your workflows—not templates. From internal tools and client portals to full product platforms, every build is scoped for clarity, owned by your team, and structured so features can ship without rewriting the foundation.",
      },
      {
        title: "What you get",
        body: "A production-ready application with clean architecture, role-based access, API integrations, and documentation your developers can extend. You receive staged releases, QA on real devices, deployment support, and handover materials so operations are not dependent on us long term.",
      },
      {
        title: "How we work",
        body: "Discovery workshops define users, risks, and success metrics. We prototype critical flows, agree milestones, then iterate in short build cycles with demos you can test. Launch includes monitoring hooks and a support window; optional retainers cover enhancements after go-live.",
      },
    ],
  },
  {
    id: "automation",
    slug: "business-process-automation",
    title: "BUSINESS PROCESS AUTOMATION",
    description:
      "Intelligent workflows that eliminate friction and accelerate operational throughput.",
    accent: "grey",
    index: 1,
    nav: {
      label: "Process automation",
      tagline: "Workflows, integrations & throughput",
      icon: "workflow",
    },
    sections: [
      {
        title: "Overview",
        body: "Manual handoffs, duplicate data entry, and spreadsheet bridges slow teams down. We map how work actually moves through your business and automate the repetitive steps—connecting CRMs, inboxes, spreadsheets, and custom apps so information flows once and stays accurate.",
      },
      {
        title: "What you get",
        body: "Documented process maps, automated triggers and approvals, error alerts, and dashboards that show bottlenecks in real time. Deliverables include tested workflows (Zapier, Make, custom scripts, or in-app logic), logging for audits, and runbooks so your staff can adjust rules safely.",
      },
      {
        title: "How we work",
        body: "We shadow current workflows, quantify time lost per step, and prioritize automations by ROI. Pilots run on one team before wider rollout. Each phase is validated with real data, then tuned from feedback—so automation feels invisible to customers but obvious in your metrics.",
      },
    ],
  },
  {
    id: "architecture",
    slug: "custom-system-architectures",
    title: "CUSTOM SYSTEM ARCHITECTURES",
    description:
      "Resilient, cloud-native foundations designed around your data and growth trajectory.",
    accent: "white",
    index: 2,
    nav: {
      label: "System architecture",
      tagline: "Cloud-native foundations & scale",
      icon: "layers",
    },
    sections: [
      {
        title: "Overview",
        body: "Growth exposes weak architecture fast—slow queries, fragile deploys, and security gaps. We design system blueprints that fit your scale today and your roadmap tomorrow: service boundaries, data models, auth, caching, and infrastructure choices explained in plain language for stakeholders and engineers alike.",
      },
      {
        title: "What you get",
        body: "Architecture decision records, infrastructure diagrams, API contracts, environment strategy (staging/production), and security baselines aligned to your compliance needs. Where implementation is in scope, we deliver reference setups, CI/CD patterns, and observability so incidents are visible before users report them.",
      },
      {
        title: "How we work",
        body: "We audit existing systems, interview technical owners, and stress-test assumptions with spike prototypes. Recommendations are phased—stabilize, then optimize, then scale—so migrations do not halt product delivery. Engineering teams stay in the loop with review sessions until the design is signed off and actionable.",
      },
    ],
  },
  {
    id: "websites",
    slug: "high-converting-websites",
    title: "HIGH-CONVERTING WEBSITES",
    description:
      "Immersive, performance-first experiences that turn attention into measurable outcomes.",
    accent: "metallic",
    index: 3,
    nav: {
      label: "High-converting websites",
      tagline: "Performance-first sites that convert",
      icon: "monitor",
    },
    sections: [
      {
        title: "Overview",
        body: "Your site is the first sales conversation. We craft fast, brand-aligned experiences—landing pages, marketing sites, and product showcases—where layout, copy hierarchy, and motion guide visitors toward one clear action: book a call, request a quote, or start a trial.",
      },
      {
        title: "What you get",
        body: "Responsive Next.js builds with Core Web Vitals in mind, analytics and conversion tracking, SEO-ready structure, CMS or static content workflows, and design systems that stay consistent across pages. Assets are optimized for mobile, forms are tested end-to-end, and launch includes DNS/SSL handoff support.",
      },
      {
        title: "How we work",
        body: "We align on audience, offer, and proof points, then wireframe key pages before visual design. Copy and UI refine together in review rounds. Development pairs with content entry; pre-launch checks cover accessibility, speed, and cross-browser behavior. Post-launch, we measure funnels and recommend A/B improvements.",
      },
    ],
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO",
    description:
      "We fix the technical issues that hold your site back on Google—speed, structure, meta tags, and the works.",
    accent: "metallic",
    index: 4,
    nav: {
      label: "SEO",
      tagline: "Technical SEO, speed & search visibility",
      icon: "search",
    },
    sections: [
      {
        title: "Overview",
        body: "Ranking is not just keywords—it is crawlability, page speed, structured data, and content that matches search intent. We audit what search engines and users actually see, then fix technical blockers and on-page gaps so your site earns visibility without risky shortcuts or filler content.",
      },
      {
        title: "What you get",
        body: "Technical SEO remediation, metadata and heading structure, sitemap and robots configuration, Core Web Vitals improvements, and a prioritized roadmap for content and internal linking. You receive before/after reports, Search Console setup, and clear ownership of what your team maintains versus what we implement.",
      },
      {
        title: "How we work",
        body: "We baseline rankings and site health, run crawl and speed diagnostics, then ship fixes in priority order—critical indexation issues first, then performance and on-page polish. Monthly check-ins track impressions, clicks, and key queries; we adjust the plan as competitors and algorithms shift.",
      },
    ],
  },
  {
    id: "chatbots",
    slug: "custom-intelligent-chatbots",
    title: "CUSTOM INTELLIGENT CHATBOTS",
    description:
      "Context-aware assistants that integrate with your stack and elevate customer touchpoints.",
    accent: "grey",
    index: 5,
    nav: {
      label: "Intelligent chatbots",
      tagline: "AI assistants wired to your stack",
      icon: "chat",
    },
    sections: [
      {
        title: "Overview",
        body: "Generic chat widgets frustrate users when answers are wrong or off-brand. We build assistants trained on your docs, products, and policies—wired into WhatsApp, web chat, or internal tools—so responses stay accurate, on-tone, and escalated to humans when the situation requires it.",
      },
      {
        title: "What you get",
        body: "A tailored bot with knowledge base ingestion, guardrails, conversation logging, and handoff flows to your team. Integrations cover your CRM, helpdesk, or booking systems where needed. You receive admin controls to update content, review transcripts, and tune prompts without redeploying the whole site.",
      },
      {
        title: "How we work",
        body: "We catalog top customer questions, define allowed topics and fallback behavior, then prototype dialogues with your stakeholders. Knowledge is indexed and tested against edge cases before go-live. After launch we monitor resolution rates and refine prompts and retrieval so quality improves week over week.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
