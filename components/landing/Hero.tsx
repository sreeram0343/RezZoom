"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-neutral-950">
      {/* Animated background mesh gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 overflow-hidden">
            <span className="text-brand-400 text-sm font-medium">✦ AI-Powered • Free Forever</span>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl mb-6"
        >
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-[-0.02em] text-white">
            Build ATS-Optimized Resumes in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              Minutes
            </span>
            , Not Hours
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-[540px] text-lg sm:text-xl text-neutral-400 mb-10 text-balance"
        >
          Generate, tailor, and export job-winning resumes with AI. No LaTeX. No formatting headaches. Just results.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 w-full sm:w-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link
              href="/signup"
              className="w-full sm:w-auto h-[52px] px-8 inline-flex items-center justify-center rounded-xl bg-brand-600 text-white text-base font-semibold hover:bg-brand-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Create Resume Free &rarr;
            </Link>
            <Link
              href="#templates"
              className="w-full sm:w-auto h-[52px] px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white text-base font-medium hover:bg-white/10 transition-colors"
            >
              View Templates
            </Link>
          </div>
          <p className="text-neutral-500 text-sm">
            No credit card required &middot; Free forever
          </p>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-400 z-10"
                )}
                style={{ zIndex: 10 - i }}
              >
                U{i}
              </div>
            ))}
          </div>
          <div className="text-sm text-neutral-400 font-medium">
            <span className="text-white">10,000+</span> resumes created
          </div>
        </motion.div>
      </div>

      {/* Floating Resume Mockup */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 lg:right-10 w-[400px] h-[500px] bg-white rounded-xl shadow-2xl origin-bottom-right transform rotate-[-15deg] rotate-y-[-20deg] rotate-x-[10deg] opacity-20 lg:opacity-100 hidden md:block pointer-events-none"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white to-neutral-50 rounded-xl overflow-hidden border border-neutral-200">
           {/* Fake Resume Content */}
           <div className="p-8 h-full flex flex-col gap-4">
              <div className="w-1/2 h-6 bg-neutral-200 rounded" />
              <div className="w-1/3 h-4 bg-neutral-100 rounded" />
              <div className="w-full h-px bg-neutral-100 my-2" />
              <div className="w-1/4 h-5 bg-neutral-200 rounded" />
              <div className="w-full h-3 bg-neutral-100 rounded" />
              <div className="w-full h-3 bg-neutral-100 rounded" />
              <div className="w-5/6 h-3 bg-neutral-100 rounded" />
           </div>
        </div>
      </motion.div>
    </section>
  );
}
