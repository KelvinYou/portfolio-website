import { renderResumePdf } from "@/lib/resume/render-resume-pdf";

/**
 * `/resume` IS the PDF — there is no HTML page wrapping it.
 *
 * The previous wrapper embedded this same document in an iframe, which iOS
 * Safari renders as a blank box (and Android Chrome often refuses outright),
 * while on desktop it only cropped the browser's own viewer into a 70vh card.
 * Handing the bytes straight to the browser lets each platform do the thing it
 * already does well: native viewer tab on desktop, system PDF handler or
 * download on mobile. No capability detection, because none is reliable.
 *
 * The URL is deliberately unprefixed and excluded from the next-intl matcher
 * (see `src/middleware.ts`): one English document, one canonical address that
 * stays valid on a printed application form.
 *
 * This is the default (AI product) variant; `/resume/frontend` serves the
 * frontend one.
 */
export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return renderResumePdf("ai-product");
}
