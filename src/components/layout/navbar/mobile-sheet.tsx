"use client";

import { resumeRoute, routes } from "@/constants";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { MONO, SectionIndexList } from "./section-index";
import type { SectionIndex } from "./use-section-index";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const THEMES = ["light", "dark", "system"] as const;

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        MONO,
        "flex-1 rounded-md border px-2 py-2 transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-border text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

/**
 * A bottom sheet rather than a side drawer: every target lands in thumb reach,
 * which is where the hand already is when the button is tapped.
 */
export function MobileSheet({
  open,
  onClose,
  index,
}: {
  open: boolean;
  onClose: () => void;
  index: SectionIndex;
}) {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className={cn(
              "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto",
              "rounded-t-2xl border-t border-border bg-popover",
              "px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2",
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
          >
            <div
              className="mx-auto mb-3 h-1 w-9 rounded-full bg-foreground/15"
              aria-hidden
            />

            {index.segments.length > 0 && (
              <>
                <p className={cn(MONO, "px-3 pb-1 text-muted-foreground")}>
                  {t("index_label")}
                </p>
                <SectionIndexList
                  index={index}
                  size="roomy"
                  onNavigate={onClose}
                />
                <hr className="my-2 border-border" />
              </>
            )}

            <p className={cn(MONO, "px-3 pb-1 text-muted-foreground")}>
              {t("pages")}
            </p>
            <ul className="flex flex-col">
              {[...routes, { href: resumeRoute, labelKey: "resume" }].map(
                (route) => {
                  const active = pathname.startsWith(route.href);
                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-3 text-[15px]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {t(route.labelKey)}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>

            <hr className="my-2 border-border" />

            <p className={cn(MONO, "px-3 pb-1.5 text-muted-foreground")}>
              {t("theme")}
            </p>
            <div className="flex gap-1.5 px-3">
              {THEMES.map((option) => (
                <Choice
                  key={option}
                  selected={theme === option}
                  onClick={() => setTheme(option)}
                >
                  {t(`theme_${option}`)}
                </Choice>
              ))}
            </div>

            <p className={cn(MONO, "px-3 pb-1.5 pt-3 text-muted-foreground")}>
              {t("language")}
            </p>
            <div className="flex gap-1.5 px-3">
              {locales.map((loc) => (
                <Choice
                  key={loc}
                  selected={locale === loc}
                  onClick={() => {
                    router.replace(pathname, { locale: loc });
                    onClose();
                  }}
                >
                  {tLang(loc)}
                </Choice>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
