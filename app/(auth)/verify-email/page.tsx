"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl p-8 text-center">
      <div className="w-16 h-16 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="w-8 h-8" />
      </div>
      
      <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white mb-4">
        Check your email
      </h1>
      
      <p className="text-neutral-500 mb-8">
        We sent a verification link to{" "}
        <span className="font-medium text-neutral-900 dark:text-white">
          {email || "your email address"}
        </span>
        . Please click the link to verify your account and continue.
      </p>

      <div className="space-y-4">
        <Link href="/login" className="w-full h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-neutral-200 dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-50">
          Return to log in
        </Link>
      </div>
      
      <p className="mt-8 text-sm text-neutral-500">
        Didn&apos;t receive the email? Check your spam folder.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950">
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
