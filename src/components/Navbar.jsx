import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart2, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isLanding ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
              <svg width="20" height="24" viewBox="0 0 24 28" fill="none" className="transform scale-110">
                <defs>
                  <linearGradient id="boltGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <path d="M13 2L3 16h8l-2 10 12-14h-8l3-10z" fill="url(#boltGradNav)" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Rez<span className="text-blue-600">Zoom</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/builder" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <FileText size={16} /> Builder
            </Link>
            <Link to="/analyzer" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <BarChart2 size={16} /> Analyzer
            </Link>
            <Link to="/templates" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <LayoutDashboard size={16} /> Templates
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link to="/builder" className="btn btn-primary !py-2 !px-4 !text-sm">
              Create Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
