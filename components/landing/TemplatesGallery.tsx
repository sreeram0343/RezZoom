"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const templates = [
  { id: "minimal-ats", name: "Minimal ATS", badge: "Most Popular", badgeColor: "bg-brand-500", desc: "Best for conservative industries." },
  { id: "software-engineer", name: "Software Engineer", badge: "Best for Tech", badgeColor: "bg-purple-500", desc: "Highlights technical projects & stack." },
  { id: "data-scientist", name: "Data Scientist", badge: "Project-Focused", badgeColor: "bg-teal-500", desc: "Metrics-forward bullet styling." },
  { id: "product-manager", name: "Product Manager", badge: "Impact-Driven", badgeColor: "bg-orange-500", desc: "Highlights leadership & scale." },
  { id: "academic", name: "Academic", badge: "Research-Focused", badgeColor: "bg-neutral-600", desc: "Traditional academic CV format." },
  { id: "executive", name: "Executive", badge: "Leadership", badgeColor: "bg-blue-800", desc: "Emphasis on scale and board roles." },
  { id: "student", name: "Student/Intern", badge: "Entry Level", badgeColor: "bg-success", desc: "Education & extracurriculars first." },
  { id: "creative", name: "Creative", badge: "Design Roles", badgeColor: "bg-pink-500", desc: "Left sidebar, portfolio hero treatment." },
];

export function TemplatesGallery() {
  return (
    <section id="templates" className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4"
          >
            8 ATS-Optimized Templates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 dark:text-neutral-400"
          >
            All pass ATS parsers. All export to pixel-perfect PDF.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 md:pb-0 snap-x snap-mandatory">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="min-w-[280px] md:min-w-0 snap-start group relative rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 overflow-hidden cursor-pointer hover:border-brand-500/50 transition-colors"
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-[1/1.4] bg-neutral-100 dark:bg-neutral-900 p-4 relative overflow-hidden flex items-center justify-center">
                {/* Fake Resume Layout Graphic based on template */}
                <div className="w-full h-full bg-white shadow-sm flex flex-col p-3 gap-2 opacity-50 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-1/2 h-2 bg-neutral-300 rounded mb-2" />
                    <div className="w-full h-1 bg-neutral-200 rounded" />
                    <div className="w-full h-1 bg-neutral-200 rounded" />
                    <div className="w-3/4 h-1 bg-neutral-200 rounded mb-2" />
                    <div className="w-1/3 h-2 bg-neutral-300 rounded mb-1" />
                    <div className="w-full h-1 bg-neutral-200 rounded" />
                    <div className="w-5/6 h-1 bg-neutral-200 rounded" />
                </div>
                
                {/* CTA Overlay */}
                <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <Link
                      href="/signup"
                      className="px-6 py-2 bg-white text-neutral-900 font-semibold rounded-lg shadow-lg hover:bg-neutral-50 transition-colors"
                   >
                     Use Template
                   </Link>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {template.name}
                  </h3>
                </div>
                <span className={cn("inline-block px-2 py-1 rounded text-xs font-medium text-white mb-3", template.badgeColor)}>
                  {template.badge}
                </span>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {template.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
