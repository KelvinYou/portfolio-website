import {
  KY_MARK_PATHS,
  KY_MARK_STROKE_WIDTH,
  KY_MARK_VIEWBOX,
} from "@/components/brand/ky-mark";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

/**
 * Generated favicon, drawn from the same KY_MARK_PATHS the navbar and OG
 * cards use. Multiple sizes so browsers pick the sharpest one instead of
 * scaling a single 32px raster up or down.
 */
export function generateImageMetadata() {
  return [
    { id: "16", size: { width: 16, height: 16 }, contentType: "image/png" },
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "48", size: { width: 48, height: 48 }, contentType: "image/png" },
  ];
}

const INK = "#000000";
const ACCENT = "#00F0FF";

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  // Stroke scales with the box so the mark stays legible at 16px, where the
  // default 2.5 weight would nearly disappear.
  const strokeWidth = KY_MARK_STROKE_WIDTH * (size <= 16 ? 1.6 : 1.15);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
          borderRadius: size * 0.28,
        }}
      >
        <svg
          width={size * 0.66}
          height={size * 0.66}
          viewBox={KY_MARK_VIEWBOX}
          fill="none"
          stroke={ACCENT}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {KY_MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
