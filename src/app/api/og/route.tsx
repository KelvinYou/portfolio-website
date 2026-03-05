import { personalInfo } from "@/constants";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Blog Post";
  const date = searchParams.get("date") ?? "";
  const tags = searchParams.get("tags") ?? "";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "#000000",
          fontFamily: "sans-serif",
        }}
      >
        {/* Cyan accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00F0FF, #6366F1)",
          }}
        />

        {/* Subtle grid pattern */}
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

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: 24,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>

        {/* Date + Tags row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          {formattedDate && (
            <span style={{ color: "#A1A1AA" }}>{formattedDate}</span>
          )}
          {tags && (
            <span style={{ color: "#00F0FF" }}>
              {tags
                .split(",")
                .slice(0, 3)
                .map((t) => t.trim())
                .join(" · ")}
            </span>
          )}
        </div>

        {/* Author bar at bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "auto",
            paddingTop: 40,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00F0FF, #6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#000000",
            }}
          >
            {personalInfo.name.charAt(0)}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 18, color: "#FFFFFF", fontWeight: 600 }}>
              {personalInfo.name}
            </span>
            <span style={{ fontSize: 14, color: "#00F0FF" }}>
              kelvinyou.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
