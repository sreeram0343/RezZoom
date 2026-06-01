"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Upload, Link2, Target, TrendingUp, Clock, Gauge } from "lucide-react";
import { ResumeCard } from "@/components/dashboard/ResumeCard";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  // In a real app, these would come from an API endpoint
  const [resumes] = useState([
    {
      id: "1",
      title: "Senior Full Stack Engineer",
      templateId: "minimal-ats",
      atsScore: 92,
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "2",
      title: "Google SWE Role",
      templateId: "software-engineer",
      atsScore: 88,
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ]);

  const recentActivity = [
    {
      id: "1",
      action: "Resume tailored for",
      target: "Google SWE role",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      icon: Target,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      id: "2",
      action: "ATS score improved from 67 to",
      target: "88",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      icon: TrendingUp,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/10",
    },
    {
      id: "3",
      action: "PDF exported",
      target: "Senior Full Stack Engineer",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      icon: Clock,
      iconColor: "text-neutral-500",
      iconBg: "bg-neutral-500/10",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 dark:text-white">
            Welcome back, User
          </h1>
          <p className="text-neutral-500">Here&apos;s what&apos;s happening with your job search.</p>
        </div>
        <Link
          href="/builder/new"
          className="hidden md:flex h-10 px-4 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Resume
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Total Resumes</p>
              <p className="text-2xl font-display font-bold text-neutral-900 dark:text-white">{resumes.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Best ATS Score</p>
              <p className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                {Math.max(...resumes.map(r => r.atsScore || 0))}/100
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Jobs Tailored For</p>
              <p className="text-2xl font-display font-bold text-neutral-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Resumes Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-neutral-900 dark:text-white">Recent Resumes</h2>
            <Link href="/resumes" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View All
            </Link>
          </div>

          {resumes.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 border-dashed rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-950 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Create your first resume</h3>
              <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Get started by building from scratch, uploading an existing resume, or importing from LinkedIn.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/builder/new?from=scratch" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
                  <Plus className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs font-medium">From Scratch</span>
                </Link>
                <Link href="/builder/new?from=upload" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
                  <Upload className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs font-medium">Upload PDF/DOCX</span>
                </Link>
                <Link href="/builder/new?from=linkedin" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
                  <Link2 className="w-5 h-5 text-neutral-500" />
                  <span className="text-xs font-medium">LinkedIn Import</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <h2 className="font-display font-bold text-xl text-neutral-900 dark:text-white mb-6">Recent Activity</h2>
          
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="space-y-6">
              {recentActivity.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-4 relative">
                    {i !== recentActivity.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-neutral-200 dark:bg-neutral-800" />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg} ${activity.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="pt-1 min-w-0 flex-1">
                      <p className="text-sm text-neutral-900 dark:text-white">
                        {activity.action} <span className="font-semibold">{activity.target}</span>
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {formatDistanceToNow(activity.time)} ago
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FileText } from "lucide-react";