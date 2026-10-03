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
    id: "websites",
    slug: "high-converting-websites",
    title: "HIGH-CONVERTING WEBSITES",
    description:
      "Fast, clear websites designed to turn visitors into enquiries.",
    accent: "metallic",
    index: 0,
    nav: {
      label: "Websites",
      tagline: "Fast sites that win customers",
      icon: "monitor",
    },
    overview:
      "Your website is the first conversation a customer has with your business. We build sites that load quickly on every phone, say clearly what you do, and make the next step—call, message or request a quote—impossible to miss.",
    detail: {
      highlights: [
        "Fast on every phone",
        "One clear next step",
        "Found on Google",
      ],
      deliverables: [
        "A fast, mobile-first website designed around one clear goal",
        "Words and layout that explain what you do in seconds",
        "Tracking set up, so you can see which pages bring enquiries",
        "The basics of search visibility built in from day one",
        "A site you can update yourself, or we update it for you",
        "Tested on real phones, tablets and browsers before launch",
      ],
      processSteps: [
        {
          label: "Align",
          detail:
            "We agree who the site is for, what you offer and what visitors should do.",
        },
        {
          label: "Sketch",
          detail: "The key pages are mapped out before any design work begins.",
        },
        {
          label: "Build",
          detail: "Words and design come together in short review rounds.",
        },
        {
          label: "Learn",
          detail:
            "After launch we look at what visitors do and suggest improvements.",
        },
      ],
    },
  },
  {
    id: "chatbots",
    slug: "custom-intelligent-chatbots",
    title: "AI CHATBOTS & ASSISTANTS",
    description:
      "Assistants that know your business, answer customers on your website and WhatsApp, and hand over to you when a person is needed.",
    accent: "grey",
    index: 1,
    nav: {
      label: "AI assistants",
      tagline: "Answers customers on web and WhatsApp",
      icon: "chat",
    },
    overview:
      "A generic chat widget frustrates customers when its answers are wrong or off-brand. We build assistants trained on your own information—your products, prices, policies and tone—so replies stay accurate, sound like you, and pass the conversation to a real person whenever it matters.",
    detail: {
      highlights: [
        "Sounds like you",
        "Hands over to people",
        "Web and WhatsApp",
      ],
      deliverables: [
        "An assistant trained on your products, services and policies",
        "Replies on your website, on WhatsApp, or both",
        "Clear limits on what it will and won't answer, with a handover to you",
        "A record of conversations, so you can see what customers ask",
        "A simple way to update what it knows as your business changes",
        "Links to your booking, CRM or support tools where needed",
      ],
      processSteps: [
        {
          label: "Collect",
          detail:
            "We list the questions customers ask most and what the assistant should never answer.",
        },
        {
          label: "Draft",
          detail: "You read sample conversations and tell us what to change.",
        },
        {
          label: "Test",
          detail:
            "We try it against awkward and unusual questions before it goes live.",
        },
        {
          label: "Improve",
          detail: "We review real conversations and tune the answers.",
        },
      ],
    },
  },
  {
    id: "automation",
    slug: "business-process-automation",
    title: "BUSINESS AUTOMATION",
    description:
      "Repetitive tasks handled automatically, so your team's time goes to customers.",
    accent: "grey",
    index: 2,
    nav: {
      label: "Automation",
      tagline: "Less manual work, fewer mistakes",
      icon: "workflow",
    },
    overview:
      "Copying data between spreadsheets, chasing approvals, forwarding emails—small tasks add up to hours every week. We map how work really moves through your business and automate the repetitive steps, connecting the tools you already use so information is entered once and stays right.",
    detail: {
      highlights: ["Fewer manual steps", "Clear visibility", "Clear records"],
      deliverables: [
        "A written map of how your processes work today",
        "Automations that move information between your tools",
        "Approvals and alerts that reach the right person at the right time",
        "A simple dashboard showing what is slowing things down",
        "Tested workflows, with plain instructions for your team",
        "A record of what ran and when, for peace of mind",
      ],
      processSteps: [
        {
          label: "Map",
          detail: "We follow the work and measure how long each step takes.",
        },
        {
          label: "Rank",
          detail:
            "We pick the automations that save the most time for the least risk.",
        },
        {
          label: "Pilot",
          detail: "One team tries it first, before it reaches everyone.",
        },
        {
          label: "Grow",
          detail: "We adjust based on feedback until the numbers improve.",
        },
      ],
    },
  },
  {
    id: "software",
    slug: "custom-software-development",
    title: "CUSTOM SOFTWARE",
    description:
      "Software built around the way your business works, not the other way round.",
    accent: "white",
    index: 3,
    nav: {
      label: "Custom software",
      tagline: "Apps and portals built for you",
      icon: "code",
    },
    overview:
      "When off-the-shelf tools don't fit, we build ones that do: internal tools, customer portals, or full products. Each build is scoped in plain language, delivered in stages you can try, and handed over so your team owns it.",
    detail: {
      highlights: [
        "Built for your workflow",
        "Delivered in stages",
        "Yours to keep",
      ],
      deliverables: [
        "A working application designed around how your team works",
        "Different access for staff, customers and administrators",
        "Connections to the other tools you use",
        "Testing on real devices at every stage",
        "Launch support and clear documentation",
        "Optional ongoing help for new features",
      ],
      processSteps: [
        {
          label: "Discover",
          detail:
            "We learn who will use it, what could go wrong and how success will be measured.",
        },
        {
          label: "Prototype",
          detail:
            "The most important screens are tested before the full build.",
        },
        {
          label: "Build",
          detail:
            "Short cycles, with something for you to try at the end of each.",
        },
        {
          label: "Launch",
          detail:
            "We go live together and agree what support looks like afterwards.",
        },
      ],
    },
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO",
    description:
      "We fix what holds your site back on Google, so the right customers can find you.",
    accent: "metallic",
    index: 4,
    nav: {
      label: "SEO",
      tagline: "Get found on Google",
      icon: "search",
    },
    overview:
      "Ranking isn't only about keywords. It depends on whether Google can read your site, whether your pages load quickly, and whether your content answers what people actually search for. We check what search engines and visitors really see, fix the technical problems and gaps, and avoid risky shortcuts or filler content.",
    detail: {
      highlights: ["Site health check", "Faster pages", "Clear reporting"],
      deliverables: [
        "A full health check of your site, with a prioritised list of fixes",
        "Better page titles, descriptions and headings on every key page",
        "Fixes so Google can find and understand your pages",
        "Speed improvements, especially on phones",
        "Search tracking set up, with a starting baseline and monthly reports",
      ],
      processSteps: [
        {
          label: "Check",
          detail:
            "We review how your site is read, how fast it loads and where it ranks today.",
        },
        {
          label: "Fix first",
          detail: "The problems that block Google come first.",
        },
        {
          label: "Improve",
          detail: "Then page structure, speed and the links between pages.",
        },
        {
          label: "Track",
          detail: "A monthly look at how many people see and click your site.",
        },
      ],
    },
  },
  {
    id: "architecture",
    slug: "custom-system-architectures",
    title: "SYSTEM DESIGN",
    description:
      "A clear plan for the technology behind your business, built to grow with you.",
    accent: "white",
    index: 5,
    nav: {
      label: "System design",
      tagline: "A plan that grows with you",
      icon: "layers",
    },
    overview:
      "As a business grows, the technology behind it can start to creak: slow tools, fragile setups, security gaps. We design a plan that fits where you are today and where you're heading, explained in plain language so decision-makers and engineers can both follow it.",
    detail: {
      highlights: ["Plain-language plan", "Built to grow", "Phased steps"],
      deliverables: [
        "A written plan your leadership can actually read",
        "Diagrams showing how everything connects",
        "A safe way to test changes before they go live",
        "Security basics matched to your industry's requirements",
        "Recommendations for hosting, backups and monitoring where in scope",
      ],
      processSteps: [
        {
          label: "Review",
          detail:
            "We look at your current systems, who owns them and what limits them.",
        },
        {
          label: "Test",
          detail: "Risky assumptions are checked with small experiments.",
        },
        {
          label: "Plan",
          detail: "A phased route: stabilise first, then improve, then scale.",
        },
        {
          label: "Agree",
          detail: "We refine it with your team until the next steps are clear.",
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
