"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const examples = [
  { role: "Software Engineer", hiredAt: "Google", score: 94 },
  { role: "Data Scientist", hiredAt: "Netflix", score: 96 },
  { role: "Product Manager", hiredAt: "Stripe", score: 92 },
  { role: "UX Designer", hiredAt: "Airbnb", score: 90 },
  { role: "CS Student", hiredAt: "Meta", score: 88 },
];

export function ResumeExamples() {
  return (
    <section id="examples" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4"
            >
              Job-winning examples
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-500 dark:text-neutral-400"
            >
              See the exact formats that got our users hired at top companies.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/signup" className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-2 group">
              View all examples <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {examples.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[300px] md:min-w-[400px] snap-start shrink-0"
            >
              <div className="group relative rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 overflow-hidden">
                {/* Score Badge */}
                <div className="absolute top-4 right-4 z-10 bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm">
                  ATS: {example.score}
                </div>

                {/* Simulated Resume Image */}
                <div className="aspect-[1/1.2] bg-white rounded-lg shadow-sm border border-neutral-200 mb-6 p-4 flex flex-col gap-2 relative overflow-hidden group-hover:shadow-md transition-shadow">
                    <div className="w-1/2 h-2.5 bg-neutral-800 rounded-sm mb-2" />
                    <div className="w-full h-1.5 bg-neutral-300 rounded-sm" />
                    <div className="w-full h-1.5 bg-neutral-300 rounded-sm" />
                    <div className="w-3/4 h-1.5 bg-neutral-300 rounded-sm mb-4" />
                    
                    <div className="w-1/3 h-2 bg-neutral-800 rounded-sm mb-2" />
                    <div className="w-full h-1.5 bg-neutral-300 rounded-sm" />
                    <div className="w-full h-1.5 bg-neutral-300 rounded-sm" />
                    <div className="w-5/6 h-1.5 bg-neutral-300 rounded-sm mb-4" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                       <Link
                          href="/signup"
                          className="px-5 py-2.5 bg-white text-neutral-900 font-semibold rounded-lg shadow-xl hover:scale-105 transition-transform"
                       >
                         Use This Format
                       </Link>
                    </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl text-neutral-900 dark:text-white mb-1">
                    {example.role}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                    Hired at <span className="text-brand-600 dark:text-brand-400">{example.hiredAt}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
