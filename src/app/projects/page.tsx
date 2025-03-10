import { projects } from "@/data";
import { Metadata } from "next";
import ProjectsClient from "./projects-client";
import { ProjectsPageHeader } from "./projects-page-header";

export const metadata: Metadata = {
  title: "Projects | Kelvin You",
  description: "Explore my portfolio of software development projects, from web applications to mobile apps and more."
};

export default function ProjectsPage() {
  // This is a server component that passes data to the client component
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* Animated header component */}
          <ProjectsPageHeader />
          
          {/* Pass projects to client component */}
          <ProjectsClient initialProjects={projects} />
        </div>
      </div>
    </div>
  );
}
