"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Sparkles } from "lucide-react";
import { SkillsSection } from "@/types/resume";

export function SkillsForm() {
  const { content, updateContent } = useResumeStore();
  const { skills } = content;
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<keyof SkillsSection>("technical");

  const categories: { key: keyof SkillsSection; label: string }[] = [
    { key: "technical", label: "Technical Skills" },
    { key: "languages", label: "Programming Languages" },
    { key: "frameworks", label: "Frameworks & Libraries" },
    { key: "tools", label: "Tools & Platforms" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    if (inputValue.trim()) {
      const currentList = skills[activeCategory] || [];
      if (!currentList.includes(inputValue.trim())) {
         updateContent({
            skills: {
               ...skills,
               [activeCategory]: [...currentList, inputValue.trim()],
            },
         });
      }
      setInputValue("");
    }
  };

  const removeSkill = (category: keyof SkillsSection, skillToRemove: string) => {
    updateContent({
      skills: {
        ...skills,
        [category]: (skills[category] || []).filter((s) => s !== skillToRemove),
      },
    });
  };

  const handleSuggest = () => {
    // Simulate AI suggestion
    const suggestions = ["TypeScript", "React", "Node.js", "Docker", "AWS"];
    const currentList = skills[activeCategory] || [];
    const newSkills = suggestions.filter((s) => !currentList.includes(s));
    
    updateContent({
        skills: {
            ...skills,
            [activeCategory]: [...currentList, ...newSkills]
        }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-neutral-500">
          Add your skills. Group them by category for better readability.
        </p>
        <Button onClick={handleSuggest} variant="outline" size="sm" className="gap-2 text-brand-600 border-brand-200 bg-brand-50">
           <Sparkles className="w-4 h-4" /> AI Suggest Skills
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeCategory === cat.key
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <Label>Add to {categories.find((c) => c.key === activeCategory)?.label}</Label>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter..."
            className="flex-1"
          />
          <Button onClick={addSkill} className="shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      {/* Skills Display */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 min-h-[200px]">
        {categories.map((cat) => {
          const catSkills = skills[cat.key] || [];
          if (catSkills.length === 0) return null;
          
          return (
            <div key={cat.key} className="mb-6 last:mb-0">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                {cat.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm font-medium shadow-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(cat.key, skill)}
                      className="text-neutral-400 hover:text-error rounded-full focus:outline-none focus:ring-2 focus:ring-error/30"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        
        {Object.values(skills).every((arr) => !arr || arr.length === 0) && (
            <div className="h-full flex items-center justify-center text-neutral-400 text-sm">
                No skills added yet. Select a category above and start typing.
            </div>
        )}
      </div>
    </div>
  );
}
