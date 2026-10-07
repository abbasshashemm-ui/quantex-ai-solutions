export type Lang = "en" | "ar";

type Base = { title: string; caption: string };

/** Three goals standing on one shared foundation (SEO, AEO, GEO). */
export type FoundationFigure = Base & {
  kind: "foundation";
  winsLabel: string;
  appearsLabel: string;
  columns: { name: string; goal: string; wins: string; appears: string }[];
  foundation: { label: string; items: string[] };
};

/** A left-to-right path of steps that ends in a result. */
export type PathFigure = Base & {
  kind: "path";
  steps: { label: string; detail: string }[];
  result: string;
};

/** Layers listed bottom to top; the top layer is the highlight. */
export type StackFigure = Base & {
  kind: "stack";
  layers: { label: string; detail: string }[];
  hint: string;
};

/** Steps that rise like a staircase. */
export type StairsFigure = Base & {
  kind: "stairs";
  steps: { label: string; detail: string }[];
  start: string;
  end: string;
};

/** A customer message, the assistant, and the two outcomes. */
export type FlowFigure = Base & {
  kind: "flow";
  customer: { label: string; message: string };
  assistant: { label: string; detail: string };
  answered: { label: string; detail: string };
  handover: { label: string; detail: string };
  loop: string;
};

/** What the assistant handles versus what stays with people. */
export type SplitFigure = Base & {
  kind: "split";
  line: string;
  left: { label: string; items: string[] };
  right: { label: string; items: string[] };
};

export type FigureData =
  | FoundationFigure
  | PathFigure
  | StackFigure
  | StairsFigure
  | FlowFigure
  | SplitFigure;

export type PlacedFigure = {
  /** Section id to place it after, or "top" for before the first section. */
  after: string;
  data: FigureData;
};
