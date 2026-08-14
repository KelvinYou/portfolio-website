import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { domainPath, experiences, personalInfo } from "@/constants";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const archivo = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/open-sans-v17-latin-regular.ttf",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/open-sans-v17-latin-600.ttf",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/open-sans-v17-latin-700.ttf",
      weight: "700",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/quicksand-v20-latin-300.ttf",
      weight: "300",
    },
    {
      path: "../../../public/assets/fonts/quicksand-v20-latin-regular.ttf",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/quicksand-v20-latin-600.ttf",
      weight: "600",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const basicInfo = {
  title: `${personalInfo.name} | Portfolio`,
  description: `${personalInfo.summary}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(domainPath),
  ...basicInfo,
  keywords: [
    "portfolio",
    "resume",
    "projects",
    "blog",
    "Frontend Engineer",
    "React Developer",
    "Next.js Portfolio",
    "Web Developer",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: personalInfo.name, url: domainPath }],
  creator: personalInfo.name,
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    ...basicInfo,
    url: domainPath,
    siteName: `${personalInfo.name}'s Portfolio`,
    images: [
      {
        url: "/images/projects/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    ...basicInfo,
    images: ["/images/projects/portfolio.jpg"],
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
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
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
