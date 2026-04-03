import React from 'react';
import { Target, AlertCircle, CheckCircle, Lightbulb, Zap, RefreshCw, Download } from 'lucide-react';

export default function AtsDashboard({ results, onReset, onGeneratePdf }) {
  const { type, score, matched = [], missing = [], suggestions, weakBullets, sectionFeedback, metricDensity } = results;

  const scoreColor = score >= 70 ? 'text-green-500' : score >= 40 ? 'text-yellow-500' : 'text-red-500';
  const scoreMessage = score >= 70 ? 'Excellent match. Highly likely to pass ATS.' 
                     : score >= 40 ? 'Fair coverage. Consider adding missing keywords.' 
                     : 'Needs Improvement. Strongly recommend optimizing.';

  return (
    <div className="dashboard-container mt-12 slide-up w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center text-main tracking-tight">
          <Target className="text-primary mr-3" size={28} />
          ATS Analysis Results
        </h2>
        <div className="flex gap-3">
          <button className="btn outline text-sm flex items-center shadow-sm" onClick={onReset}>
            <RefreshCw size={16} className="mr-2" /> Start Over
          </button>
          <button className="btn btn-primary text-sm flex items-center shadow-md py-3 px-6" onClick={onGeneratePdf}>
            <Download size={16} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Score Circular Chart Section */}
        <div className="card shadow-md w-full md:w-1/3 flex flex-col items-center justify-center p-10 bg-white border border-border">
          <h3 className="font-bold text-xl text-main mb-8 tracking-tight">Match Score</h3>
          
          <div className="score-circle-container mb-6" style={{ width: '160px', height: '160px' }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
              <circle className="score-circle-bg" cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" />
              <circle 
                className="score-circle-progress" 
                cx="50" cy="50" r="40" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (score / 100) * 251.2} 
                transform="rotate(-90 50 50)"
                stroke={score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </svg>
            <div className={`score-text ${scoreColor}`} style={{ fontSize: '3rem', fontWeight: '800' }}>
              {score}<span style={{ fontSize: '1.25rem' }}>%</span>
            </div>
          </div>
          <p className="text-sm text-muted text-center max-w-[200px] leading-relaxed">{scoreMessage}</p>
        </div>

        {/* Keyword Results or General Feedback Section */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {type === 'general' ? (
            <>
              <div className="card bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  Format & Structure Parser
                </h3>
                <p className="text-sm text-muted mb-4">
                  We scanned your document for standard headers like "Skills", "Experience", and "Education". Missing these severely hurts your parser reliability.
                </p>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg">
                  {sectionFeedback.length === 0 ? (
                    <p className="text-sm text-green-600 font-medium flex items-center"><CheckCircle size={16} className="mr-2"/> All core ATS structural sections found.</p>
                  ) : (
                    <ul className="list-disc pl-5 text-sm text-main space-y-2 opacity-90">
                      {sectionFeedback.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  )}
                </div>
              </div>
              <div className="card bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="text-blue-500 mr-2" size={20} />
                  Impact Metric Density
                </h3>
                <p className="text-sm text-muted mb-2">
                  ATS ranking algorithms favor resumes with quantifiable logic (numbers, percentages, dollars) over vague claims.
                </p>
                <div className="flex items-center gap-4 mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="text-3xl font-extrabold text-primary">{metricDensity || 0}</span>
                  <p className="text-sm text-main font-medium leading-relaxed">Quantifiable metrics discovered in your text.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  Critical Missing Keywords <span className="ml-2 text-sm text-slate-500 font-normal">({missing.length})</span>
                </h3>
                {missing.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {missing.map((kw, idx) => (
                      <span key={idx} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted italic">No critical keywords missing!</p>
                )}
              </div>

              <div className="card bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  Matched Keywords <span className="ml-2 text-sm text-slate-500 font-normal">({matched.length})</span>
                </h3>
                {matched.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matched.map((kw, idx) => (
                      <span key={idx} className="bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted italic">No matched keywords found.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Advanced Feedback Row */}
      <div className="grid md-grid-2 gap-8 mt-8">
        <div className="card bg-white p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold mb-6 flex items-center tracking-tight">
            <Lightbulb className="text-yellow-500 mr-2" size={22} />
            Overall Strategy & Feedback
          </h3>
          
          <div className="space-y-6">
            <div>
               <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">General Advice</h4>
               <ul className="list-disc pl-5 text-sm text-main space-y-2 opacity-90 leading-relaxed">
                 {suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
               </ul>
            </div>

            {sectionFeedback.length > 0 && (
              <div>
                 <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Structure</h4>
                 <ul className="list-disc pl-5 text-sm text-main space-y-2 opacity-90 leading-relaxed">
                   {sectionFeedback.map((s, idx) => <li key={idx}>{s}</li>)}
                 </ul>
              </div>
            )}
          </div>
        </div>

        {weakBullets && weakBullets.length > 0 && (
          <div className="card border-red-200 bg-red-50 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center text-red-600 tracking-tight">
              <Zap className="text-red-500 mr-2" size={22} />
              Instant Fix: Weak Bullet Points
            </h3>
            <p className="text-sm text-slate-600 mb-6">We found generic or weak action verbs. Re-write them with strong verbs and definitive metrics.</p>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {weakBullets.slice(0, 4).map((bullet, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-red-200 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="text-red-400 text-sm mb-2 opacity-90 flex items-start">
                    <span className="font-bold mr-2 mt-0.5 relative top-px">✕</span>
                    <span className="italic leading-relaxed">"{bullet}"</span>
                  </div>
                  <div className="text-green-600 text-sm font-medium flex items-center pt-2 mt-2 border-t border-gray-100">
                    <span className="font-bold mr-2">✓</span>
                    Try starting with: "Developed", "Engineered", etc.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
