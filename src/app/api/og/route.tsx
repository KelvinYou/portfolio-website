import {
  KY_MARK_PATHS,
  KY_MARK_STROKE_WIDTH,
  KY_MARK_VIEWBOX,
} from "@/components/brand/ky-mark";
import { domainPath, personalInfo } from "@/constants";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

/* The card is drawn from the site's own tokens, not ad-hoc hexes. The previous
   version faded the accent into #6366F1, an indigo that appears nowhere in
   globals.css — the card and the site had quietly drifted apart. */
const INK = "#000000"; // --background (dark)
const PAPER = "#E8E8E8"; // --foreground (dark)
const MUTED = "#A1A1AA"; // --muted-foreground (dark)
const ACCENT = "#00F0FF"; // --primary

/**
 * The navbar mark, rendered through satori. The path data is imported rather
 * than copied, so the logo in the header and the logo on every shared link can
 * never fall out of step.
 */
function KyMark({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={KY_MARK_VIEWBOX}
      fill="none"
      stroke={color}
      strokeWidth={KY_MARK_STROKE_WIDTH}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {KY_MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** The header lockup: mark + wordmark, at the navbar's proportions. */
function Lockup({ size }: { size: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.42 }}>
      <KyMark size={size} color={PAPER} />
      <span
        style={{
          fontSize: size * 0.68,
          fontWeight: 600,
          color: PAPER,
          textTransform: "uppercase",
          letterSpacing: `${size * 0.062}px`,
        }}
      >
        {personalInfo.name}
      </span>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const date = searchParams.get("date") ?? "";
  const tags = searchParams.get("tags") ?? "";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const host = domainPath.replace(/^https?:\/\//, "");

  /* Satori collapses a React fragment into a single row-direction flex item, so
     each branch returns one explicit column instead of a fragment. */
  const content = title ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        padding: 60,
      }}
    >
      {/* Headline block takes the free height and centres in it, so the
          signature can stay pinned to the baseline of the card. */}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 700,
            color: PAPER,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 22,
            marginTop: 24,
          }}
        >
          {formattedDate ? (
            <span style={{ color: MUTED }}>{formattedDate}</span>
          ) : null}
          {tags ? (
            <span style={{ color: ACCENT }}>
              {tags
                .split(",")
                .slice(0, 3)
                .map((t) => t.trim())
                .join(" · ")}
            </span>
          ) : null}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: 44,
        }}
      >
        <Lockup size={26} />
        <span style={{ fontSize: 18, color: ACCENT }}>{host}</span>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 60,
      }}
    >
      {/* Site card: the mark leads, solid, at a size that still reads once a
          feed has shrunk this to a thumbnail. */}
      <div style={{ display: "flex" }}>
        <KyMark size={104} color={PAPER} />
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: PAPER,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          marginTop: 34,
        }}
      >
        {personalInfo.name}
      </div>
      <div
        style={{
          fontSize: 28,
          color: MUTED,
          letterSpacing: "-0.01em",
          marginTop: 20,
          maxWidth: 820,
        }}
      >
        {personalInfo.title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 38,
          fontSize: 20,
          color: ACCENT,
        }}
      >
        <div
          style={{ display: "flex", width: 30, height: 2, background: ACCENT }}
        />
        {host}
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          fontFamily: "sans-serif",
        }}
      >
        {/* Hard cyan rule, not a gradient — the accent is one colour here. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: ACCENT,
          }}
        />

        {/* Grid texture, same 40px cell as the site's spatial background. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* The mark again, oversized and bleeding off the top-right corner.
            It fills the dead half of a 1200×630 canvas without competing with
            the copy, and it is the one piece of furniture both card variants
            share — the same glyph as the navbar, just used as texture. */}
        <div
          style={{
            position: "absolute",
            top: -130,
            right: -110,
            display: "flex",
            opacity: 0.09,
          }}
        >
          <KyMark size={500} color={PAPER} />
        </div>

        {content}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
