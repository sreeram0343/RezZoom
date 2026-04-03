import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AnalyzerFlow from './pages/AnalyzerFlow';
import BuilderFlow from './pages/BuilderFlow';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TemplatesGallery from './pages/TemplatesGallery';

export default function App() {
  return (
    <Router>
      <div className="app-container bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900">
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyzer" element={<AnalyzerFlow />} />
            <Route path="/builder" element={<BuilderFlow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<TemplatesGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
