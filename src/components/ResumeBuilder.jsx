import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Download, CheckCircle, Wand2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import ResumePreview from './ResumePreview';
import apiClient from '../api/client';

const steps = ['Personal Info', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications', 'Achievements'];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const templates = [
    { id: 1, name: 'Modern' },
    { id: 2, name: 'Minimal' },
    { id: 3, name: 'Professional' }
  ];
  
  // Data State
  const [data, setData] = useState({
    personalInfo: { name: 'John Doe', location: 'New York, NY', email: 'john.doe@email.com', phone: '(555) 123-4567', linkedin: 'linkedin.com/in/johndoe', github: 'github.com/johndoe' },
    experience: "Company Name | Job Title\nMonth Year - Present\n- Developed scalable microservices.\n- Increased efficiency by 20%.",
    education: "University Name — Location\nDegree in Computer Science — Graduation Year",
    skills: "Programming Languages: Python, JavaScript, SQL\nFrameworks & Databases: React, Node.js, MongoDB",
    projects: "Project Name — React, Node, Tailwind\n- Built a high-performance web app.\n- Achieved 1000 daily users.",
    certifications: "AWS Certified Developer — 2023\nGoogle Cybersecurity Certification — 2023",
    achievements: "- Hackathon Winner 2023: Built an AI app in 24 hours.\n- Valedictorian of Computer Science Class"
  });

  const handleDataChange = (section, field, value) => {
    if (field) {
      setData({ ...data, [section]: { ...data[section], [field]: value } });
    } else {
      setData({ ...data, [section]: value });
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleAIEnhanceExperience = async () => {
    setIsEnhancing(true);
    try {
      const lines = data.experience.split('\n');
      const enhancedLines = await Promise.all(lines.map(async (line) => {
        if (line.trim().startsWith('-')) {
          const res = await apiClient.post('/resume/improve-bullet', { bullet: line });
          return '- ' + res.data.improved.replace(/^- /, '');
        }
        return line;
      }));
      setData({ ...data, experience: enhancedLines.join('\n') });
    } catch (err) {
      console.error(err);
      alert('Failed to enhance bullets.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateATS = async () => {
    setIsGenerating(true);
    try {
      const res = await apiClient.post('/resume/generate-ats', { resumeData: data });
      if (res.data) {
        setData(res.data);
        setSelectedTemplate(3); // Auto-switch to Professional ATS template
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate ATS resume via AI. Check API key or connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const pdfRef = React.useRef(null);

  const handleDownload = () => {
    const element = pdfRef.current;
    if (!element) return;
    
    const opt = {
      margin: [0.5, 0.5],
      filename: 'RezZoom_Resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50">
      
      {/* LEFT PANEL: Builder Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-full bg-white border-r border-slate-200 shadow-sm z-10 relative">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-bold text-slate-800">Resume Builder</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleGenerateATS}
              disabled={isGenerating}
              className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-md text-xs font-semibold shadow-sm flex items-center gap-1 disabled:opacity-50 transition-all"
            >
              {isGenerating ? <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Wand2 size={14}/>} 
              {isGenerating ? 'Generating...' : 'Magic ATS Generate'}
            </button>
            <span className="text-sm font-medium text-slate-500 hidden sm:block border-l border-slate-200 pl-3">Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex gap-2 overflow-x-auto custom-scrollbar">
          {steps.map((s, i) => (
            <button 
              key={s} 
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                currentStep === i 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : currentStep > i 
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {currentStep > i ? <CheckCircle size={14} /> : <div className="w-4 h-4 rounded-full bg-current opacity-20 hidden md:block"></div>}
              {s}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{steps[currentStep]}</h3>
              
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.name} onChange={e => handleDataChange('personalInfo', 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.email} onChange={e => handleDataChange('personalInfo', 'email', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.phone} onChange={e => handleDataChange('personalInfo', 'phone', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location (City, State, Country)</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.location || ''} onChange={e => handleDataChange('personalInfo', 'location', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.linkedin} onChange={e => handleDataChange('personalInfo', 'linkedin', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">GitHub / Portfolio</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={data.personalInfo.github || ''} onChange={e => handleDataChange('personalInfo', 'github', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-700">Experience Entries</label>
                    <button 
                      onClick={handleAIEnhanceExperience}
                      disabled={isEnhancing}
                      className="text-xs flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 disabled:opacity-50"
                    >
                      {isEnhancing ? <div className="w-3 h-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" /> : <Wand2 size={12}/>} 
                      {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                    </button>
                  </div>
                  <textarea 
                    className="w-full h-64 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.experience} 
                    onChange={e => handleDataChange('experience', null, e.target.value)}
                    placeholder="Company | Role&#10;Dates&#10;- Bullet point..."
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Education Details</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.education} 
                    onChange={e => handleDataChange('education', null, e.target.value)}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Technical & Soft Skills</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.skills} 
                    onChange={e => handleDataChange('skills', null, e.target.value)}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Projects</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.projects} 
                    onChange={e => handleDataChange('projects', null, e.target.value)}
                    placeholder="Project Name — Tech Stack&#10;- Built something cool."
                  />
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Certifications</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.certifications || ''} 
                    onChange={e => handleDataChange('certifications', null, e.target.value)}
                    placeholder="Google Certification — 2023"
                  />
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Achievements & Leadership</label>
                  <textarea 
                    className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm" 
                    value={data.achievements || ''} 
                    onChange={e => handleDataChange('achievements', null, e.target.value)}
                    placeholder="- Hackathon Winner..."
                  />
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="btn outline flex items-center gap-1 !px-4 disabled:opacity-50"
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {currentStep < steps.length - 1 ? (
             <button onClick={nextStep} className="btn btn-primary flex items-center gap-1 !px-6">
              Next <ChevronRight size={18} />
             </button>
          ) : (
            <button onClick={handleDownload} className="btn bg-green-500 hover:bg-green-600 text-white shadow-md flex items-center gap-2 !px-6">
              <Download size={18} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="hidden lg:flex w-1/2 bg-slate-200 p-8 flex-col h-full overflow-y-auto custom-scrollbar relative">
        <div className="flex justify-between items-center mb-6 z-10 relative">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden xl:block">Live Preview</h3>
          
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            {templates.map((t) => (
              <button 
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedTemplate === t.id 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Render actual Preview component */}
        <div className="bg-white shadow-2xl mx-auto" style={{ width: '8.5in', minHeight: '11in', transformOrigin: 'top center', transform: 'scale(0.8)' }}>
           <div ref={pdfRef}>
             <ResumePreview data={data} template={selectedTemplate} />
           </div>
        </div>
      </div>

    </div>
  );
}
