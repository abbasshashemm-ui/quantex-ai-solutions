/** ASCII assets for the terminal brutalism brand system. */

export const QUANTEX_ASCII = ` ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗███████╗██╗  ██╗
██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝
██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   █████╗   ╚███╔╝
██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗
╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ███████╗██╔╝ ██╗
 ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`;

export const QUANTEX_ASCII_COMPACT = `╔═[ QUANTEX ]═╗
║ CRAWL.INDEX ║
║ RANK.ENGINE ║
╚═════════════╝`;

export const ASCII_GRAPH = `:: GRAPH  SEARCH / CRAWL LATTICE / INDEX TOPOLOGY
································································
                                                                
      ( / )────────( /seo )────────( /cwv )────────( /map )     
        │ \\           │ \\            │  \\            │         
        │  \\          │  \\           │   \\           │         
        │   \\         │   \\          │    \\          │         
      (/blog)────────(/docs)────────( /app )────────( /api )    
        │              │ \\            │              │         
        │              │  \\           │              │         
        │              │   \\          │              │         
      [CRAWL]════════[INDEX]════════[ RANK ]════════[ LIVE ]    
                                                                
································································
  nodes=48,689   edges=102,441   indexed=91.0%   cwv=64.2%`

export const CRAWL_FRONTIER = [
  { label: "DEPTH", value: "∞" },
  { label: "THREADS", value: "256" },
  { label: "QUEUE", value: "14,822" },
  { label: "REDIRECTS", value: "OFF" },
] as const;

export const CRAWL_STATS = [
  { label: "PAGES", bar: 78, value: "78.3%" },
  { label: "INDEX", bar: 91, value: "91.0%" },
  { label: "CWV", bar: 64, value: "64.2%" },
  { label: "SCHEMA", bar: 88, value: "88.5%" },
] as const;

export const PIPELINE_STAGES = [
  { stage: "DISCOVER", status: "OK" },
  { stage: "FETCH", status: "OK" },
  { stage: "PARSE", status: "RUNNING" },
  { stage: "RANK", status: "QUEUED" },
] as const;

export const NODE_ROWS = [
  {
    node: "10.0.0.1",
    degree: "128",
    inlinks: "4,102",
    firstSeen: "2024-03-11T09:14:22Z",
    status: "OK",
  },
  {
    node: "10.0.0.8",
    degree: "64",
    inlinks: "1,887",
    firstSeen: "2024-07-02T18:41:03Z",
    status: "OK",
  },
  {
    node: "10.0.1.4",
    degree: "32",
    inlinks: "902",
    firstSeen: "2025-01-19T12:08:55Z",
    status: "OK",
  },
] as const;

export const HEX_DUMP = `0000  51 55 41 4E 54 45 58 20  43 52 41 57 4C 00 00 FF
0010  49 4E 44 45 58 2E 52 41  4E 4B 2E 00 43 57 56 00
0020  53 45 4F 2E 53 52 43 00  56 49 53 49 42 49 4C 00`;
