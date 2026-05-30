"use client";

import { motion } from "framer-motion";
import { BentoItem } from "./bento-grid";
import { CalendarRange, Activity, Sparkles } from "lucide-react";

export default function ActivityCard() {
  // Weekly hours learned mock data
  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 4.0 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 3.2 },
    { day: "Fri", hours: 5.5 },
    { day: "Sat", hours: 2.0 },
    { day: "Sun", hours: 3.8 },
  ];

  // Maximum value for scaling the bar heights
  const maxHours = 6;

  // Generate GitHub-style contribution blocks (12 weeks, 7 days each = 84 cells)
  const contributionLevels = [
    0, 1, 2, 0, 3, 1, 2, 0, 1, 0, 2, 3, 4, 1, 0, 2, 1, 0, 0, 1, 2,
    3, 1, 0, 1, 2, 0, 4, 3, 2, 1, 0, 2, 0, 1, 3, 1, 0, 2, 4, 1, 0,
    0, 1, 2, 3, 0, 1, 2, 1, 0, 3, 2, 4, 1, 0, 2, 1, 0, 1, 3, 2, 0,
    1, 2, 0, 4, 1, 0, 3, 2, 1, 0, 2, 1, 0, 1, 3, 4, 2, 0, 1, 2, 3
  ];

  // Get color for contribution block
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-violet-950/60 border border-violet-500/10";
      case 2:
        return "bg-violet-800/60 border border-violet-500/20";
      case 3:
        return "bg-violet-600/70 border border-violet-500/30";
      case 4:
        return "bg-violet-500 border border-violet-400/50 glow-violet shadow-[0_0_8px_rgba(139,92,246,0.5)]";
      default:
        return "bg-white/[0.02] border border-white/[0.03]";
    }
  };

  return (
    <BentoItem className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[340px] bg-neutral-950/80 border border-white/5 flex flex-col justify-between p-6 hover:border-indigo-500/20 transition-all duration-300 relative group overflow-hidden">
      {/* Decorative Radial glow */}
      <div className="absolute -left-20 -bottom-20 w-48 h-48 rounded-full bg-radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%) pointer-events-none" />

      {/* Top Header */}
      <header className="flex justify-between items-center pb-4 border-b border-white/5 w-full">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.15)]">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-neutral-100 tracking-tight">Learning Activity</h3>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">Effort Analytics</p>
          </div>
        </div>
        <span className="text-[9px] uppercase font-black text-indigo-400 tracking-wider px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
          This Week
        </span>
      </header>

      {/* Main content division */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-6 w-full">
        {/* Weekly Bar Chart */}
        <section className="flex flex-col justify-between w-full">
          <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-4 font-bold">
            Weekly Hours
          </div>
          <div className="flex items-end justify-between h-28 px-1">
            {weeklyData.map((data, index) => {
              const barHeightPercent = (data.hours / maxHours) * 100;
              return (
                <div key={index} className="flex flex-col items-center gap-2 flex-1 group/bar relative">
                  <div className="relative w-full flex justify-center">
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-1.5 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 text-[9px] bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-violet-300 font-black whitespace-nowrap z-30">
                      {data.hours}h
                    </span>
                    {/* Bar track */}
                    <div className="w-4 sm:w-5 h-24 bg-neutral-900/80 border border-white/5 rounded-full overflow-hidden flex items-end">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        style={{
                          height: `${barHeightPercent}%`,
                          originY: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 90,
                          damping: 16,
                          delay: 0.08 * index,
                        }}
                        className="w-full bg-gradient-to-t from-violet-600 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] text-neutral-500 font-bold uppercase">{data.day[0]}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribution Graph (GitHub Style) */}
        <section className="flex flex-col justify-between w-full">
          <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-4 font-bold flex items-center gap-1.5">
            <CalendarRange size={12} className="text-neutral-500" />
            <span>Contributions</span>
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-[3px] p-3 bg-neutral-900/40 border border-white/5 rounded-2xl justify-center items-center">
            {contributionLevels.map((level, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.002 }}
                className={`w-[7px] h-[7px] contrib-cell ${getCellColor(level)}`}
                whileHover={{ scale: 1.4, zIndex: 10 }}
              />
            ))}
          </div>

          {/* Grid Legends */}
          <div className="flex justify-between items-center text-[9px] text-neutral-500 font-semibold px-1 mt-3">
            <span>84d ago</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <span className="w-1.5 h-1.5 bg-neutral-900 border border-white/5 rounded-[1px]" />
              <span className="w-1.5 h-1.5 bg-violet-950/60 border border-violet-500/10 rounded-[1px]" />
              <span className="w-1.5 h-1.5 bg-violet-800/60 border border-violet-500/20 rounded-[1px]" />
              <span className="w-1.5 h-1.5 bg-violet-600/70 border border-violet-500/30 rounded-[1px]" />
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-[1px]" />
              <span>More</span>
            </div>
          </div>
        </section>
      </div>

      {/* Summary Stat Footer */}
      <footer className="text-xs text-neutral-400 mt-2 pt-3 border-t border-white/5 flex justify-between items-center w-full">
        <span className="font-medium">Active: <strong className="text-neutral-200">5/7 days</strong></span>
        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/25">
          <Sparkles size={10} className="fill-emerald-400" />
          +12% effort
        </span>
      </footer>
    </BentoItem>
  );
}
