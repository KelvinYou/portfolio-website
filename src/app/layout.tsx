import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { domainPath, experiences, personalInfo } from "@/data";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basicInfo = {
  title: `${personalInfo.name} | Portfolio`,
  description: `${personalInfo.summary}`
}

export const metadata: Metadata = {
  ...basicInfo,
  keywords: [
    'portfolio',
    'resume',
    'projects',
    'blog',
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
    icon: '/logo.png',
  },
  openGraph: {
    ...basicInfo,
    url: domainPath,
    siteName: `${personalInfo.name}'s Portfolio`,
    images: [
      {
        url: '/images/projects/portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio',
      }
    ],
    type: "website",
  },
  twitter: {
    ...basicInfo,
    images: [
      '/images/projects/portfolio.jpg'
    ],
    card: "summary_large_image",
    creator: personalInfo.name,
  },
  alternates: {
    canonical: domainPath,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      url: domainPath,
      sameAs: [
        personalInfo.contact.linkedin,
        personalInfo.contact.github,
      ],
      jobTitle: personalInfo.title,
      worksFor: {
        "@type": "Organization",
        name: experiences[0].company,
        url: experiences[0].companyUrl,
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
