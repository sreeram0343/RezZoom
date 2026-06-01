"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function DemoPreview() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "Paste your experience", desc: "Just dump your raw text or existing resume." },
    { title: "AI generates bullets", desc: "Watch Claude rewrite them for maximum impact." },
    { title: "Export in seconds", desc: "Download a perfectly formatted PDF instantly." },
  ];

  return (
    <section className="py-24 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Steps */}
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
              From blank page to hired in <span className="text-brand-400">3 steps</span>
            </h2>
            
            <div className="space-y-8 relative">
              {/* Connecting line */}
              <div className="absolute left-[27px] top-[40px] bottom-[40px] w-px bg-neutral-800" />

              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-6">
                  {/* Step indicator */}
                  <div
                    className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      activeStep === i
                        ? "bg-brand-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        : activeStep > i
                        ? "bg-brand-600/30"
                        : "bg-neutral-900 border border-neutral-800"
                    }`}
                  >
                    {activeStep > i ? (
                      <CheckCircle2 className="w-6 h-6 text-brand-400" />
                    ) : (
                      <span className={`font-semibold ${activeStep === i ? "text-white" : "text-neutral-500"}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>
                  
                  {/* Step content */}
                  <div className={`pt-3 transition-opacity duration-500 ${activeStep === i ? "opacity-100" : "opacity-50"}`}>
                    <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-neutral-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Link
                href="/signup"
                className="h-12 px-8 inline-flex items-center justify-center rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-colors shadow-sm"
              >
                Try it yourself — free
              </Link>
            </motion.div>
          </div>

          {/* Right: Preview Animation */}
          <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:ml-auto">
            {/* Base Card */}
            <motion.div
              className="absolute inset-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-neutral-200"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              {/* Fake UI Header */}
              <div className="h-12 border-b border-neutral-100 bg-neutral-50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              
              {/* Animated Content based on activeStep */}
              <div className="p-6 relative h-full">
                
                {/* Step 1: Input */}
                <motion.div
                  className="absolute inset-0 p-6 bg-white"
                  initial={false}
                  animate={{ opacity: activeStep === 0 ? 1 : 0, zIndex: activeStep === 0 ? 10 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-32 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: activeStep === 0 ? "100%" : 0 }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="overflow-hidden whitespace-nowrap text-neutral-400 font-mono text-xs"
                    >
                      Built API using node and react...
                    </motion.div>
                  </div>
                </motion.div>

                {/* Step 2: Processing */}
                <motion.div
                  className="absolute inset-0 p-6 bg-white flex flex-col gap-4"
                  initial={false}
                  animate={{ opacity: activeStep === 1 ? 1 : 0, zIndex: activeStep === 1 ? 10 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-2 items-center mb-4 text-brand-600 text-sm font-medium">
                    <Wand2 className="w-4 h-4 animate-pulse" /> AI Enhancing...
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: activeStep === 1 ? 1 : 0, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2"
                  >
                    <span className="text-brand-500 mt-1">•</span>
                    <div className="text-neutral-800 text-sm">
                      <span className="font-semibold">Architected</span> scalable REST APIs using Node.js and React, <span className="font-semibold">handling 10k+ requests/sec</span>.
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: activeStep === 1 ? 1 : 0, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="flex gap-2"
                  >
                    <span className="text-brand-500 mt-1">•</span>
                    <div className="text-neutral-800 text-sm">
                      <span className="font-semibold">Reduced</span> API latency by <span className="font-semibold">40%</span> through Redis caching layer implementation.
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 3: Export */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={false}
                  animate={{ opacity: activeStep === 2 ? 1 : 0, zIndex: activeStep === 2 ? 10 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-full flex flex-col items-center justify-center bg-neutral-50">
                    <div className="w-32 h-40 bg-white border border-neutral-200 shadow-md rounded flex flex-col p-2 gap-1 relative">
                       <div className="w-1/2 h-2 bg-neutral-300 mx-auto rounded-sm mb-2" />
                       <div className="w-full h-1 bg-neutral-200 rounded-sm" />
                       <div className="w-full h-1 bg-neutral-200 rounded-sm" />
                       <div className="w-3/4 h-1 bg-neutral-200 rounded-sm" />
                       
                       <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: activeStep === 2 ? 1 : 0, opacity: activeStep === 2 ? 1 : 0 }}
                          transition={{ type: "spring", delay: 1 }}
                          className="absolute -right-6 -bottom-6 w-16 h-16 bg-success text-white rounded-full flex items-center justify-center shadow-lg"
                       >
                          <span className="font-bold">92</span>
                       </motion.div>
                    </div>
                    <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: activeStep === 2 ? 1 : 0 }}
                       transition={{ delay: 1.5 }}
                       className="mt-8 text-sm font-medium text-neutral-500 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> resume_final.pdf
                    </motion.div>
                  </div>
                </motion.div>
                
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
// Temporary icons, import from lucide-react above
import { Wand2, Download } from "lucide-react";