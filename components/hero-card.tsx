"use client";

import { motion } from "framer-motion";
import { BentoItem } from "./bento-grid";
import { Flame, Zap } from "lucide-react";

export default function HeroCard() {
  return (
    <BentoItem className="col-span-1 md:col-span-2 lg:col-span-4 min-h-[220px] relative overflow-hidden bg-gradient-to-br from-violet-950/20 via-neutral-950 to-indigo-950/20 border border-violet-500/25 p-8">
      {/* Decorative Gradient Glows inside Card */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.02) 60%, transparent 80%) pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%) pointer-events-none" />

      {/* Grid Pattern overlay within Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 h-full w-full">
        {/* Left Area: Welcome Title */}
        <header className="space-y-4 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(139,92,246,0.1)]"
          >
            <Zap size={10} className="fill-violet-400 text-violet-400" />
            Active Platform Accelerator
          </motion.span>
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(139,92,246,0.25)]">Sai</span> 👋
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg">
              You&apos;re doing amazing! You completed <strong className="text-violet-400 font-semibold underline decoration-violet-500/40 underline-offset-4">4 lessons</strong> yesterday. Your next scheduled goal is <strong className="text-cyan-400 font-semibold">AI Engineering at 8:00 PM</strong>.
            </p>
          </div>
        </header>

        {/* Right Area: Streak Widget */}
        <aside className="flex items-center gap-5 shrink-0 bg-black/60 border border-white/5 p-5 rounded-2xl backdrop-blur-xl relative group-hover:border-violet-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-2xl pointer-events-none" />
          
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-pulse">
            <Flame size={32} className="fill-amber-400/20" />
          </div>
          
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">28</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Days Streak</span>
            </div>
            <p className="text-xs text-neutral-400 font-semibold mt-0.5">Keep learning daily! 🔥</p>
            
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 relative flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              </span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Top 2% Globally</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Subtly glowing bottom highlight strip */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 opacity-80" />
    </BentoItem>
  );
}
