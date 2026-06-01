"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  "Personal Info",
  "Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Projects",
  "Choose Template"
];

function BuilderContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [currentStep, setCurrentStep] = useState(0);

  // If importing, show a simulated loading screen first
  const [isImporting, setIsImporting] = useState(from === "upload" || from === "linkedin");
  const [importProgress, setImportProgress] = useState("Uploading...");

  // Simulate import process
  if (isImporting) {
    setTimeout(() => setImportProgress("Extracting text..."), 1500);
    setTimeout(() => setImportProgress("Parsing sections with AI..."), 3000);
    setTimeout(() => setImportProgress("Populating your resume..."), 4500);
    setTimeout(() => setIsImporting(false), 6000);

    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 relative">
          <Wand2 className="w-8 h-8 text-brand-600 animate-pulse" />
          <div className="absolute inset-0 border-2 border-brand-600 rounded-2xl animate-ping opacity-20" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2">Importing your experience</h2>
        <p className="text-neutral-500 font-mono text-sm animate-pulse">{importProgress}</p>
      </div>
    );
  }

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-4 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-neutral-500 mb-2">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span className="text-neutral-900 dark:text-white">{STEPS[currentStep]}</span>
        </div>
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm p-6 md:p-10 mb-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <h2 className="text-2xl font-bold mb-6">{STEPS[currentStep]}</h2>
            <div className="text-neutral-500 h-64 border-2 border-dashed border-neutral-200 rounded-xl flex items-center justify-center">
              (Form fields for {STEPS[currentStep]} will be implemented here)
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep === STEPS.length - 1 ? "Finish & View" : "Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function NewResumeBuilder() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}