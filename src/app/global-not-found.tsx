import type { Metadata } from "next";
import { NotFoundShell } from "@/components/not-found-shell";
import { defaultLocale } from "@/i18n/routing";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Page not found",
  robots: { index: false, follow: false },
};

/**
 * Handles URLs that match no route at all (/123, /nope/deep). These never
 * reach a route segment, so they bypass `[locale]/layout.tsx` and with it the
 * only <html>/<body> in the app — this file has to supply the whole document.
 *
 * `notFound()` calls from inside real routes go to not-found.tsx instead.
 */
export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body>
        <NotFoundShell />
      </body>
    </html>
  );
}
