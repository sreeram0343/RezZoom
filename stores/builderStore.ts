import { create } from "zustand";
import { SectionKey } from "@/types/resume";

interface BuilderState {
  activeSection: SectionKey | "personalInfo";
  isPdfPreviewOpen: boolean;
  zoomLevel: number;
  
  setActiveSection: (section: SectionKey | "personalInfo") => void;
  setPdfPreviewOpen: (isOpen: boolean) => void;
  setZoomLevel: (level: number) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  activeSection: "personalInfo",
  isPdfPreviewOpen: false,
  zoomLevel: 100,
  
  setActiveSection: (section) => set({ activeSection: section }),
  setPdfPreviewOpen: (isOpen) => set({ isPdfPreviewOpen: isOpen }),
  setZoomLevel: (level) => set({ zoomLevel: level }),
}));
