/**
 * Public copy for the EACML Copilot project. Written from the project's own
 * report, keeping to what is safe to publish: what it does and how it is
 * built, not the client's open issues or internal status.
 */
import type { PathFigure } from "@/lib/figures/types";

export const EACML_PATH = "/work/eacml-copilot";

/** Who does what between the drawing and the decision. */
export const EACML_FIGURE: PathFigure = {
  kind: "path",
  title: "From drawing to decision",
  caption: "The engine measures, the AI explains, and a person decides.",
  steps: [
    { label: "Drawings in", detail: "A package of 30 to 50 sheets: PDF, DXF or DWG." },
    { label: "Rules engine", detail: "Measures the geometry and produces every pass and fail." },
    { label: "AI assistant", detail: "Explains the findings and asks questions. It never decides." },
    { label: "Officer", detail: "Reviews the evidence, resolves or waives each item." },
  ],
  result: "Every action logged",
};

export const EACML = {
  title: "EACML Copilot",
  eyebrow: "Flagship project · In development",
  pitch:
    "An on-premises AI platform that checks concept drawing packages against planning and building regulations, and helps case officers review the results.",
  seoTitle: "EACML Copilot: AI Regulation Checking for Drawing Packages",
  description:
    "EACML Copilot is an on-premises AI platform by Quantex that checks concept drawing packages against planning and building regulations, with a deterministic rules engine and a full audit log. In development.",
  stats: [
    { value: "92", label: "Regulation rules mapped" },
    { value: "30–50", label: "Sheets in a typical package" },
    { value: "3", label: "Drawing formats: PDF, DXF, DWG" },
    { value: "1 mm", label: "Measurement precision, no margin" },
  ],
  problem: {
    title: "A review that starts with hours of measuring.",
    body: [
      "Case officers receive concept packages of 30 to 50 drawings. Much of the first review is mechanical: setbacks, parking stall sizes, stair and corridor widths. It is careful, repetitive work, and it has to be done the same way every time.",
      "EACML Copilot does that part consistently and shows its working, so officers spend their time on judgement.",
    ],
  },
  steps: [
    { label: "Upload", detail: "A submitter uploads the package. The file type is checked by its content and the file is fingerprinted." },
    { label: "Read", detail: "Sheets are identified from their title blocks. Layers, units and the real scale of each drawing are recovered." },
    { label: "Interpret", detail: "Loose lines from exported PDFs are joined into outlines and checked against figures printed on the sheet. If it cannot be proven, it asks." },
    { label: "Check", detail: "A rules engine measures the drawing and compares it with each regulation, citing the clause and page." },
    { label: "Review", detail: "The officer sees every finding with clickable evidence on the drawing, resolves or waives items, and answers questions. Every action is logged." },
  ],
  principle: {
    eyebrow: "The one rule",
    title: "The AI never decides.",
    body: "A deterministic rules engine produces every pass and fail. The AI explains, proposes and asks questions. And if the platform cannot measure something reliably, the answer is not a guess: it is CANNOT VERIFY, and a person decides.",
    states: [
      { name: "PASS", detail: "Measured from the drawing, within the limit." },
      { name: "FAIL", detail: "Measured, outside the limit. No margin added." },
      { name: "CANNOT VERIFY", detail: "An input is missing or unproven. A person decides." },
      { name: "NOT APPLICABLE", detail: "The rule's condition does not hold for this drawing." },
    ],
  },
  does: [
    "Reads packages of vector PDF, DXF and DWG drawings and measures the geometry.",
    "Checks each regulation rule, with its clause and printed page, and shows evidence you can click on in the drawing.",
    "Keeps the officer's decisions beside the engine's result, with name and reason.",
    "Answers rules questions from the regulation text, with citations, and refers unresolved points to the authority.",
    "Asks the officer when a drawing is unclear, instead of guessing.",
  ],
  doesNot: [
    "Issue a formal rejection: its output is a set of observations for a person to act on.",
    "Let an AI model decide any finding.",
    "Send data outside the building.",
    "Replace the specialist technical reports, which stay with people.",
  ],
  secure: {
    title: "Built for sensitive, regulated work.",
    items: [
      { title: "On-premises", body: "It runs inside the organisation and talks only to a model on the same machine or a private address. Nothing leaves the building." },
      { title: "Fully auditable", body: "Every officer action is logged with a name and a reason, in a tamper-evident audit log." },
      { title: "AI with guardrails", body: "Everything the AI writes is checked by validators: no invented numbers, no rule ids it was not given, no advice. If it fails, the report is held, not replaced." },
      { title: "Role-based", body: "Submitters, case officers and administrators each see and do only what their role allows." },
    ],
  },
  build: {
    title: "A serious build.",
    items: [
      "A rules engine with every rule written as data, so a change to a regulation is a reviewed change to a file.",
      "An interpretation layer that rebuilds what a drawing means, proves it where it can, and asks where it cannot.",
      "An AI review agent that works through a checklist using measuring and searching tools, with its numbers checked.",
      "A web portal for submitters, officers and administrators, in light and dark themes.",
      "More than 300 automated tests, and 20 recorded design decisions.",
    ],
  },
  status: {
    title: "Where it stands.",
    body: "The checking engine, the portal and the interpretation layer work today. EACML Copilot is in development, with the remaining work focused on the regulatory rulings and data it depends on and on going live.",
  },
  cta: {
    title: "Need AI for regulated or high-stakes work?",
    lead: "We build systems that explain their working, never guess, and keep a person in charge. Tell us what you need to check, review or automate.",
  },
} as const;
