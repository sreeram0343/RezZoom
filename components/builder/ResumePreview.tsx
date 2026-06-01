"use client";

import { useResumeStore } from "@/stores/resumeStore";
import { MinimalATSTemplate } from "@/components/templates/MinimalATSTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2, Download, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ResumePreview() {
  const { content, customization, atsScore } = useResumeStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p>Loading PDF Viewer...</p>
      </div>
    );
  }

  // Choose template based on customization.templateId
  // For now, we only have MinimalATSTemplate
  const Template = MinimalATSTemplate;

  return (
    <div className="relative w-full h-full flex flex-col bg-neutral-200 dark:bg-neutral-900 rounded-xl overflow-hidden shadow-inner">
      {/* Toolbar */}
      <div className="h-12 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="px-2 py-1 rounded bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300 text-xs font-semibold">
            {customization.templateId}
          </div>
          {atsScore !== null && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-success/10 text-success text-xs font-semibold">
               ATS: {atsScore}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
           <PDFDownloadLink
              document={<Template content={content} customization={customization} />}
              fileName={`Resume_${content.personalInfo.fullName.replace(/\s+/g, '_') || 'Draft'}.pdf`}
           >
              {({ loading }) => (
                 <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" disabled={loading}>
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    {loading ? "Generating..." : "Download"}
                 </Button>
              )}
           </PDFDownloadLink>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
              <Maximize2 className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full bg-neutral-200 dark:bg-neutral-800">
         <PDFViewer className="w-full h-full border-none" showToolbar={false}>
            <Template content={content} customization={customization} />
         </PDFViewer>
      </div>
    </div>
  );
}
