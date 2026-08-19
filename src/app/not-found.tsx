import { NotFoundShell } from "@/components/not-found-shell";
import { defaultLocale } from "@/i18n/routing";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body>
        <NotFoundShell />
      </body>
    </html>
  );
}
