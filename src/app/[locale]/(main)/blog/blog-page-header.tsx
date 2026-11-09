"use client";

import { useTranslations } from "next-intl";

export function BlogPageHeader() {
  const t = useTranslations("blog");
  return (
    <header className="mb-10 sm:mb-12">
      <h1 className="font-sans text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t("intro")}
      </p>
    </header>
  );
}
