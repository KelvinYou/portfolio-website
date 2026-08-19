import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

// `resume` is excluded alongside `api`: it is a route handler serving one
// English PDF, so a locale prefix would only produce a 404 for the same bytes.
export const config = {
  matcher: ["/((?!api|resume|_next|_vercel|feed\\.xml|.*\\..*).*)"],
};
