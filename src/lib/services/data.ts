export type NavServiceIcon =
  | "code"
  | "workflow"
  | "layers"
  | "monitor"
  | "search"
  | "chat";

export type ServiceAccent = "white" | "grey" | "metallic";

export type ServiceNav = {
  label: string;
  tagline: string;
  icon: NavServiceIcon;
};

export type ServiceProcessStep = {
  label: string;
  detail: string;
};

export type ServiceDetail = {
  highlights: string[];
  deliverables: string[];
  processSteps: ServiceProcessStep[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  accent: ServiceAccent;
  index: number;
  nav: ServiceNav;
  overview: string;
  detail: ServiceDetail;
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
    overview:
      "We design and build software around your workflows—not templates. From internal tools and client portals to full product platforms, every build is scoped for clarity, owned by your team, and structured so features can ship without rewriting the foundation.",
    detail: {
      highlights: ["Bespoke builds", "Clean handover", "Staged releases"],
      deliverables: [
        "Production-ready application with maintainable architecture",
        "Role-based access, APIs, and integration hooks",
        "QA on real devices with staged release cadence",
        "Deployment support and developer documentation",
        "Optional retainers for post-launch enhancements",
      ],
      processSteps: [
        {
          label: "Discovery",
          detail: "Workshops define users, risks, and success metrics.",
        },
        {
          label: "Prototype",
          detail: "Critical flows validated before full build.",
        },
        {
          label: "Build",
          detail: "Short cycles with demos you can test each sprint.",
        },
        {
          label: "Launch",
          detail: "Monitoring hooks plus a defined support window.",
        },
      ],
    },
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
    overview:
      "Manual handoffs, duplicate data entry, and spreadsheet bridges slow teams down. We map how work actually moves through your business and automate the repetitive steps—connecting CRMs, inboxes, spreadsheets, and custom apps so information flows once and stays accurate.",
    detail: {
      highlights: ["Fewer handoffs", "Live dashboards", "Audit-ready logs"],
      deliverables: [
        "Documented process maps and automation blueprints",
        "Triggers, approvals, and error alerts wired to your stack",
        "Dashboards surfacing bottlenecks in real time",
        "Tested workflows with safe runbooks for your team",
        "Logging and audit trails for compliance needs",
      ],
      processSteps: [
        {
          label: "Map",
          detail: "Shadow workflows and quantify time lost per step.",
        },
        {
          label: "Prioritize",
          detail: "Automations ranked by ROI and implementation risk.",
        },
        {
          label: "Pilot",
          detail: "One team validates before company-wide rollout.",
        },
        {
          label: "Scale",
          detail: "Tune from real feedback until metrics move.",
        },
      ],
    },
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
    overview:
      "Growth exposes weak architecture fast—slow queries, fragile deploys, and security gaps. We design system blueprints that fit your scale today and your roadmap tomorrow: service boundaries, data models, auth, caching, and infrastructure choices explained in plain language for stakeholders and engineers alike.",
    detail: {
      highlights: ["Cloud-native", "Clear ADRs", "Phased migration"],
      deliverables: [
        "Architecture decision records stakeholders can read",
        "Infrastructure diagrams and API contracts",
        "Staging and production environment strategy",
        "Security baselines aligned to your compliance",
        "CI/CD, observability, and reference setups when in scope",
      ],
      processSteps: [
        {
          label: "Audit",
          detail: "Existing systems, owners, and constraints reviewed.",
        },
        {
          label: "Spike",
          detail: "Assumptions stress-tested with focused prototypes.",
        },
        {
          label: "Design",
          detail: "Phased plan: stabilize, optimize, then scale.",
        },
        {
          label: "Sign-off",
          detail: "Engineering reviews until the blueprint is actionable.",
        },
      ],
    },
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
    overview:
      "Your site is the first sales conversation. We craft fast, brand-aligned experiences—landing pages, marketing sites, and product showcases—where layout, copy hierarchy, and motion guide visitors toward one clear action: book a call, request a quote, or start a trial.",
    detail: {
      highlights: ["Core Web Vitals", "Conversion tracking", "SEO-ready"],
      deliverables: [
        "Fast Next.js builds tuned for Core Web Vitals",
        "Analytics, funnels, and conversion tracking configured",
        "SEO structure and consistent design system",
        "CMS or static workflows your team can update",
        "Pre-launch QA across devices, a11y, and browsers",
      ],
      processSteps: [
        {
          label: "Align",
          detail: "Audience, offer, and proof points locked early.",
        },
        {
          label: "Wireframe",
          detail: "Key pages mapped before visual design.",
        },
        {
          label: "Build",
          detail: "Copy and UI refined together in review rounds.",
        },
        {
          label: "Measure",
          detail: "Post-launch funnel review and A/B recommendations.",
        },
      ],
    },
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
    overview:
      "Ranking is not just keywords—it is crawlability, page speed, structured data, and content that matches search intent. We audit what search engines and users actually see, then fix technical blockers and on-page gaps so your site earns visibility without risky shortcuts or filler content.",
    detail: {
      highlights: ["Technical fixes", "Core Web Vitals", "Search Console"],
      deliverables: [
        "Full technical SEO audit with prioritized fix list",
        "Meta titles, descriptions, headings, and schema markup",
        "Sitemap, robots.txt, and indexation cleanup",
        "Page speed and Core Web Vitals improvements",
        "Search Console setup with baseline and monthly reporting",
      ],
      processSteps: [
        {
          label: "Audit",
          detail: "Crawl, speed, and ranking baseline documented.",
        },
        {
          label: "Prioritize",
          detail: "Critical indexation and blocking issues fixed first.",
        },
        {
          label: "Optimize",
          detail: "On-page structure, performance, and internal links.",
        },
        {
          label: "Track",
          detail: "Monthly reviews on impressions, clicks, and queries.",
        },
      ],
    },
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
    overview:
      "Generic chat widgets frustrate users when answers are wrong or off-brand. We build assistants trained on your docs, products, and policies—wired into WhatsApp, web chat, or internal tools—so responses stay accurate, on-tone, and escalated to humans when the situation requires it.",
    detail: {
      highlights: ["On-brand answers", "Human handoff", "Admin controls"],
      deliverables: [
        "Assistant trained on your docs, products, and policies",
        "Guardrails, logging, and escalation to your team",
        "WhatsApp, web chat, or internal tool integrations",
        "CRM, helpdesk, or booking hooks where needed",
        "Admin panel to update knowledge without redeploys",
      ],
      processSteps: [
        {
          label: "Catalog",
          detail: "Top questions, allowed topics, and fallbacks defined.",
        },
        {
          label: "Prototype",
          detail: "Dialogues reviewed with stakeholders.",
        },
        {
          label: "Index",
          detail: "Knowledge tested against edge cases pre-launch.",
        },
        {
          label: "Refine",
          detail: "Resolution rates drive weekly prompt tuning.",
        },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}

export function formatServiceTitle(title: string): string {
  return title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
