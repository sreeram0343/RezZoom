export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillsSection;
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages?: LanguageItem[];
  customSections?: CustomSection[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  title?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;         // "YYYY-MM" format
  endDate: string | "Present";
  bullets: BulletPoint[];
  isRemote?: boolean;
}

export interface BulletPoint {
  id: string;
  text: string;
  isAIGenerated: boolean;
  originalText?: string;     // Before AI enhancement
  metrics?: string[];        // Extracted quantitative metrics
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export interface SkillsSection {
  technical: string[];
  languages: string[];
  frameworks: string[];
  tools: string[];
  soft?: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  bullets: BulletPoint[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface TemplateCustomization {
  templateId: string;
  primaryColor: string;         // Hex
  fontFamily: string;
  fontSize: "compact" | "regular" | "spacious";
  sectionOrder: SectionKey[];
  showIcons: boolean;
  headerStyle: "minimal" | "centered" | "sidebar";
  margins: "tight" | "normal" | "wide";
}

export type SectionKey = 
  | "summary" | "experience" | "education" 
  | "skills" | "projects" | "certifications" 
  | "languages" | "custom";

export interface ATSAnalysisResult {
  score: number;                   // 0-100
  breakdown: {
    keywords: number;              // 0-25
    formatting: number;            // 0-25
    completeness: number;          // 0-25
    readability: number;           // 0-25
  };
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: OptimizationSuggestion[];
  passedChecks: string[];
  failedChecks: string[];
}

export interface OptimizationSuggestion {
  priority: "critical" | "high" | "medium" | "low";
  section: SectionKey;
  issue: string;
  recommendation: string;
  example?: string;
}

export interface JobMatchResult {
  matchScore: number;              // 0-100
  missingSkills: string[];
  missingKeywords: string[];
  strongMatches: string[];
  recommendations: string[];
  tailoredBullets?: Record<string, string[]>;
}
