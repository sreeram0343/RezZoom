import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';
import ChooseStart from '../components/ChooseStart';
import JobDescriptionInput from '../components/JobDescriptionInput';
import ResumeInput from '../components/ResumeInput';
import AtsDashboard from '../components/AtsDashboard';
import apiClient from '../api/client';
// Helper to highlight words in text
const HighlightedText = ({ text, keywords, highlightClass }) => {
  if (!text) return null;
  if (!keywords || keywords.length === 0) return <>{text}</>;
  
  const escapedKeywords = keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);
  const keywordSet = new Set(keywords.map(k => k.toLowerCase()));

  return (
    <>
      {parts.map((part, i) => {
        if (keywordSet.has(part.toLowerCase())) {
          return <span key={i} className={`highlight-text ${highlightClass}`}>{part}</span>;
        }
        return part;
      })}
    </>
  );
};

export default function AnalyzerFlow() {
  const [step, setStep] = useState('choose'); // choose, jd, input, analyze, results
  const [mode, setMode] = useState(''); // 'job' or 'general'
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [results, setResults] = useState(null);
  const [isSlowResponse, setIsSlowResponse] = useState(false);

  const handleModeSelect = (selectedMode) => {
    // Treat 'build' as taking to builder, but here we process 'job' vs 'general' uploads
    if (selectedMode === 'build') {
       window.location.href = '/builder';
       return;
    }
    setMode(selectedMode);
    if (selectedMode === 'general') {
      setStep('input');
    } else {
      setStep('jd');
    }
  };

  const handleJdSubmit = (text) => {
    setJdText(text);
  };

  const handleGoToInput = () => {
    setStep('input');
  };

  const handleAnalyze = async (overrideResumeText = null) => {
    const finalResumeText = typeof overrideResumeText === 'string' ? overrideResumeText : resumeText;
    setResumeText(finalResumeText);
    setStep('analyze');
    setIsSlowResponse(false);
    
    // Timer to alert the user of Render free tier cold starts
    const slowTimer = setTimeout(() => setIsSlowResponse(true), 5000);
    
    try {
      const response = await apiClient.post('/resume/analyze', {
        text: finalResumeText,
        jdText: mode === 'general' ? '' : jdText
      });
      clearTimeout(slowTimer);
      setResults(response.data);
      setStep('results');
    } catch (err) {
      clearTimeout(slowTimer);
      console.error('Error analyzing resume:', err);
      // Fallback or error handling UI could be here
      alert('Failed to analyze resume. Check backend connection.');
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('choose');
    setMode('');
    setResumeText('');
    setJdText('');
    setResults(null);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-6 md:py-12">
      <AnimatePresence mode="wait">
        {step === 'choose' && (
          <motion.div key="choose" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ChooseStart onSelect={handleModeSelect} />
          </motion.div>
        )}
        
        {step === 'jd' && (
          <motion.div key="jd" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <JobDescriptionInput 
              onJdSubmit={handleJdSubmit} 
              onNext={handleGoToInput} 
              ctaText="Next: Provide Resume" 
            />
          </motion.div>
        )}

        {step === 'input' && (
          <motion.div key="input" className="max-w-3xl mx-auto mt-10" variants={pageVariants} initial="initial" animate="animate" exit="exit">
             <h2 className="text-3xl font-extrabold mb-3 text-slate-900 tracking-tight text-center">
               {mode === 'general' ? 'Analyze General Outline' : 'Provide Existing Resume'}
             </h2>
             <p className="text-slate-500 text-base mb-8 text-center leading-relaxed">
               Drop your PDF or paste your current resume text. We'll extract your details instantly.
             </p>
             <ResumeInput 
               onResumeSubmit={(text) => handleAnalyze(text)} 
             />
          </motion.div>
        )}

        {step === 'analyze' && (
          <motion.div key="analyze" className="flex-center flex-col py-32" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-6 drop-shadow-md"></div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Analyzing Content...</h2>
            <p className="text-slate-500 text-lg animate-pulse mb-6">Running ATS heuristic matching models</p>
            {isSlowResponse && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl max-w-sm text-center shadow-sm">
                 <p className="font-semibold mb-1 text-amber-800">Waking up the AI Engine ☕</p>
                 <p className="text-sm">Since we are using a free tier, the backend may take up to 50 seconds to spin up from sleep. Hang tight!</p>
               </motion.div>
            )}
          </motion.div>
        )}

        {step === 'results' && results && (
          <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <AtsDashboard 
              results={results} 
              onReset={handleReset} 
              onGeneratePdf={() => {}} 
            />

            <div className={`grid ${results.type === 'general' ? '' : 'md:grid-cols-2'} gap-8 mt-12 pb-10`}>
              <div className="glass-card flex flex-col h-full">
                <div className="p-5 border-b border-slate-100 bg-white/50 rounded-t-2xl">
                  <h3 className="text-base font-semibold text-slate-800">Your Parsed Resume</h3>
                </div>
                <div className="p-6 bg-white/80 rounded-b-2xl text-sm custom-scrollbar flex-1" style={{maxHeight: '400px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#1f2937'}}>
                  <HighlightedText text={resumeText} keywords={results.matched || []} highlightClass="bg-green-100 text-green-700 font-bold px-1 rounded-sm" />
                </div>
              </div>

              {results.type !== 'general' && (
                <div className="glass-card flex flex-col h-full">
                  <div className="p-5 border-b border-slate-100 bg-white/50 rounded-t-2xl">
                    <h3 className="text-base font-semibold text-slate-800">Target Job Description</h3>
                  </div>
                  <div className="p-6 bg-white/80 rounded-b-2xl text-sm custom-scrollbar flex-1" style={{maxHeight: '400px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#1f2937'}}>
                    <HighlightedText text={jdText} keywords={results.missing_keywords || []} highlightClass="bg-red-100 text-red-700 font-bold px-1 rounded-sm" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
