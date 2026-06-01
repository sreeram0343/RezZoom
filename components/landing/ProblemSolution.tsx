"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    "Hours tweaking LaTeX in Overleaf",
    "Broken formatting every Word update",
    "ATS rejection with no feedback",
    "Rewriting the same resume for 50 jobs",
    "Guessing what keywords recruiters want",
    "Losing track of which version you sent",
  ];

  const solutions = [
    "AI generates polished bullets in seconds",
    "Templates auto-format, zero manual work",
    "Live ATS score with exact improvement steps",
    "One-click tailoring per job description",
    "Keyword gap analysis vs job requirements",
    "Git-like version history for every resume",
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 grayscale-[20%] opacity-90"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-error/10 text-error text-sm font-semibold">
                The Old Way
              </span>
              <span className="text-2xl" role="img" aria-label="skull">💀</span>
            </div>
            
            <ul className="space-y-5">
              {problems.map((problem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                >
                  <X className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 rounded-2xl border border-brand-500/30 bg-white dark:bg-neutral-950 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-3 mb-8">
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold">
                The Rezzoom Way
              </span>
              <span className="text-2xl" role="img" aria-label="zap">⚡</span>
            </div>
            
            <ul className="relative z-10 space-y-5">
              {solutions.map((solution, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 text-neutral-900 dark:text-white font-medium"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 + i * 0.1 }}
                    className="shrink-0 mt-0.5"
                  >
                    <Check className="w-5 h-5 text-success" />
                  </motion.div>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
