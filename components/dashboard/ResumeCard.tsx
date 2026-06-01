import Link from "next/link";
import { MoreHorizontal, FileEdit, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ResumeCardProps {
  resume: {
    id: string;
    title: string;
    templateId: string;
    atsScore: number | null;
    updatedAt: Date;
  };
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-neutral-300";
    if (score < 50) return "text-ats-poor";
    if (score < 70) return "text-ats-fair";
    if (score < 85) return "text-ats-good";
    return "text-ats-great";
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-brand-500/50">
      
      {/* Thumbnail placeholder */}
      <div className="aspect-[1/1.4] bg-neutral-100 dark:bg-neutral-950 p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden">
        {/* Fake resume lines */}
        <div className="w-full h-full bg-white dark:bg-neutral-900 shadow-sm flex flex-col p-3 gap-2 opacity-50 group-hover:scale-[1.02] transition-transform">
          <div className="w-1/2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded mb-2" />
          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="w-3/4 h-1 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] gap-2">
          <Link
            href={`/builder/${resume.id}`}
            className="p-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <FileEdit className="w-5 h-5" />
          </Link>
          <button className="p-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1 pr-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
              {resume.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
              {resume.templateId.replace("-", " ")} Template
            </p>
          </div>
          <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 ${getScoreColor(resume.atsScore).replace('text-', 'border-')} font-bold text-sm bg-white dark:bg-neutral-950 ${getScoreColor(resume.atsScore)}`}>
            {resume.atsScore ?? "-"}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-neutral-400">
            Edited {formatDistanceToNow(new Date(resume.updatedAt))} ago
          </p>
          <button className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
