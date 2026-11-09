import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "./resume-document";
import { getResumeProfile, type ResumeVariant } from "./resume-profile";

/** Shared by every `/resume*` route handler so the headers can't drift. */
export async function renderResumePdf(variant: ResumeVariant) {
  const buffer = await renderToBuffer(<ResumeDocument variant={variant} />);
  const { fileName } = getResumeProfile(variant);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Content-Type": "application/pdf",
    },
  });
}
