import type { Metadata, Viewport } from "next";
import { bodyClassName } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { domainPath, experiences, personalInfo } from "@/constants";
import { routing } from "@/i18n/routing";
import { siteOgImage } from "@/lib/og";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const basicInfo = {
  title: `${personalInfo.name} | Portfolio`,
  description: `${personalInfo.summary}`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#07070C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(domainPath),
  ...basicInfo,
  manifest: "/manifest.webmanifest",
  keywords: [
    "AI Engineer",
    "AI Application Engineer",
    "Agentic AI",
    "Multi-agent Systems",
    "LLM Integration",
    "MCP",
    "Model Context Protocol",
    "Claude Agent SDK",
    "Prompt Engineering",
    "LLM Evaluation",
    "AI-native Full-stack Engineer",
    "Fintech Engineer",
    "Payment Systems",
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "portfolio",
    "blog",
  ],
  authors: [{ name: personalInfo.name, url: domainPath }],
  creator: personalInfo.name,
  // No `icons` override: Next resolves app/icon.tsx and app/apple-icon.tsx
  // by convention, both drawing the KY mark via next/og.
  openGraph: {
    ...basicInfo,
    url: domainPath,
    siteName: `${personalInfo.name}'s Portfolio`,
    images: [siteOgImage],
    type: "website",
  },
  twitter: {
    ...basicInfo,
    images: [siteOgImage.url],
    card: "summary_large_image",
    creator: personalInfo.name,
  },
  alternates: {
    canonical: domainPath,
    types: {
      "application/rss+xml": `${domainPath}/feed.xml`,
    },
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      url: domainPath,
      sameAs: [personalInfo.contact.linkedin, personalInfo.contact.github],
      jobTitle: personalInfo.title,
      worksFor: {
        "@type": "Organization",
        name: experiences[0].company,
        url: experiences[0].companyUrl,
      },
    }),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={bodyClassName}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background text-foreground">
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
