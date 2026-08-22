import {
  KY_MARK_PATHS,
  KY_MARK_STROKE_WIDTH,
  KY_MARK_VIEWBOX,
} from "@/components/brand/ky-mark";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#000000";
const ACCENT = "#00F0FF";

/**
 * iOS masks this into a rounded square itself, so it ships as a solid,
 * edge-to-edge background rather than transparent — the same treatment
 * the generated favicon uses, just at home-screen scale.
 */
export default function AppleIcon() {
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
        }}
      >
        <svg
          width={size.width * 0.56}
          height={size.height * 0.56}
          viewBox={KY_MARK_VIEWBOX}
          fill="none"
          stroke={ACCENT}
          strokeWidth={KY_MARK_STROKE_WIDTH}
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {KY_MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
