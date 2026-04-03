import React from 'react';
import { Target, AlertCircle, CheckCircle, Lightbulb, Zap, RefreshCw, Download, Briefcase, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function AtsDashboard({ results, onReset, onGeneratePdf }) {
  const { 
    type, score, keyword_match, relevance, formatting, 
    missing_keywords = [], weak_sections = [], fix_recommendations = [],
    recruiter = {}, gap = {}
  } = results;

  const scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';
  const strokeColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const scoreMessage = score >= 80 ? 'Outstanding match. Highly likely to pass ATS.' 
                     : score >= 60 ? 'Good coverage. Consider acting on fix recommendations.' 
                     : 'Needs Improvement. High risk of ATS rejection.';

  return (
    <div className="dashboard-container mt-12 slide-up w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center text-main tracking-tight">
          <Target className="text-primary mr-3" size={28} />
          AI Analysis Results
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
        {/* ATS Score Card */}
        <div className="card shadow-md flex flex-col items-center justify-center p-8 bg-white border border-border">
          <h3 className="font-bold text-xl text-main mb-6 tracking-tight flex items-center">
            <Zap className="mr-2 text-primary" size={20}/>
            ATS Parse Score
          </h3>
          
          <div className="score-circle-container mb-6" style={{ width: '140px', height: '140px' }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
              <circle className="score-circle-bg" cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" />
              <circle 
                className="score-circle-progress" 
                cx="50" cy="50" r="40" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (score / 100) * 251.2} 
                transform="rotate(-90 50 50)"
                stroke={strokeColor}
                strokeWidth="8"
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </svg>
            <div className={`score-text ${scoreColor}`} style={{ fontSize: '2.5rem', fontWeight: '800' }}>
              {score || 0}<span style={{ fontSize: '1rem' }}>%</span>
            </div>
          </div>
          <div className="flex justify-between w-full text-xs text-muted mt-2 border-t pt-4">
            <span className="text-center w-1/3">Keywords<br/><strong className="text-main text-sm">{keyword_match || 0}%</strong></span>
            <span className="text-center w-1/3 border-l px-2">Relevance<br/><strong className="text-main text-sm">{relevance || 0}%</strong></span>
            <span className="text-center w-1/3 border-l px-2">Format<br/><strong className="text-main text-sm">{formatting || 0}%</strong></span>
          </div>
        </div>

        {/* Recruiter Verdict Card */}
        <div className="card shadow-md flex flex-col p-8 bg-white border border-border md:col-span-2">
          <h3 className="font-bold text-xl text-main mb-4 tracking-tight flex items-center">
            <Briefcase className="mr-2 text-primary" size={20}/>
            Recruiter 10-Second Verdict
          </h3>
          
          <div className={`flex items-center gap-4 p-4 rounded-xl mb-4 ${recruiter.shortlist === 'YES' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            {recruiter.shortlist === 'YES' ? <UserCheck className="text-green-600" size={32}/> : <UserX className="text-red-500" size={32}/>}
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-muted mb-1">Decision</p>
              <h4 className={`text-2xl font-black ${recruiter.shortlist === 'YES' ? 'text-green-700' : 'text-red-600'}`}>
                {recruiter.shortlist === 'YES' ? 'SHORTLISTED' : 'REJECTED'}
              </h4>
            </div>
          </div>
          
          <p className="text-sm text-slate-700 leading-relaxed italic border-l-4 pl-4 border-slate-300">
            "{recruiter.reason || 'Missing actionable reasoning.'}"
          </p>

          {recruiter.missing_for_top_companies && recruiter.missing_for_top_companies.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Missing for FAANG Level:</h4>
              <div className="flex flex-wrap gap-2">
                {recruiter.missing_for_top_companies.map((miss, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {miss}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full mt-4">
        {/* Fix Recommendations */}
        <div className="card bg-white p-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-5 flex items-center tracking-tight text-red-600">
            <AlertCircle className="mr-2" size={20} />
            High Priority Fixes
          </h3>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {(fix_recommendations || []).map((fix, idx) => (
              <div key={idx} className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start text-sm text-red-800">
                <span className="font-bold mt-0.5 mr-2">!</span> {fix}
              </div>
            ))}
            {(weak_sections || []).length > 0 && (
              <div className="mt-4 pt-4 border-t border-red-100">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Weak Sections</h4>
                <ul className="list-disc pl-5 text-sm text-red-700 opacity-90 space-y-1">
                  {weak_sections.map((ws, i) => <li key={i}>{ws}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Skill Gap & Roadmap */}
        {type === 'job' && gap.learning_plan && (
          <div className="card bg-white p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-5 flex items-center tracking-tight text-blue-600">
              <TrendingUp className="mr-2" size={20} />
              Career Skill Gap & Roadmap
            </h3>
            
            <div className="mb-4">
              <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Missing JD Skills ({gap.missing_skills?.length || 0})</h4>
              <div className="flex flex-wrap gap-2">
                {(gap.missing_skills || []).map((sk, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-sm text-xs font-bold shadow-sm">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Actionable Learning Plan</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${gap.priority_level === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  PRIORITY: {gap.priority_level}
                </span>
              </h4>
              <ul className="space-y-3">
                {(gap.learning_plan || []).map((plan, idx) => (
                  <li key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm text-slate-700 flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-0.5" size={16} />
                    {plan}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
