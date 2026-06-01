"use client";

import { useResumeStore } from "@/stores/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const { content, updateContent } = useResumeStore();
  const { personalInfo } = content;

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updateContent({
      personalInfo: { ...personalInfo, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="e.g. Jane Doe"
            value={personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            placeholder="e.g. Senior Software Engineer"
            value={personalInfo.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. jane@example.com"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. +1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location (City, State / Country)</Label>
          <Input
            id="location"
            placeholder="e.g. San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold mb-4 text-neutral-900 dark:text-white">Links (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="linkedin.com/in/janedoe"
              value={personalInfo.linkedinUrl || ""}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              placeholder="github.com/janedoe"
              value={personalInfo.githubUrl || ""}
              onChange={(e) => handleChange("githubUrl", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="portfolioUrl">Portfolio / Website URL</Label>
            <Input
              id="portfolioUrl"
              type="url"
              placeholder="janedoe.com"
              value={personalInfo.portfolioUrl || ""}
              onChange={(e) => handleChange("portfolioUrl", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
