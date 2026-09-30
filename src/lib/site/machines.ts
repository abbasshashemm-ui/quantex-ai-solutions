export type MachineTone = "ink" | "paper" | "studio";

export type Machine = {
  src: string;
  alt: string;
  tone: MachineTone;
  position: string;
  /** full: the device fills the frame and needs a heavier text scrim */
  cover: "open" | "full";
};

export const MACHINES = {
  chassis: {
    src: "/brand/chassis.jpg",
    alt: "Machined aluminum Quantex chassis with orange end caps on a grey studio sweep",
    tone: "studio",
    position: "right center",
    cover: "open",
  },
  switches: {
    src: "/brand/switches.jpg",
    alt: "Brushed-metal Quantex panel with orange toggle switches and braided cables",
    tone: "ink",
    position: "center center",
    cover: "full",
  },
  bots: {
    src: "/brand/bots.jpg",
    alt: "Champagne-gold Quantex instrument with an amber stack-link readout",
    tone: "paper",
    position: "right center",
    cover: "open",
  },
  handheld: {
    src: "/brand/handheld.jpg",
    alt: "Silver Quantex handheld on a white field, screen reading we build digital machines",
    tone: "paper",
    position: "right center",
    cover: "open",
  },
  controller: {
    src: "/brand/controller.jpg",
    alt: "Silver Quantex controller deck with knobs, keys, and an orange edge light",
    tone: "ink",
    position: "center bottom",
    cover: "full",
  },
  toggles: {
    src: "/brand/toggles.jpg",
    alt: "Close-up of orange toggle switches and amber LEDs on a silver panel",
    tone: "ink",
    position: "center center",
    cover: "full",
  },
  knob: {
    src: "/brand/knob.jpg",
    alt: "Close-up of knurled metal knobs with amber indicator LEDs",
    tone: "ink",
    position: "center center",
    cover: "full",
  },
  vents: {
    src: "/brand/vents.jpg",
    alt: "Ventilation slots and an orange latch on a machined aluminum chassis",
    tone: "studio",
    position: "center center",
    cover: "full",
  },
  readout: {
    src: "/brand/readout.jpg",
    alt: "Amber readout on a Quantex faceplate that says stack link active",
    tone: "paper",
    position: "center center",
    cover: "open",
  },
} as const satisfies Record<string, Machine>;

export type MachineId = keyof typeof MACHINES;

export const SERVICE_PLATES: Record<
  string,
  { machine: MachineId | null; slogan: string }
> = {
  websites: {
    machine: "handheld",
    slogan: "Websites designed to convert.",
  },
  automation: {
    machine: "switches",
    slogan: "Automate everything. Maximize throughput.",
  },
  chatbots: {
    machine: "bots",
    slogan: "Intelligent bots. Wired to your stack.",
  },
  software: {
    machine: "controller",
    slogan: "Tailored code. Zero limitations.",
  },
  architecture: {
    machine: "vents",
    slogan: "Unshakable cloud foundations.",
  },
  seo: {
    machine: null,
    slogan: "Search. Engineered at the source.",
  },
};

export const HOME_SERVICE_ORDER = [
  "websites",
  "automation",
  "chatbots",
  "software",
  "architecture",
  "seo",
] as const;
