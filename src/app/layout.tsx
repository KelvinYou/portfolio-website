import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { personalInfo } from "@/data";
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
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: `${personalInfo.summary}`,
  images: ['/images/projects/portfolio.jpg']
}

export const metadata: Metadata = {
  ...basicInfo,
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    ...basicInfo,
  },
  twitter: {
    ...basicInfo,
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
            <FooterSection />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
