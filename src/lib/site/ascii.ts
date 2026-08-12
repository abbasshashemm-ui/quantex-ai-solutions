/** ASCII assets for the terminal brutalism brand system. */

export const QUANTEX_ASCII = ` ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗███████╗██╗  ██╗
██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝
██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   █████╗   ╚███╔╝
██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗
╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ███████╗██╔╝ ██╗
 ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`;

export const QUANTEX_ASCII_COMPACT = `╔═[ QUANTEX ]═╗
║ WEB.BUILD   ║
║ AI.CHATBOTS ║
╚═════════════╝`;

export const ASCII_GRAPH = `:: STACK  WEB DEV / AI CHATBOTS / SHIP TO PROD
································································

      [ NEXT ]──────[ DESIGN ]──────[ API ]──────[ CLOUD ]
         │ \\           │ \\            │  \\          │
         │  \\          │  \\           │   \\         │
      [ CMS ]──────[ AUTH ]──────[ DB ]──────[ ANALYTICS ]
         │             │ \\            │            │
         │             │  \\           │            │
      [ BUILD ]════[ CHATBOT ]════[ WHATSAPP ]══[ LIVE ]

································································
  sites=shipped   bots=trained   cwv=green   handoff=human`;

export const BUILD_FRONTIER = [
  { label: "STACK", value: "NEXT" },
  { label: "RUNTIME", value: "EDGE" },
  { label: "BOTS", value: "LIVE" },
  { label: "DEPLOY", value: "CI" },
] as const;

export const BUILD_STATS = [
  { label: "LCP", bar: 92, value: "92%" },
  { label: "INP", bar: 88, value: "88%" },
  { label: "SEO", bar: 95, value: "95%" },
  { label: "BOT", bar: 84, value: "84%" },
] as const;

export const PIPELINE_STAGES = [
  { stage: "DESIGN", status: "OK" },
  { stage: "BUILD", status: "OK" },
  { stage: "TRAIN", status: "RUNNING" },
  { stage: "SHIP", status: "QUEUED" },
] as const;

export const NODE_ROWS = [
  {
    node: "web.site",
    degree: "Next.js",
    inlinks: "CWV",
    firstSeen: "marketing + product",
    status: "OK",
  },
  {
    node: "ai.chat",
    degree: "Gemini",
    inlinks: "Docs",
    firstSeen: "web + WhatsApp",
    status: "OK",
  },
  {
    node: "ops.flow",
    degree: "Automate",
    inlinks: "API",
    firstSeen: "handoff ready",
    status: "OK",
  },
] as const;

export const HEX_DUMP = `0000  51 55 41 4E 54 45 58 20  57 45 42 00 00 00 FF
0010  41 49 2E 43 48 41 54 42  4F 54 00 00 53 48 49 50
0020  4E 45 58 54 2E 4A 53 00  57 48 41 54 53 41 50 50`;
