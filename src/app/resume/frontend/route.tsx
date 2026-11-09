import { renderResumePdf } from "@/lib/resume/render-resume-pdf";

/** Frontend-role variant of `/resume`. Same document, different framing. */
export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return renderResumePdf("frontend");
}
