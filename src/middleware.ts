import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

// `resume` is excluded alongside `api`: it is a route handler serving one
// English PDF, so a locale prefix would only produce a 404 for the same bytes.
// `icon`/`apple-icon` are the generated favicon routes (Next serves them at
// `/icon/16`, `/apple-icon`, etc.) — same reasoning, no locale variant exists.
export const config = {
  matcher: [
    "/((?!api|resume|icon|apple-icon|_next|_vercel|feed\\.xml|.*\\..*).*)",
  ],
};
