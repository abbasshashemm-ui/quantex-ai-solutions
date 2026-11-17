/**
 * A small line drawing for each service, in the same hand as the illustrated
 * interfaces on the service pages. Drawn in the current text colour with the
 * signal green for the one thing that matters in each.
 */
const GLYPHS: Record<string, React.ReactNode> = {
  // A browser window: a headline, text and one button.
  "high-converting-websites": (
    <>
      <rect x="6" y="8" width="148" height="84" rx="5" />
      <path d="M6 24h148" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 42h62M20 54h44" strokeWidth="5" />
      <rect className="glyph-signal" x="20" y="68" width="38" height="12" rx="3" />
      <rect x="100" y="36" width="42" height="44" rx="3" />
    </>
  ),
  // Two messages and a reply.
  "custom-intelligent-chatbots": (
    <>
      <rect x="8" y="10" width="78" height="24" rx="10" />
      <rect className="glyph-signal" x="60" y="42" width="92" height="24" rx="10" />
      <rect x="8" y="74" width="56" height="20" rx="10" />
      <path d="M20 22h46M72 54h62M20 84h28" />
    </>
  ),
  // One trigger fans out to three finished steps.
  "business-process-automation": (
    <>
      <rect x="6" y="38" width="38" height="24" rx="4" />
      <path d="M44 50h22M66 50V20h22M66 50v30h22M66 50h22" />
      <rect x="88" y="10" width="46" height="20" rx="4" />
      <rect x="88" y="40" width="46" height="20" rx="4" />
      <rect x="88" y="70" width="46" height="20" rx="4" />
      <path className="glyph-signal-line" d="M142 20l4 4 7-8M142 50l4 4 7-8M142 80l4 4 7-8" />
    </>
  ),
  // A dashboard: side rail, figures and a chart.
  "custom-software-development": (
    <>
      <rect x="6" y="8" width="148" height="84" rx="5" />
      <path d="M40 8v84M14 22h18M14 34h18M14 46h18" />
      <rect x="50" y="18" width="28" height="18" rx="3" />
      <rect x="84" y="18" width="28" height="18" rx="3" />
      <rect x="118" y="18" width="28" height="18" rx="3" />
      <path className="glyph-signal-line" d="M50 80l20-14 18 8 22-22 36-6" />
    </>
  ),
  // A search bar and results, the top one marked.
  seo: (
    <>
      <rect x="6" y="8" width="148" height="22" rx="11" />
      <circle cx="22" cy="19" r="5" />
      <path d="M26 23l5 5M40 19h70" />
      <rect className="glyph-signal" x="6" y="42" width="6" height="14" rx="2" />
      <path d="M20 45h86M20 53h52" />
      <path d="M20 68h74M20 76h44M20 88h80" opacity="0.5" />
    </>
  ),
  // Three layers with one core.
  "custom-system-architectures": (
    <>
      <rect x="8" y="8" width="40" height="18" rx="3" />
      <rect x="60" y="8" width="40" height="18" rx="3" />
      <rect x="112" y="8" width="40" height="18" rx="3" />
      <path d="M28 26v14M80 26v14M132 26v14M28 60v14M80 60v14M132 60v14" />
      <rect className="glyph-signal" x="8" y="40" width="144" height="20" rx="4" />
      <rect x="8" y="74" width="40" height="18" rx="3" />
      <rect x="60" y="74" width="40" height="18" rx="3" />
      <rect x="112" y="74" width="40" height="18" rx="3" />
    </>
  ),
};

export function ServiceGlyph({ slug, className = "" }: { slug: string; className?: string }) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;
  return (
    <svg
      className={`service-glyph ${className}`.trim()}
      viewBox="0 0 160 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {glyph}
    </svg>
  );
}
