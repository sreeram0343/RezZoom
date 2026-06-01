"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { EducationItem } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EducationForm() {
  const { content, updateContent } = useResumeStore();
  const { education } = content;
  const [expandedId, setExpandedId] = useState<string | null>(
    education.length > 0 ? education[0].id : null
  );

  const addEducation = () => {
    const newItem: EducationItem = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
    };
    updateContent({ education: [...education, newItem] });
    setExpandedId(newItem.id);
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    updateContent({
      education: education.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeEducation = (id: string) => {
    updateContent({
      education: education.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-neutral-500">
          Add your educational background.
        </p>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {education.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 overflow-hidden"
            >
              {/* Header / Collapse Toggle */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-grab p-1 text-neutral-400 hover:text-neutral-600">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">
                      {item.degree || "(No Degree)"} {item.field ? `in ${item.field}` : ""}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {item.institution} {item.startDate && item.endDate ? `| ${item.startDate} - ${item.endDate}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEducation(item.id);
                    }}
                    className="text-neutral-400 hover:text-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {expandedId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                  )}
                </div>
              </div>

              {/* Form Content */}
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <Label>Institution</Label>
                        <Input
                          value={item.institution}
                          onChange={(e) => updateEducation(item.id, { institution: e.target.value })}
                          placeholder="e.g. Stanford University"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Location</Label>
                        <Input
                          value={item.location}
                          onChange={(e) => updateEducation(item.id, { location: e.target.value })}
                          placeholder="e.g. Stanford, CA"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Degree</Label>
                        <Input
                          value={item.degree}
                          onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                          placeholder="e.g. Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Field of Study</Label>
                        <Input
                          value={item.field}
                          onChange={(e) => updateEducation(item.id, { field: e.target.value })}
                          placeholder="e.g. Computer Science"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Start Date</Label>
                        <Input
                          value={item.startDate}
                          onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>End Date</Label>
                        <Input
                          value={item.endDate}
                          onChange={(e) => updateEducation(item.id, { endDate: e.target.value })}
                          placeholder="MM/YYYY or Expected 2025"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={item.gpa || ""}
                          onChange={(e) => updateEducation(item.id, { gpa: e.target.value })}
                          placeholder="e.g. 3.8/4.0"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {education.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
             <p className="text-neutral-500 mb-4">No education added yet.</p>
             <Button onClick={addEducation}>
               <Plus className="w-4 h-4 mr-2" /> Add Education
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
