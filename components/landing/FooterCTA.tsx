"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FooterCTA() {
  return (
    <footer className="bg-neutral-950 pt-24 pb-12 text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-brand-600 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper CTA */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 max-w-3xl"
          >
            Your next job starts with a better resume.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 mb-10"
          >
            Join 10,000+ professionals. Free forever.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto h-14 px-10 inline-flex items-center justify-center rounded-xl bg-brand-600 text-white text-lg font-semibold hover:bg-brand-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Build My Resume — It&apos;s Free
            </Link>
          </motion.div>
        </div>

        {/* Footer Nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-t border-neutral-800 pt-16">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-bold text-2xl tracking-tight mb-4 block">Rezzoom</span>
            <p className="text-sm text-neutral-500 max-w-xs">
              Built with AI for job seekers. Land your dream role faster.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-neutral-300 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-300 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-300 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-neutral-600">
          © {new Date().getFullYear()} Rezzoom. Built with AI for job seekers.
        </div>
        
      </div>
    </footer>
  );
}
