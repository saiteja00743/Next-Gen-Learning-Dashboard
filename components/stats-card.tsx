"use client";

import { BentoItem } from "./bento-grid";
import * as Icons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "up" | "down" | "neutral";
  iconName: string;
  themeColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  iconName,
  themeColor = "#8b5cf6",
}: StatsCardProps) {
  // Dynamically resolve the Lucide Icon
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName] || Icons.TrendingUp;

  // Set colors based on changeType
  const changeColor =
    changeType === "up"
      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
      : changeType === "down"
      ? "text-rose-400 border-rose-500/20 bg-rose-500/5"
      : "text-neutral-400 border-white/5 bg-neutral-900";

  return (
    <BentoItem 
      className="col-span-1 border border-white/5 bg-neutral-950/80 flex flex-col justify-between p-6 min-h-[160px] hover:border-white/10 transition-all duration-300 relative group overflow-hidden"
      style={{
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.02)`,
      }}
    >
      {/* Decorative hover gradient */}
      <div 
        className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`
        }}
      />

      {/* Icon and Title */}
      <header className="flex justify-between items-center w-full relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{title}</span>
        <span
          className="p-2.5 rounded-xl border flex items-center justify-center shrink-0"
          style={{
            borderColor: `${themeColor}20`,
            background: `${themeColor}05`,
            color: themeColor,
          }}
        >
          <IconComponent size={16} />
        </span>
      </header>

      {/* Value and Trend Indicator */}
      <section className="mt-6 flex items-end justify-between w-full relative z-10">
        <span className="block">
          <span className="text-3xl font-black tracking-tight text-white bg-clip-text bg-gradient-to-br from-white to-neutral-300">
            {value}
          </span>
        </span>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border tracking-wide uppercase ${changeColor}`}>
          {change}
        </span>
      </section>
    </BentoItem>
  );
}
