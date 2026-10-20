"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error tracking service
    console.error("Directory Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <span className="mt-5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
          Application Exception
        </span>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          An unexpected error occurred while loading this directory view. The system has
          logged the error details.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-500">
            Error Digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
          >
            Try Again
          </button>
          <Link
            href="/students"
            className="rounded-md border border-[#23314d] bg-[#141d30] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-[#1a253d]"
          >
            Return to Students Directory
          </Link>
        </div>
      </main>

    </div>
  );
}
