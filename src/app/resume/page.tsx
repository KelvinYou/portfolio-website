import { DownloadResume, ViewResume } from "@/components/resume";
import ResumeDocument from "@/components/resume/resume-document";

export const metadata = {
  title: "Resume | Your Name",
  description: "Professional resume of Your Name, showcasing experience, skills, and education."
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>

            <DownloadResume document={<ResumeDocument />} fileName="resume.pdf">
              Resume
            </DownloadResume>
          </div>
          
          <div className="bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 h-[80vh]">
            <ViewResume>
              <ResumeDocument />
            </ViewResume>
          </div>
        </div>
      </div>
    </div>
  );
} 