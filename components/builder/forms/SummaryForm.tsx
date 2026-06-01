"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function SummaryForm() {
  const { content, updateContent } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // In a real implementation, this would call /api/ai/generate-summary
    // For now, we simulate a delay and a dummy response
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      updateContent({
        summary: "Results-driven Software Engineer with 5+ years of experience architecting scalable web applications. Proven track record in reducing API latency by 40% and leading cross-functional teams to deliver critical product features ahead of schedule. Passionate about building robust backend systems and mentoring junior developers.",
      });
      toast.success("Summary generated successfully!");
    } catch {
      toast.error("Failed to generate summary.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Write a brief professional summary (2-3 sentences) highlighting your experience and key achievements.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="shrink-0 group"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2 text-brand-600 group-hover:animate-pulse" />
          )}
          Generate with AI
        </Button>
      </div>

      <Textarea
        placeholder="e.g. Senior Software Engineer with 5+ years of experience..."
        className="min-h-[200px] resize-y text-base leading-relaxed"
        value={content.summary}
        onChange={(e) => updateContent({ summary: e.target.value })}
      />
      
      <div className="flex justify-end">
        <span className="text-xs text-neutral-400">
          {content.summary.length} / 500 characters
        </span>
      </div>
    </div>
  );
}
