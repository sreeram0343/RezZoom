"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  Gauge,
  Target,
  Zap,
  LayoutTemplate,
  Download,
  GitBranch,
  Bot,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Resume Builder",
    description: "Paste your experience. Get a polished resume.",
  },
  {
    icon: Gauge,
    title: "ATS Score Checker",
    description: "Know your score before submission. 0-100 with exact fixes.",
  },
  {
    icon: Target,
    title: "Job Description Match",
    description: "Paste any JD. See your match percentage instantly.",
  },
  {
    icon: Zap,
    title: "One-Click Tailoring",
    description: "AI rewrites your resume for each job in 15 seconds.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description: "8 LaTeX-quality templates, zero LaTeX knowledge required.",
  },
  {
    icon: Download,
    title: "PDF & DOCX Export",
    description: "Export beautiful resumes that render perfectly everywhere.",
  },
  {
    icon: GitBranch,
    title: "Version History",
    description: "Track every edit. Restore any version. Never lose work.",
  },
  {
    icon: Bot,
    title: "AI Career Assistant",
    description: "Chat with AI about your career. Get personalized guidance.",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "See exactly what skills are missing for your target role.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-white"
          >
            Everything you need to land the job
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:-translate-y-1 hover:shadow-lg hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 ease-spring">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
