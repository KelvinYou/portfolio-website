"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resumeRoute, routes } from "@/constants";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Check, Menu, Settings2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { MONO } from "./section-index";

const THEMES = ["light", "dark", "system"] as const;

/**
 * Theme and language are set once and forgotten, so they sit behind a single
 * control instead of taking two permanent slots in the bar.
 */
function SettingsMenu() {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md",
          "text-muted-foreground transition-colors duration-150",
          "hover:bg-foreground/[0.06] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label={t("settings")}
      >
        <Settings2 className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-lg">
        <DropdownMenuLabel className={cn(MONO, "text-muted-foreground")}>
          {t("theme")}
        </DropdownMenuLabel>
        {THEMES.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setTheme(option)}
            className="justify-between text-[13px]"
          >
            {t(`theme_${option}`)}
            {theme === option && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className={cn(MONO, "text-muted-foreground")}>
          {t("language")}
        </DropdownMenuLabel>
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className="justify-between text-[13px]"
          >
            {tLang(loc)}
            {locale === loc && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavbarActions({ onOpenMenu }: { onOpenMenu: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {/* Pages, kept apart from the in-document index by the rule below. */}
      <div className="hidden items-center gap-1 md:flex">
        {routes.map((route) => {
          const active = pathname.startsWith(route.href);
          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(route.labelKey)}
            </Link>
          );
        })}

        {/* The rule is the split: sections live in the index, pages live here. */}
        <span className="mx-1.5 h-4 w-px bg-border" aria-hidden />

        {/* A plain anchor, not `Link`: /resume is the PDF itself, so this is a
            document request to a new tab and not an in-app navigation. */}
        <a
          href={resumeRoute}
          target="_blank"
          rel="noopener"
          className={cn(
            MONO,
            "rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5",
            "text-foreground transition-colors duration-150",
            "hover:border-primary hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {t("resume")}
        </a>

        <SettingsMenu />
      </div>

      <div className="flex items-center gap-1 md:hidden">
        <a
          href={resumeRoute}
          target="_blank"
          rel="noopener"
          className={cn(
            MONO,
            "rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {t("resume")}
        </a>
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t("open_menu")}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-foreground",
            "transition-colors duration-150 hover:bg-foreground/[0.06]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
