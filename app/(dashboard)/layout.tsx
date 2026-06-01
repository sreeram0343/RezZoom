"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  FileText,
  Plus,
  Gauge,
  Target,
  Bot,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/auth/supabase";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "My Resumes", href: "/resumes", icon: FileText },
  { name: "Resume Builder", href: "/builder/new", icon: Plus },
  { name: "ATS Analyzer", href: "/ats", icon: Gauge },
  { name: "Job Tailor", href: "/tailor", icon: Target },
  { name: "AI Assistant", href: "/assistant", icon: Bot },
  { name: "Analytics", href: "/analytics", icon: BarChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl leading-none">R</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Rezzoom
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}

        <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

        {/* Placeholder for active resume versions could go here */}
      </nav>

      <div className="p-4 mt-auto space-y-2 border-t border-neutral-200 dark:border-neutral-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
        
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border border-brand-100 dark:border-brand-800/50">
           <p className="text-xs font-semibold text-brand-800 dark:text-brand-300 mb-2">Free Plan</p>
           <div className="w-full h-1.5 bg-brand-200 dark:bg-brand-950 rounded-full overflow-hidden mb-2">
              <div className="w-1/3 h-full bg-brand-500 rounded-full" />
           </div>
           <p className="text-xs text-brand-600 dark:text-brand-400 mb-3">1/3 free resumes used</p>
           <button className="w-full py-1.5 bg-white dark:bg-neutral-900 text-brand-700 dark:text-brand-400 text-xs font-semibold rounded-lg shadow-sm border border-brand-200 dark:border-brand-800 hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors">
             Upgrade to Pro
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[240px] shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-[280px] h-full shadow-2xl flex flex-col bg-white">
             <Sidebar />
             <button className="absolute top-4 right-4 p-2 text-neutral-500" onClick={() => setIsMobileOpen(false)}>
               <X className="w-6 h-6" />
             </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-between px-4 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl leading-none">R</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Rezzoom</span>
          </Link>
          <button onClick={() => setIsMobileOpen(true)} className="p-2 -mr-2 text-neutral-600 dark:text-neutral-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
