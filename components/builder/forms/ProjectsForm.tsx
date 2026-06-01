"use client";

import { useState } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { ProjectItem } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wand2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsForm() {
  const { content, updateContent } = useResumeStore();
  const { projects } = content;
  const [expandedId, setExpandedId] = useState<string | null>(
    projects.length > 0 ? projects[0].id : null
  );

  const addProject = () => {
    const newItem: ProjectItem = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      techStack: [],
      bullets: [],
    };
    updateContent({ projects: [...projects, newItem] });
    setExpandedId(newItem.id);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    updateContent({
      projects: projects.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeProject = (id: string) => {
    updateContent({
      projects: projects.filter((item) => item.id !== id),
    });
  };

  const addBullet = (projId: string) => {
    const newBullet = { id: crypto.randomUUID(), text: "", isAIGenerated: false };
    updateContent({
      projects: projects.map((item) =>
        item.id === projId
          ? { ...item, bullets: [...item.bullets, newBullet] }
          : item
      ),
    });
  };

  const updateBullet = (projId: string, bulletId: string, text: string) => {
    updateContent({
      projects: projects.map((item) =>
        item.id === projId
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

  const removeBullet = (projId: string, bulletId: string) => {
    updateContent({
      projects: projects.map((item) =>
        item.id === projId
          ? { ...item, bullets: item.bullets.filter((b) => b.id !== bulletId) }
          : item
      ),
    });
  };

  const enhanceBullet = async (projId: string, bulletId: string, text: string) => {
    // Simulate AI enhancement
    updateContent({
      projects: projects.map((item) =>
        item.id === projId
          ? {
              ...item,
              bullets: item.bullets.map((b) =>
                b.id === bulletId
                  ? {
                      ...b,
                      text: `[Enhanced] ${text.length > 0 ? text : "Built high-performance application processing 1M+ rows daily."}`,
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
          Highlight key projects that demonstrate your skills.
        </p>
        <Button onClick={addProject} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {projects.map((item) => (
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
                      {item.name || "(Unnamed Project)"}
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
                      removeProject(item.id);
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
                        <Label>Project Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateProject(item.id, { name: e.target.value })}
                          placeholder="e.g. E-commerce API"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Tech Stack (comma separated)</Label>
                        <Input
                          value={item.techStack.join(", ")}
                          onChange={(e) => updateProject(item.id, { techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                          placeholder="e.g. Node.js, Redis, PostgreSQL"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>GitHub URL</Label>
                        <Input
                          value={item.githubUrl || ""}
                          onChange={(e) => updateProject(item.id, { githubUrl: e.target.value })}
                          placeholder="e.g. github.com/user/project"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Live URL</Label>
                        <Input
                          value={item.liveUrl || ""}
                          onChange={(e) => updateProject(item.id, { liveUrl: e.target.value })}
                          placeholder="e.g. project.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:col-span-2">
                        <div className="space-y-1">
                          <Label>Start Date (Optional)</Label>
                          <Input
                            value={item.startDate || ""}
                            onChange={(e) => updateProject(item.id, { startDate: e.target.value })}
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>End Date (Optional)</Label>
                          <Input
                            value={item.endDate || ""}
                            onChange={(e) => updateProject(item.id, { endDate: e.target.value })}
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 mb-6">
                       <Label>Short Description</Label>
                       <Textarea
                          value={item.description}
                          onChange={(e) => updateProject(item.id, { description: e.target.value })}
                          placeholder="Brief 1-2 sentence overview of the project..."
                          className="min-h-[60px]"
                       />
                    </div>

                    {/* Bullets */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Detailed Achievements</Label>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 text-xs gap-1.5"
                          onClick={() => addBullet(item.id)}
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Bullet
                        </Button>
                      </div>

                      {item.bullets.map((bullet) => (
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
                      
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {projects.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
             <p className="text-neutral-500 mb-4">You haven&apos;t added any projects yet.</p>
             <Button onClick={addProject}>
               <Plus className="w-4 h-4 mr-2" /> Add Project
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}

