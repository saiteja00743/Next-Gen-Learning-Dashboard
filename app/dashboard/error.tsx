"use client";

import { useEffect } from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error encountered:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Error Card */}
      <div className="glass rounded-2xl p-8 max-w-md w-full border border-rose-500/20 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(244,63,94,0.15)]">
          <AlertOctagon size={32} />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-neutral-100 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          We encountered an unexpected error while loading your dashboard. Please try reloading or head back home.
        </p>

        {/* Digest Info */}
        {error.digest && (
          <code className="block mt-4 p-2 rounded bg-neutral-900 border border-white/5 text-[10px] text-neutral-500 font-mono select-all">
            ID: {error.digest}
          </code>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 border border-violet-500/30 text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-all duration-200 cursor-pointer"
          >
            <RotateCcw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass hover:bg-white/5 border border-white/10 text-neutral-300 transition-all duration-200"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
