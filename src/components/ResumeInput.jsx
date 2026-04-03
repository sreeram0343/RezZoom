import React, { useState, useRef } from 'react';
import { FileText, CheckCircle, UploadCloud } from 'lucide-react';
import apiClient from '../api/client';

export default function ResumeInput({ onResumeSubmit }) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const handleProcess = () => {
    if (text.trim()) {
      onResumeSubmit(text);
      setSubmitted(true);
    }
  };

  const processFile = async (file) => {
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('Please upload a valid PDF or DOCX file.');
      return;
    }
    
    setIsExtracting(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      // Hit our new Node.js backend
      const response = await apiClient.post('/resume/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setText(response.data.text);
      setSubmitted(false);
    } catch (err) {
      console.error(err);
      alert('Error extracting text from file. Please paste manually.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="card h-full border border-slate-200">
      <div className="card-header border-b border-slate-100 bg-slate-50 rounded-t-xl">
        <h2 className="card-title flex items-center">
          <FileText className="text-blue-500 mr-2" size={20} />
          Your Resume
        </h2>
        {submitted && <CheckCircle className="text-green-500" size={20} />}
      </div>
      
      <div className="card-body p-6 flex-col gap-4">
        {!text && (
          <div 
            className={`dropzone ${isDragging ? 'active' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {isExtracting ? (
              <div className="flex-center flex-col">
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                <p className="text-blue-600 text-sm font-medium">Extracting text via Backend...</p>
              </div>
            ) : (
              <>
                <UploadCloud size={40} className="text-slate-400 mb-3" />
                <p className="font-semibold mb-1 text-slate-800">Upload PDF or DOCX</p>
                <p className="text-xs text-slate-500">Drag & Drop or click to browse</p>
                <div className="mt-4 flex items-center w-full gap-4 opacity-50">
                  <div className="h-px bg-slate-300 flex-1 border-b"></div>
                  <span className="text-xs uppercase font-medium text-slate-500">OR</span>
                  <div className="h-px bg-slate-300 flex-1 border-b"></div>
                </div>
                <p className="text-xs text-slate-500 mt-3">Paste text below</p>
              </>
            )}
            <input 
              type="file" 
              accept="application/pdf, .docx" 
              className="hidden" 
              style={{display: 'none'}}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) processFile(e.target.files[0]);
                e.target.value = null; // reset
              }}
            />
          </div>
        )}

        <textarea 
          className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm ${!text ? 'mt-2' : ''}`}
          placeholder={text ? "" : "Paste your resume text manually here..."}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSubmitted(false);
          }}
          style={!text ? { minHeight: '100px' } : { flex: 1, minHeight: '300px' }}
        />
        <button 
          className="btn btn-primary mt-4 w-full font-semibold px-6 py-3" 
          onClick={handleProcess} 
          disabled={!text.trim() || submitted}
        >
          {submitted ? 'Resume Saved ✓' : 'Confirm Resume'}
        </button>
      </div>
    </div>
  );
}
