import React from 'react';
import { FilePlus, FileText, CheckSquare } from 'lucide-react';

export default function ChooseStart({ onSelect }) {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center slide-up mt-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-main tracking-tight">
        Choose How to Start
      </h2>
      <p className="text-muted text-base mb-10 text-center max-w-2xl leading-relaxed">
        Select a path below based on what you need—whether it's getting a fast baseline score or perfectly tailoring an application.
      </p>
      
      <div className="grid gap-6 w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        
        {/* General Check Card */}
        <div 
          className="selector-card flex flex-col items-start"
          onClick={() => onSelect('general')}
        >
          <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100" style={{ backgroundColor: '#eff6ff' }}>
            <CheckSquare size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">General Resume Check</h3>
          <p className="text-muted text-sm leading-relaxed">
            No Job Description needed. Upload your current resume for an instant structural parser verification and language analysis.
          </p>
        </div>

        {/* Tailor to Job Description Card */}
        <div 
          className="selector-card flex flex-col items-start"
          onClick={() => onSelect('upload')}
        >
          <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
            <FileText size={32} className="text-main" />
          </div>
          <h3 className="text-xl font-bold mb-2">Tailor to a Job Post</h3>
          <p className="text-muted text-sm leading-relaxed">
            Have a target Job Description? Upload your existing resume and paste the JD to map exactly what critical keywords you're missing.
          </p>
        </div>

        {/* Build From Scratch Card */}
        <div 
          className="selector-card flex flex-col items-start"
          onClick={() => onSelect('build')}
        >
          <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
            <FilePlus size={32} className="text-main" />
          </div>
          <h3 className="text-xl font-bold mb-2">Build From Scratch</h3>
          <p className="text-muted text-sm leading-relaxed">
            Answer basic input fields and let our smart ATS Engine guide you to structure a perfectly formatted ATS resume natively.
          </p>
        </div>
      </div>
    </div>
  );
}
