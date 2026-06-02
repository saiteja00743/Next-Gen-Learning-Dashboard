"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  Clock,
  Zap,
  BookOpen,
  Calendar,
  Activity,
  History,
  Award,
} from "lucide-react";

// Mock Weekly Data
const weeklyData = [
  { day: "Mon", hours: 4.5, label: "4.5h" },
  { day: "Tue", hours: 8.0, label: "8.0h" },
  { day: "Wed", hours: 3.2, label: "3.2h" },
  { day: "Thu", hours: 6.8, label: "6.8h" },
  { day: "Fri", hours: 9.5, label: "9.5h" },
  { day: "Sat", hours: 2.0, label: "2.0h" },
  { day: "Sun", hours: 5.4, label: "5.4h" },
];

// Mock Subject Distribution Data
const subjects = [
  { name: "Frontend (React/Next)", percentage: 40, color: "#8b5cf6", xp: 1200 },
  { name: "AI Engineering", percentage: 30, color: "#f59e0b", xp: 900 },
  { name: "Databases (Supabase)", percentage: 20, color: "#10b981", xp: 600 },
  { name: "System Design", percentage: 10, color: "#06b6d4", xp: 300 },
];

// Mock Session Log
const sessionHistory = [
  {
    id: "1",
    date: "Jun 1, 2026",
    course: "Next.js Mastery",
    duration: "2.5 hrs",
    topic: "React Server Components Deep Dive",
    xp: "+250 XP",
  },
  {
    id: "2",
    date: "May 31, 2026",
    course: "AI Engineering",
    duration: "1.8 hrs",
    topic: "Vector Databases & RAG Setup",
    xp: "+180 XP",
  },
  {
    id: "3",
    date: "May 30, 2026",
    course: "Advanced React Patterns",
    duration: "3.1 hrs",
    topic: "Compound Components & Performance",
    xp: "+310 XP",
  },
  {
    id: "4",
    date: "May 28, 2026",
    course: "System Design Basics",
    duration: "1.2 hrs",
    topic: "Load Balancers & Reverse Proxies",
    xp: "+120 XP",
  },
  {
    id: "5",
    date: "May 27, 2026",
    course: "Intro to TypeScript",
    duration: "2.0 hrs",
    topic: "Generics & Utility Types",
    xp: "+200 XP",
  },
];

export default function AnalyticsPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Math for SVG Donut (radius=40, circumference = 2 * pi * r = 251.3)
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.327
  let cumulativePercentage = 0;

  return (
    <section className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
          Learning Metrics
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Performance Analytics
        </h2>
      </header>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <article className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Weekly Average</span>
            <h4 className="text-lg font-black text-white">5.6 Hours</h4>
          </div>
        </article>

        <article className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Total XP Gained</span>
            <h4 className="text-lg font-black text-white">3,400 XP</h4>
          </div>
        </article>

        <article className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Completion Velocity</span>
            <h4 className="text-lg font-black text-white">+12% vs Avg</h4>
          </div>
        </article>

        <article className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Rank percentile</span>
            <h4 className="text-lg font-black text-white">Top 2%</h4>
          </div>
        </article>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Bar Chart */}
        <article className="glass rounded-2xl p-6 border border-white/5 flex flex-col space-y-6 justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Activity size={16} className="text-violet-400" />
              Weekly Study Volume
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
              Hours per Day
            </span>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-56 flex items-end justify-between px-2 sm:px-6 pt-6 relative border-b border-white/5">
            {weeklyData.map((data, idx) => {
              // Scale height based on maximum value (9.5h represents 100%)
              const heightPercent = (data.hours / 9.5) * 85;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Hours Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredBar === idx && (
                      <motion.span
                        initial={{ opacity: 0, y: -5, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.9 }}
                        className="absolute -top-10 px-2 py-1 rounded bg-violet-600 text-white font-bold text-[10px] pointer-events-none shadow-[0_0_10px_rgba(139,92,246,0.5)] z-25"
                      >
                        {data.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* The Bar */}
                  <div className="w-8 sm:w-10 bg-neutral-900 rounded-t-lg overflow-hidden border border-white/[0.02] flex items-end h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.05 }}
                      className="w-full rounded-t-lg relative"
                      style={{
                        background: "linear-gradient(180deg, #8b5cf6 0%, #6366f1 100%)",
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.25)",
                      }}
                    />
                  </div>

                  {/* X-Axis Label */}
                  <span className="text-[10px] font-bold text-neutral-500 mt-2">{data.day}</span>
                </div>
              );
            })}
          </div>
        </article>

        {/* Donut Chart - Subject Distribution */}
        <article className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <BarChart2 size={16} className="text-amber-400" />
              Focus Distribution
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
              Hours by Category
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-around h-56">
            {/* SVG Ring */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="-rotate-90">
                {/* Background Ring */}
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />

                {/* Colored Segments */}
                {subjects.map((sub, idx) => {
                  const strokeDashoffset = circumference - (circumference * sub.percentage) / 100;
                  const strokeDasharray = `${circumference} ${circumference}`;
                  const currentCumulative = cumulativePercentage;
                  const rotationOffset = (currentCumulative / 100) * circumference;
                  
                  cumulativePercentage += sub.percentage;

                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      stroke={sub.color}
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        strokeDashoffset: strokeDashoffset,
                        transformOrigin: "50px 50px",
                        transform: `rotate(${(currentCumulative / 100) * 360}deg)`,
                        transition: "stroke-dashoffset 0.8s ease-out",
                      }}
                    />
                  );
                })}
              </svg>

              {/* Central Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Total</span>
                <span className="text-base font-black text-white">3,000 XP</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-3 w-full sm:w-auto">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sub.color }} />
                    {sub.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-500 font-bold">{sub.xp} XP</span>
                    <span className="font-bold text-white w-8 text-right">{sub.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Learning Log History Table */}
      <article className="glass rounded-2xl p-6 border border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <History size={16} className="text-cyan-400" />
          Recent Study Sessions
        </h3>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px] list-none">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Topic / Module</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-right">XP Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {sessionHistory.map((session) => (
                <tr
                  key={session.id}
                  className="group hover:bg-white/[0.01] transition-all text-xs font-semibold text-neutral-300"
                >
                  <td className="py-4 px-4 text-neutral-400 flex items-center gap-2">
                    <Calendar size={13} className="text-neutral-600" />
                    {session.date}
                  </td>
                  <td className="py-4 px-4 text-white font-bold">{session.course}</td>
                  <td className="py-4 px-4">{session.topic}</td>
                  <td className="py-4 px-4 text-neutral-400">{session.duration}</td>
                  <td className="py-4 px-4 text-right font-black text-violet-400 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                    {session.xp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
