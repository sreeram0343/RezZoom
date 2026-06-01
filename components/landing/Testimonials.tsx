"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const testimonials = [
  {
    quote: "Got 3× more callbacks after using Rezzoom. The ATS score went from 54 to 91.",
    name: "Priya S.",
    role: "Software Engineer",
    company: "Shopify",
    color: "bg-blue-500",
  },
  {
    quote: "I used to spend 2 hours per application tweaking formatting. Now it's under 10 minutes with the one-click tailor.",
    name: "Marcus T.",
    role: "ML Engineer",
    company: "Anthropic",
    color: "bg-purple-500",
  },
  {
    quote: "The AI bullet enhancement is magic. It took my weak responsibilities and turned them into metric-driven achievements.",
    name: "Sarah L.",
    role: "Product Manager",
    company: "Stripe",
    color: "bg-orange-500",
  },
  {
    quote: "Finally, a resume builder that understands tech. The GitHub/portfolio links actually look good and it parses my skills perfectly.",
    name: "David K.",
    role: "Frontend Dev",
    company: "Vercel",
    color: "bg-neutral-800",
  },
  {
    quote: "I landed my dream role at Netflix, and the recruiter specifically mentioned how clean and easy to read my resume was.",
    name: "Elena R.",
    role: "Data Scientist",
    company: "Netflix",
    color: "bg-red-500",
  },
  {
    quote: "The version history feature saved me when I needed to revert to an older summary for a specific consulting gig.",
    name: "James W.",
    role: "Consultant",
    company: "McKinsey",
    color: "bg-green-600",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4"
          >
            Loved by thousands of job seekers
          </motion.h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4 text-warning">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed mb-6 font-medium">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm", testimonial.color)}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                      {testimonial.name}
                    </span>
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
