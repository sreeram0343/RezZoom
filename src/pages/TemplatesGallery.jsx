import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TemplatesGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const templates = [
    { id: 't1', name: 'Modern Minimalist', category: 'Modern', tags: ['Clean', 'Tech', 'ATS-Friendly'] },
    { id: 't2', name: 'Executive Professional', category: 'Professional', tags: ['Traditional', 'Finance', 'Leadership'] },
    { id: 't3', name: 'Creative Portfolio', category: 'Creative', tags: ['Design', 'Colorful', 'Marketing'] },
    { id: 't4', name: 'Tech Focused', category: 'Modern', tags: ['Software', 'Compact', 'High-density'] },
  ];

  const categories = ['All', 'Modern', 'Professional', 'Creative'];

  const filtered = activeCategory === 'All' ? templates : templates.filter(t => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Choose Your Template</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">All of our templates are strictly tested for ATS compatibility. Focus on your content, we'll handle the parsing.</p>
      </div>

      <div className="flex justify-center gap-2 mb-10">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === c ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((t, idx) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="card aspect-[1/1.4] relative overflow-hidden bg-white border border-slate-200 group-hover:border-blue-400 group-hover:shadow-xl transition-all flex items-center justify-center p-4">
               {/* Skeleton representation of a resume */}
               <div className="w-full h-full border border-slate-100 rounded opacity-50 bg-slate-50 flex flex-col p-4 space-y-4">
                  <div className="h-6 w-3/4 bg-slate-200 mx-auto rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-200 mx-auto rounded mb-4"></div>
                  
                  <div className="h-4 w-1/3 bg-slate-300 rounded mb-1"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                    <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                  </div>

                  <div className="h-4 w-1/3 bg-slate-300 rounded mb-1 mt-4"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                    <div className="h-2 w-4/5 bg-slate-200 rounded"></div>
                  </div>
               </div>

               {/* Hover Overlay */}
               <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center">
                 <Link to="/builder" className="btn btn-primary shadow-lg border-2 border-white">
                   Use Template
                 </Link>
               </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-slate-900">{t.name}</h3>
              <div className="flex gap-2 mt-2">
                {t.tags.slice(0,2).map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
