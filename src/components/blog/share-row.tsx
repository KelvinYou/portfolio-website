"use client";

import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Share targets, lifted out of the post page so the page reads as a document
 * outline rather than a wall of inline SVG paths.
 */

function LinkedInIcon() {
  return (
    <svg
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      {/* Outer bubble plus the handset. The path this replaces had only the
          bubble, so at 15px the icon read as a generic chat glyph. */}
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.735-.271-1.396-.86-.513-.458-.86-1.025-.961-1.199-.1-.174-.011-.269.087-.365.086-.087.202-.226.303-.34.1-.115.133-.197.199-.332.066-.132.033-.248-.016-.347-.05-.099-.412-.997-.564-1.363-.149-.359-.301-.309-.412-.315-.113-.006-.24-.006-.365-.006-.126 0-.331.05-.505.248-.174.199-.665.649-.665 1.583s.678 1.836.777 1.968c.099.132 1.34 2.147 3.246 2.941.463.201.824.32 1.106.409.475.15.906.129 1.248.078.383-.057 1.178-.482 1.344-.947.166-.465.166-.863.117-.947-.05-.083-.183-.133-.38-.232z" />
    </svg>
  );
}

// Hover moves the ring to cyan and the glyph to foreground. A cyan glyph would
// be 1.33:1 against the light background.
const BUTTON_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-foreground";

export function ShareRow({ title }: { title: string }) {
  const t = useTranslations("blog");
  const [copied, setCopied] = useState(false);

  const pageUrl = () =>
    typeof window === "undefined" ? "" : window.location.href;

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      toast.success(t("link_copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied outright; say so rather than showing a
      // success tick for something that did not happen.
      toast.error(t("copy_link"));
    }
  };

  return (
    <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {t("share_heading")}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={BUTTON_CLASS}
          aria-label={t("share_linkedin")}
          onClick={() =>
            openShare(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl())}`,
            )
          }
        >
          <LinkedInIcon />
        </button>

        <button
          type="button"
          className={BUTTON_CLASS}
          aria-label={t("share_x")}
          onClick={() =>
            openShare(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl())}&text=${encodeURIComponent(title)}`,
            )
          }
        >
          <XIcon />
        </button>

        <button
          type="button"
          className={BUTTON_CLASS}
          aria-label={t("share_whatsapp")}
          onClick={() =>
            openShare(
              `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl()}`)}`,
            )
          }
        >
          <WhatsAppIcon />
        </button>

        <button
          type="button"
          className={BUTTON_CLASS}
          aria-label={copied ? t("link_copied") : t("copy_link")}
          onClick={copyLink}
        >
          {copied ? (
            <Check className="h-4 w-4 text-foreground" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
