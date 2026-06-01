import { create } from "zustand";
import { ResumeContent, TemplateCustomization } from "@/types/resume";

const defaultContent: ResumeContent = {
  personalInfo: { fullName: "", email: "", phone: "", location: "" },
  summary: "",
  experience: [],
  education: [],
  skills: { technical: [], languages: [], frameworks: [], tools: [] },
  projects: [],
  certifications: [],
};

const defaultCustomization: TemplateCustomization = {
  templateId: "minimal-ats",
  primaryColor: "#3B82F6",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "regular",
  sectionOrder: ["summary", "experience", "education", "skills", "projects", "certifications"],
  showIcons: true,
  headerStyle: "minimal",
  margins: "normal",
};

interface ResumeState {
  activeResumeId: string | null;
  content: ResumeContent;
  customization: TemplateCustomization;
  atsScore: number | null;
  
  setActiveResume: (id: string) => void;
  updateContent: (content: Partial<ResumeContent>) => void;
  updateCustomization: (customization: Partial<TemplateCustomization>) => void;
  setAtsScore: (score: number) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  activeResumeId: null,
  content: defaultContent,
  customization: defaultCustomization,
  atsScore: null,
  
  setActiveResume: (id) => set({ activeResumeId: id }),
  updateContent: (newContent) => set((state) => ({ content: { ...state.content, ...newContent } })),
  updateCustomization: (newCustomization) => set((state) => ({ customization: { ...state.customization, ...newCustomization } })),
  setAtsScore: (score) => set({ atsScore: score }),
}));
