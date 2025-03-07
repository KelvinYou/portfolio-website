import ResumeDocument from "@/components/resume/resume-document";
import ResumeViewerWithFallback from "@/components/resume/resume-viewer-fallback";

export const metadata = {
  title: "Resume | Kelvin You",
  description: "Professional resume of Kelvin You, showcasing experience, skills, and education."
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ResumeViewerWithFallback document={<ResumeDocument />} />
        </div>
      </div>
    </div>
  );
} 