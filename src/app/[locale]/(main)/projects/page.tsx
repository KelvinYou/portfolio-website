import { domainPath, personalInfo, projects } from "@/constants";
import { ogImageFor } from "@/lib/og";
import { Metadata } from "next";
import { ProjectsLedger } from "./projects-ledger";
import { ProjectsPageHeader } from "./projects-page-header";

const projectsOgImage = ogImageFor({ title: "Projects" });

export const metadata: Metadata = {
  title: `${personalInfo.name} | Projects`,
  description:
    "Explore my portfolio of software development projects, from web applications to mobile apps and more.",
  keywords: [
    "projects",
    "Kelvin You",
    "software engineer",
    "portfolio",
    "web development",
    "mobile development",
  ],
  authors: [{ name: personalInfo.name, url: domainPath }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | Projects`,
    description:
      "Explore my portfolio of software development projects, from web applications to mobile apps and more.",
    url: `${domainPath}/projects`,
    siteName: `${personalInfo.name}'s Projects`,
    images: [
      { url: projectsOgImage, width: 1200, height: 630, alt: "Projects" },
    ],
    type: "website",
  },
  twitter: {
    title: `${personalInfo.name} | Projects`,
    description:
      "Explore my portfolio of software development projects, from web applications to mobile apps and more.",
    images: [projectsOgImage],
    card: "summary_large_image",
    creator: personalInfo.name,
  },
  alternates: {
    canonical: `${domainPath}/projects`,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Portfolio",
      name: `${personalInfo.name}'s Projects`,
      url: `${domainPath}/projects`,
      author: {
        "@type": "Person",
        name: personalInfo.name,
      },
    }),
  },
};

export default function ProjectsPage() {
  // This is a server component that passes data to the client component
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Animated header component */}
          <ProjectsPageHeader />

          <ProjectsLedger projects={projects} />
        </div>
      </div>
    </div>
  );
}
