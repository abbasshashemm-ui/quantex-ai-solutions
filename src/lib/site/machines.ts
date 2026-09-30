export type Figure = {
  src: string;
  alt: string;
};

export const FIGURES = {
  chassis: {
    src: "/brand/chassis.jpg",
    alt: "Silver Quantex chassis with orange end caps",
  },
  switches: {
    src: "/brand/switches.jpg",
    alt: "Silver Quantex panel with orange toggle switches",
  },
  bots: {
    src: "/brand/bots.jpg",
    alt: "Brass Quantex instrument with an amber readout",
  },
  handheld: {
    src: "/brand/handheld.jpg",
    alt: "Silver Quantex handheld",
  },
  controller: {
    src: "/brand/controller.jpg",
    alt: "Silver Quantex controller with an orange edge light",
  },
} as const satisfies Record<string, Figure>;

export type FigureId = keyof typeof FIGURES;

export const SERVICE_FIGURE: Record<string, FigureId | null> = {
  software: "controller",
  automation: "switches",
  architecture: "chassis",
  websites: "handheld",
  seo: null,
  chatbots: "bots",
};
