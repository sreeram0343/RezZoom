"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { ExperienceItem } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wand2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ExperienceForm() {
  const { content, updateContent } = useResumeStore();
  const { experience } = content;
  const [expandedId, setExpandedId] = useState<string | null>(
    experience.length > 0 ? experience[0].id : null
  );

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: crypto.randomUUID(),
      company: "",
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [],
    };
    updateContent({ experience: [...experience, newItem] });
    setExpandedId(newItem.id);
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    updateContent({
      experience: experience.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeExperience = (id: string) => {
    updateContent({
      experience: experience.filter((item) => item.id !== id),
    });
  };

  const addBullet = (expId: string) => {
    const newBullet = { id: crypto.randomUUID(), text: "", isAIGenerated: false };
    updateContent({
      experience: experience.map((item) =>
        item.id === expId
          ? { ...item, bullets: [...item.bullets, newBullet] }
          : item
      ),
    });
  };

  const updateBullet = (expId: string, bulletId: string, text: string) => {
    updateContent({
      experience: experience.map((item) =>
        item.id === expId
          ? {
              ...item,
              bullets: item.bullets.map((b) =>
                b.id === bulletId ? { ...b, text } : b
              ),
            }
          : item
      ),
    });
  };

  const removeBullet = (expId: string, bulletId: string) => {
    updateContent({
      experience: experience.map((item) =>
        item.id === expId
          ? { ...item, bullets: item.bullets.filter((b) => b.id !== bulletId) }
          : item
      ),
    });
  };

  const enhanceBullet = async (expId: string, bulletId: string, text: string) => {
    // Simulate AI enhancement
    updateContent({
      experience: experience.map((item) =>
        item.id === expId
          ? {
              ...item,
              bullets: item.bullets.map((b) =>
                b.id === bulletId
                  ? {
                      ...b,
                      text: `[Enhanced] ${text.length > 0 ? text : "Architected scalable solutions resulting in 40% performance increase."}`,
                      isAIGenerated: true,
                      originalText: b.text,
                    }
                  : b
              ),
            }
          : item
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-neutral-500">
          Add your relevant work experience. Start with your most recent role.
        </p>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Role
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {experience.map((item, index) => (
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
                      {item.title || "(No Title)"} {item.company ? `at ${item.company}` : ""}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {item.startDate} {item.startDate && item.endDate ? "-" : ""}{" "}
                      {item.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(item.id);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <Label>Company</Label>
                        <Input
                          value={item.company}
                          onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                          placeholder="e.g. Google"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Job Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateExperience(item.id, { title: e.target.value })}
                          placeholder="e.g. Senior Software Engineer"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Location</Label>
                        <Input
                          value={item.location}
                          onChange={(e) => updateExperience(item.id, { location: e.target.value })}
                          placeholder="e.g. Mountain View, CA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label>Start Date</Label>
                          <Input
                            value={item.startDate}
                            onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>End Date</Label>
                          <Input
                            value={item.endDate}
                            onChange={(e) => updateExperience(item.id, { endDate: e.target.value })}
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Description / Responsibilities</Label>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 text-xs gap-1.5"
                          onClick={() => addBullet(item.id)}
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Bullet
                        </Button>
                      </div>

                      {item.bullets.map((bullet, bIndex) => (
                        <div key={bullet.id} className="flex gap-2 items-start relative group">
                          <div className="mt-3 cursor-grab text-neutral-400">
                            <GripVertical className="w-4 h-4" />
                          </div>
                          <div className="flex-1 space-y-2">
                             <Textarea
                               value={bullet.text}
                               onChange={(e) => updateBullet(item.id, bullet.id, e.target.value)}
                               placeholder="Described what you did and the impact it had..."
                               className="min-h-[60px] text-sm"
                             />
                             <div className="flex gap-2">
                                <Button
                                   variant="outline"
                                   size="sm"
                                   className="h-7 text-xs gap-1.5 text-brand-600 border-brand-200 bg-brand-50"
                                   onClick={() => enhanceBullet(item.id, bullet.id, bullet.text)}
                                >
                                   <Wand2 className="w-3 h-3" /> Enhance with AI
                                </Button>
                             </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-1 h-8 w-8 text-neutral-400 hover:text-error shrink-0"
                            onClick={() => removeBullet(item.id, bullet.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {item.bullets.length === 0 && (
                        <div className="text-center p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
                          <p className="text-sm text-neutral-500 mb-3">No bullet points added yet.</p>
                          <Button variant="outline" size="sm" onClick={() => addBullet(item.id)}>
                            <Plus className="w-4 h-4 mr-2" /> Add First Bullet
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {experience.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
             <p className="text-neutral-500 mb-4">You haven't added any work experience yet.</p>
             <Button onClick={addExperience}>
               <Plus className="w-4 h-4 mr-2" /> Add Experience
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
