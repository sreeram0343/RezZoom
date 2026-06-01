"use client";

import { motion } from "framer-motion";

export function SocialProof() {
  const logos = ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix", "Stripe"];

  return (
    <section className="bg-neutral-900 border-y border-neutral-800 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <span className="text-neutral-400 text-sm font-medium whitespace-nowrap">
          Trusted by engineers at
        </span>
        
        {/* Marquee on mobile, flex row on desktop */}
        <div className="flex overflow-hidden relative w-full md:w-auto mask-image-linear-gradient">
          <motion.div
            className="flex gap-8 md:gap-12 min-w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {/* Double the logos to create seamless loop */}
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="text-neutral-500 font-display font-bold text-xl md:text-2xl uppercase tracking-wider hover:text-white transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
