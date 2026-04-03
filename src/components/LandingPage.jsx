import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileSearch, ArrowRight, Zap, Shield, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text */}
          <motion.div className="flex-1 max-w-2xl text-center lg:text-left" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
              <Sparkles size={16} />
              <span>Free AI-Powered Toolkit</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">ATS-Friendly</span> Resumes in Minutes
            </h1>
            
            <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              No Overleaf. No Payments. No Confusion. Create a stunning resume from scratch or analyze your existing one against real job descriptions to instantly boost your hireability.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/builder" className="btn btn-primary w-full sm:w-auto text-lg hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 group">
                Create Resume
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/analyzer" className="btn outline w-full sm:w-auto text-lg flex items-center gap-2">
                <FileSearch size={20} />
                Check Resume Score
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> 100% Free</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> No Sign-up Required</span>
            </div>
          </motion.div>

          {/* Right Floating Demo (Glassmorphism Mockup) */}
          <motion.div className="flex-1 w-full relative perspective-1000" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-sky-50 rounded-[40px] blur-3xl opacity-50 transform -rotate-6 scale-105"></div>
            
            <div className="glass relative rounded-[32px] p-8 border border-white/40 shadow-2xl overflow-hidden bg-white/60">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">ATS Match Score</h3>
                  <p className="text-slate-500 text-sm">Product Manager Role</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-500 flex items-center justify-center relative">
                  <span className="font-extrabold text-blue-600 text-xl">86<span className="text-sm">%</span></span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-[86%]" initial={{ width: 0 }} animate={{ width: '86%' }} transition={{ duration: 1.5, delay: 0.5 }}></motion.div>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md">12 Keywords Found</span>
                  <span className="text-red-500 bg-red-50 px-2 py-1 rounded-md">3 Missing</span>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border border-slate-100 shadow-sm mt-6">
                 <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">AI Suggestion</p>
                 <p className="text-sm text-slate-600 line-through mb-1">Managed a team of developers.</p>
                 <p className="text-sm text-slate-900 font-medium relative pl-3 border-l-2 border-blue-500">
                    Spearheaded a cross-functional squad of 8 engineers, driving a 20% increase in sprint velocity.
                 </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose RezZoom?</h2>
            <p className="text-lg text-slate-500">Built specifically for students and job seekers who want premium features without the paywall.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                 <Zap size={24} />
               </div>
               <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
               <p className="text-slate-500">No clunky interfaces. Instantly parse PDFs and generate tailored recommendations.</p>
            </div>
            
            <div className="card p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                 <Sparkles size={24} />
               </div>
               <h3 className="text-xl font-semibold mb-3">AI Suggestions</h3>
               <p className="text-slate-500">Stuck on bullet points? Let our AI rewrite them to be impactful and keyword-rich.</p>
            </div>

            <div className="card p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                 <Shield size={24} />
               </div>
               <h3 className="text-xl font-semibold mb-3">100% Free Forever</h3>
               <p className="text-slate-500">Zero hidden paywalls, zero subscriptions. Download your optimized PDF immediately.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
