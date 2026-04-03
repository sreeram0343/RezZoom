import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

export default function JobDescriptionInput({ onJdSubmit, onNext, ctaText = "Analyze Resume" }) {
  const [text, setText] = useState('');

  const handleNext = () => {
    if (text.trim()) {
      onJdSubmit(text);
      if (onNext) onNext();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center slide-up mt-10">
      <h2 className="text-3xl font-extrabold mb-3 text-main tracking-tight">
        Paste Job Description
      </h2>
      <p className="text-muted text-base mb-8 text-center max-w-xl leading-relaxed">
        Paste the job description for the role you're applying to, and we'll optimize your resume exactly to match its requirements.
      </p>
      
      <div className="card w-full p-2 mb-6 shadow-sm border border-border">
        <textarea 
          className="input-textarea border-none shadow-none bg-white"
          placeholder="e.g. SOC Analyst Intern... We are looking for someone with Python, SQL, and AWS experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{minHeight: '280px', fontSize: '0.95rem'}}
        />
      </div>

      <div className="w-full flex justify-end">
        <button 
          className="btn btn-primary px-8 py-3 text-base shadow-lg" 
          onClick={handleNext} 
          disabled={!text.trim()}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
