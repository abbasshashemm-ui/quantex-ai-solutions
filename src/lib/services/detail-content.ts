export type ServiceProcessStep = {
  label: string;
  detail: string;
};

export type ServiceDetailContent = {
  highlights: string[];
  deliverables: string[];
  processSteps: ServiceProcessStep[];
};

export const SERVICE_DETAIL: Record<string, ServiceDetailContent> = {
  software: {
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
  automation: {
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
  architecture: {
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
  websites: {
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
  seo: {
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
  chatbots: {
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
};

export function getServiceDetailContent(serviceId: string): ServiceDetailContent {
  return (
    SERVICE_DETAIL[serviceId] ?? {
      highlights: [],
      deliverables: [],
      processSteps: [],
    }
  );
}
