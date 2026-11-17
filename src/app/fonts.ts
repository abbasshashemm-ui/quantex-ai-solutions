import localFont from "next/font/local";

/**
 * The site's typefaces, served from files in src/fonts so a build never
 * depends on downloading them. See src/fonts/README.md.
 */

export const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "../fonts/outfit-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/outfit-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/outfit-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

// Only the weights the design uses: each one is a preloaded file.
export const condensed = localFont({
  variable: "--font-condensed",
  display: "swap",
  src: [
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-800-italic.woff2", weight: "800", style: "italic" },
  ],
});

/**
 * Arabic only. It is not preloaded, and the unicode range means the browser
 * fetches it only when Arabic text is actually on the page; Latin text on
 * Arabic pages falls through to the other two families.
 */
export const arabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  preload: false,
  src: [
    { path: "../fonts/cairo-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cairo-arabic-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cairo-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EC2-10EC4,U+10EFC-10EFF,U+1EE00-1EEF1",
    },
  ],
});

export const fontVariables = `${outfit.variable} ${condensed.variable} ${arabic.variable}`;
