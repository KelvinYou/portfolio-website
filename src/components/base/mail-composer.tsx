"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { personalInfo } from "@/constants";
import { cn } from "@/lib/utils";

const TOPICS = ["role", "freelance", "project", "hello"] as const;
type Topic = (typeof TOPICS)[number];

/**
 * The contact section's primary action. Cold outreach stalls on "what do I
 * even write", so the draft is already written — pick a subject and the
 * preview below is exactly what lands in the mail client, greeting included.
 *
 * `mailto:` silently no-ops for anyone on webmail without a registered
 * handler, which is why the address is also copyable.
 */
export function MailComposer() {
  const t = useTranslations("contact");
  const reduceMotion = useReducedMotion();
  const [topic, setTopic] = useState<Topic>("role");
  const [copied, setCopied] = useState(false);

  const { email } = personalInfo.contact;
  const subject = t(`topic_${topic}`);
  const body = `${t("greeting")} ${t(`body_${topic}`)}`;
  const href = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(`${body}\n\n`)}`;

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context, denied permission). The address
      // is plain selectable text right beside the button, so there is nothing
      // to recover from and nothing worth interrupting the reader over.
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* To — the address, always visible and selectable */}
      <div className="flex items-center gap-4 border-b border-border px-5 py-4">
        <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-subtle">
          {t("to_label")}
        </span>
        <span className="flex-1 truncate font-mono text-sm text-foreground">
          {email}
        </span>
        <button
          type="button"
          onClick={copyAddress}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary-ink"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary-ink" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{copied ? t("copied") : t("copy")}</span>
        </button>
      </div>

      {/* Re — subject presets */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-border px-5 py-4">
        <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-subtle">
          {t("subject_label")}
        </span>
        <div
          role="radiogroup"
          aria-label={t("subject_label")}
          className="flex flex-wrap gap-2"
        >
          {TOPICS.map((option) => {
            const selected = option === topic;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTopic(option)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                  selected
                    ? "border-primary/40 bg-primary/10 text-primary-ink"
                    : "border-border text-muted-foreground hover:border-primary/25 hover:text-foreground",
                )}
              >
                {t(`topic_${option}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Draft preview — the one animated thing in this section */}
      <div className="px-5 py-5">
        {/* Reserved to the tallest draft in the longest locale (ms) so
            switching subjects never moves the send button. */}
        <div className="min-h-[7rem] sm:min-h-[4rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={topic}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-foreground">{t("greeting")}</span>{" "}
              {t(`body_${topic}`)}
            </motion.p>
          </AnimatePresence>
        </div>

        <a
          href={href}
          className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,240,255,0.28)] sm:w-auto"
        >
          {t("send")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
