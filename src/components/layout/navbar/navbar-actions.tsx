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
import { Check, Menu, Monitor, Moon, Settings2, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { MONO } from "./section-index";

const THEMES = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
] as const;

/** Fixed-width left rail: the glyph column is what makes the rows read as a list. */
const RAIL = "flex w-4 shrink-0 items-center justify-center";

/** One row geometry for both groups, so themes and locales share a spine. */
/* `focus:` is Radix's highlight state (pointer + keyboard). Both overrides are
   load-bearing: the shadcn base sets focus:bg-accent (raw #00F0FF) and
   focus:text-accent-foreground (#000000 in BOTH themes) — the latter would paint
   hovered rows black on a near-transparent dark background. */
const ROW = cn(
  "group h-8 gap-2.5 rounded-lg px-2 text-[13px]",
  "focus:bg-foreground/[0.06] focus:text-foreground",
);

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
          "data-[state=open]:bg-foreground/[0.06] data-[state=open]:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label={t("settings")}
      >
        <Settings2 className="h-4 w-4" />
      </DropdownMenuTrigger>

      {/* min-w, not w-: the panel hugs the longest locale name instead of
          stranding the checkmark in 80px of empty space. */}
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "w-auto min-w-[10.5rem] rounded-xl p-1.5",
          "border-border/70 bg-popover/80 backdrop-blur-xl",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-12px_rgba(0,0,0,0.22)]",
          "dark:shadow-[0_1px_2px_rgba(0,0,0,0.6),0_16px_40px_-12px_rgba(0,0,0,0.8)]",
        )}
      >
        <DropdownMenuLabel
          className={cn(MONO, "px-2 pb-1 pt-1 text-muted-foreground/70")}
        >
          {t("theme")}
        </DropdownMenuLabel>
        {THEMES.map(({ value, Icon }) => {
          const active = theme === value;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                ROW,
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span className={RAIL}>
                <Icon
                  className={cn(
                    "h-3.5 w-3.5",
                    active ? "!text-primary-ink" : "text-current opacity-70",
                  )}
                />
              </span>
              <span className="flex-1">{t(`theme_${value}`)}</span>
              <Check
                className={cn(
                  "h-3.5 w-3.5 !text-primary-ink transition-opacity duration-150",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="-mx-1.5 my-1.5 bg-border/70" />

        <DropdownMenuLabel
          className={cn(MONO, "px-2 pb-1 pt-1 text-muted-foreground/70")}
        >
          {t("language")}
        </DropdownMenuLabel>
        {locales.map((loc) => {
          const active = locale === loc;
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => router.replace(pathname, { locale: loc })}
              className={cn(
                ROW,
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {/* The locale code fills the same rail the theme icons use. */}
              <span
                className={cn(
                  RAIL,
                  MONO,
                  active
                    ? "text-primary-ink"
                    : "text-current opacity-60 group-focus:opacity-80",
                )}
              >
                {loc}
              </span>
              <span className="flex-1">{tLang(loc)}</span>
              <Check
                className={cn(
                  "h-3.5 w-3.5 !text-primary-ink transition-opacity duration-150",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
            </DropdownMenuItem>
          );
        })}
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
