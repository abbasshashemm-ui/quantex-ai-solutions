/**
 * How the Quantex mark is built in 3D.
 * - tube: round chrome wire (the original).
 * - plate: flat, chamfered plates, like cut sheet metal.
 * - brushed: the same plates in brushed aluminium.
 */
export type MarkStyle = "tube" | "plate" | "brushed";

export const DEFAULT_MARK_STYLE: MarkStyle = "tube";

/** Preview switch: add ?mark=plate or ?mark=brushed to the home page address. */
export function readMarkStyle(): MarkStyle {
  if (typeof window === "undefined") return DEFAULT_MARK_STYLE;
  const value = new URLSearchParams(window.location.search).get("mark");
  return value === "plate" || value === "brushed" || value === "tube"
    ? value
    : DEFAULT_MARK_STYLE;
}
