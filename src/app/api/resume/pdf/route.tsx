import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume/resume-document";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Disposition": 'inline; filename="KelvinYou-Resume.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}
