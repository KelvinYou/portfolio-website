import { cn } from "@/lib/utils";

/**
 * The KY monogram: a ligature where one 45° stroke is both the K's leg and the
 * Y's left arm, so the two letters share a spine instead of sitting side by
 * side. Hard caps and mitred joins, no curves — same neo-brutalist vocabulary
 * as the rest of the site.
 *
 * These paths are the single source of truth for the mark. The navbar renders
 * them through <KyMark>; the OG card in `app/api/og` imports the raw array and
 * hands it to satori. Edit the geometry here and both stay in sync.
 *
 * Drawn on a 24×24 grid at stroke-width 2.5, which keeps the visual bounds
 * inside the box once the half-stroke is accounted for.
 */
export const KY_MARK_PATHS = [
  // K upper arm → vertex → the shared spine (K's leg is also Y's left arm).
  // One polyline, so the corner is a real mitred join rather than two square
  // caps overlapping and leaving a nub.
  "M10 3L4 9L15 20",
  "M4 3V15", // K stem, crossing the vertex as a clean T-junction
  "M21 14L15 20V22.5", // Y right arm → apex → Y stem
] as const;

export const KY_MARK_VIEWBOX = "0 0 24 24";
export const KY_MARK_STROKE_WIDTH = 2.5;

interface KyMarkProps {
  className?: string;
}

/**
 * Strokes use `currentColor`, so the mark inherits whatever text colour its
 * container sets — including the cyan hover state — with no theme branching.
 */
export function KyMark({ className }: KyMarkProps) {
  return (
    <svg
      viewBox={KY_MARK_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={KY_MARK_STROKE_WIDTH}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {KY_MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
