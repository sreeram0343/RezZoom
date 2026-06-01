"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { useResumeStore } from "@/stores/resumeStore";
import { SectionKey } from "@/types/resume";
import { PersonalInfoForm } from "@/components/builder/forms/PersonalInfoForm";
import { SummaryForm } from "@/components/builder/forms/SummaryForm";
import { ExperienceForm } from "@/components/builder/forms/ExperienceForm";
import { EducationForm } from "@/components/builder/forms/EducationForm";
import { SkillsForm } from "@/components/builder/forms/SkillsForm";
import { ProjectsForm } from "@/components/builder/forms/ProjectsForm";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { Button } from "@/components/ui/button";
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Settings,
  ChevronLeft,
  Wand2,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const SECTIONS: { id: SectionKey | "personalInfo" | "settings"; label: string; icon: React.ElementType }[] = [
  { id: "personalInfo", label: "Personal Info", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "settings", label: "Template & Design", icon: Settings },
];

export default function ResumeEditorPage({ params }: { params: { id: string } }) {
  const { activeSection, setActiveSection } = useBuilderStore();
  const { content, setActiveResume } = useResumeStore();

  useEffect(() => {
    // In a real app, we would fetch the resume by ID here
    // For now, just set the ID
    setActiveResume(params.id);
  }, [params.id, setActiveResume]);

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personalInfo": return <PersonalInfoForm />;
      case "summary": return <SummaryForm />;
      case "experience": return <ExperienceForm />;
      case "education": return <EducationForm />;
      case "skills": return <SkillsForm />;
      case "projects": return <ProjectsForm />;
      case "settings": 
        return (
          <div className="p-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
             Settings and Customization panel coming soon.
          </div>
        );
      default: return null;
    }
  };

  const getCompletionStatus = (section: string) => {
    switch (section) {
       case "personalInfo": return content.personalInfo.fullName.length > 0;
       case "summary": return content.summary.length > 50;
       case "experience": return content.experience.length > 0;
       case "education": return content.education.length > 0;
       case "skills": return Object.values(content.skills).some(arr => arr && arr.length > 0);
       case "projects": return content.projects.length > 0;
       case "settings": return true;
       default: return false;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-neutral-950">
      
      {/* Column 1: Section Navigator (240px) */}
      <div className="hidden md:flex flex-col w-[240px] border-r border-neutral-200 dark:border-neutral-800 shrink-0 bg-neutral-50 dark:bg-neutral-950">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
           <Link href="/dashboard" className="p-2 -ml-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
           </Link>
           <div className="min-w-0">
             <h2 className="font-semibold text-sm truncate">Untitled Resume</h2>
             <p className="text-xs text-neutral-500">Draft • Saved just now</p>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isCompleted = getCompletionStatus(section.id);
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as SectionKey | "personalInfo")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-white dark:bg-neutral-900 text-brand-600 dark:text-brand-400 shadow-sm border border-neutral-200 dark:border-neutral-800" 
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-900 hover:text-neutral-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {section.label}
                </div>
                {isCompleted && !isActive && (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
           <Button className="w-full gap-2" variant="outline">
              <Wand2 className="w-4 h-4 text-brand-600" /> Optimize All
           </Button>
        </div>
      </div>

      {/* Mobile Navigator Dropdown (Simplified for now) */}
      <div className="md:hidden p-4 border-b border-neutral-200 flex gap-2 overflow-x-auto">
         {SECTIONS.map((section) => (
             <button
               key={section.id}
               onClick={() => setActiveSection(section.id as SectionKey | "personalInfo")}
               className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border ${
                  activeSection === section.id 
                    ? "bg-brand-50 border-brand-200 text-brand-700" 
                    : "bg-white border-neutral-200 text-neutral-600"
               }`}
             >
                {section.label}
             </button>
         ))}
      </div>

      {/* Column 2: Edit Panel (flex-1) */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
         <div className="h-14 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-6 shrink-0 bg-white dark:bg-neutral-950 z-10">
            <h1 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </h1>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeSection}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.2 }}
                 >
                    {renderActiveForm()}
                 </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </div>

      {/* Column 3: Live Preview (fixed 440px) */}
      <div className="hidden lg:flex flex-col w-[440px] xl:w-[500px] shrink-0 bg-neutral-100 dark:bg-neutral-950 p-4">
         <div className="flex-1 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
            <ResumePreview />
         </div>
      </div>

    </div>
  );
}
