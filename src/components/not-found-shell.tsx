import { ThemeProvider } from "@/components/theme-provider";
import { NotFoundView } from "@/components/not-found-view";
import { bodyClassName } from "@/app/fonts";

/**
 * Shared by the two 404 entry points, which differ only in how much document
 * they have to supply around this (see each file's header).
 *
 * The copy is English rather than translated: both entry points render above
 * `[locale]`, where there is no request locale and no next-intl provider —
 * `getLocale()` there throws. NotFoundView still reads the locale prefix off
 * the live pathname, so its links keep a visitor inside /zh or /ms.
 */
export function NotFoundShell() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div
        className={`${bodyClassName} min-h-screen bg-background text-foreground`}
      >
        <NotFoundView
          copy={{
            eyebrow: "Error 404",
            heading: "This route doesn't exist",
            description:
              "The address resolved, the page didn't. It may have moved, or the link that brought you here was never right.",
            attempted: "Requested path",
            suggestionsLabel: "Try instead",
          }}
          primaryAction={{ href: "/", label: "Back to home" }}
          suggestions={[
            { href: "/projects", label: "Projects" },
            { href: "/blog", label: "Writing" },
            { href: "/resume", label: "Resume", unprefixed: true },
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
