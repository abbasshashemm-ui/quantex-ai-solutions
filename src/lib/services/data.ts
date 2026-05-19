export type ServiceAccent = "white" | "grey" | "metallic";

export type Service = {
  id: string;
  title: string;
  description: string;
  accent: ServiceAccent;
  index: number;
};

export const SERVICES: Service[] = [
  {
    id: "software",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    description:
      "Bespoke applications engineered for scale, security, and long-term maintainability.",
    accent: "white",
    index: 0,
  },
  {
    id: "automation",
    title: "BUSINESS PROCESS AUTOMATION",
    description:
      "Intelligent workflows that eliminate friction and accelerate operational throughput.",
    accent: "grey",
    index: 1,
  },
  {
    id: "architecture",
    title: "CUSTOM SYSTEM ARCHITECTURES",
    description:
      "Resilient, cloud-native foundations designed around your data and growth trajectory.",
    accent: "white",
    index: 2,
  },
  {
    id: "websites",
    title: "HIGH-CONVERTING WEBSITES",
    description:
      "Immersive, performance-first experiences that turn attention into measurable outcomes.",
    accent: "metallic",
    index: 3,
  },
  {
    id: "chatbots",
    title: "CUSTOM INTELLIGENT CHATBOTS",
    description:
      "Context-aware assistants that integrate with your stack and elevate customer touchpoints.",
    accent: "grey",
    index: 4,
  },
];
