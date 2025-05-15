import ResumeViewerWithFallback from "@/app/resume/resume-viewer-fallback";
import { domainPath, personalInfo } from "@/data";
import { Metadata } from "next";
import ResumeDocument from "./resume-document";

export const metadata: Metadata = {
  title: `${personalInfo.name} | Resume`,
  description:
    "Professional resume of Kelvin You, showcasing experience, skills, and education.",
  keywords: [
    "resume",
    "Kelvin You",
    "software engineer",
    "professional resume",
    "experience",
    "skills",
    "education",
  ],
  authors: [{ name: personalInfo.name, url: domainPath }],
  creator: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | Resume`,
    description:
      "Professional resume of Kelvin You, showcasing experience, skills, and education.",
    url: `${domainPath}/resume`,
    siteName: `${personalInfo.name}'s Resume`,
    images: [
      {
        url: "/images/projects/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Resume | Kelvin You",
      },
    ],
    type: "website",
  },
  twitter: {
    title: `${personalInfo.name} | Resume`,
    description:
      "Professional resume of Kelvin You, showcasing experience, skills, and education.",
    images: ["/images/projects/portfolio.jpg"],
    card: "summary_large_image",
    creator: personalInfo.name,
  },
  alternates: {
    canonical: `${domainPath}/resume`,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Resume",
      name: `${personalInfo.name}'s Resume`,
      url: `${domainPath}/resume`,
      author: {
        "@type": "Person",
        name: personalInfo.name,
      },
    }),
  },
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <ResumeViewerWithFallback document={<ResumeDocument />} />
        </div>
      </div>
    </div>
  );
}
