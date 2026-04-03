import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MoreVertical, Plus, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const resumes = [
    { id: 1, title: 'Software Engineer - Google', lastEdited: '2 days ago', score: 86 },
    { id: 2, title: 'Product Manager - Stripe', lastEdited: '1 week ago', score: 92 },
    { id: 3, title: 'Base Tech Resume', lastEdited: '3 weeks ago', score: 75 },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full p-6 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your resumes and track your ATS scores.</p>
        </div>
        <Link to="/builder" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> New Resume
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {resumes.map((resume, idx) => (
          <motion.div 
            key={resume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="card group cursor-pointer hover:border-blue-300 hover:shadow-xl transition-all"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <button className="text-slate-400 hover:text-slate-700">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <h3 className="font-semibold text-lg text-slate-900 mb-1 truncate">{resume.title}</h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-6">
                <Clock size={14} /> Edited {resume.lastEdited}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className={resume.score >= 80 ? 'text-green-500' : 'text-yellow-500'} />
                  <span className="text-sm font-medium text-slate-700">ATS Score:</span>
                </div>
                <span className={`font-bold ${resume.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {resume.score}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Create New Card Placeholder */}
        <Link to="/builder" className="card border-dashed border-2 border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-colors group min-h-[240px]">
           <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
             <Plus size={24} />
           </div>
           <h3 className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">Create New Draft</h3>
        </Link>
      </motion.div>
    </div>
  );
}
