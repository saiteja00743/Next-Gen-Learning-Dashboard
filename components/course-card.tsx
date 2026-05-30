"use client";

import { motion } from "framer-motion";
import { BentoItem } from "./bento-grid";
import { Course } from "@/types/course";
import * as Icons from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Dynamically resolve the Lucide Icon
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[course.icon_name] || Icons.BookOpen;

  // Visual themes matching course name/type
  let accentColor = "#8b5cf6"; // Violet
  let glowColor = "rgba(139, 92, 246, 0.25)";
  let barGradient = "from-violet-500 to-indigo-500";
  let borderHover = "group-hover:border-violet-500/30";

  if (course.icon_name === "Rocket") {
    accentColor = "#06b6d4"; // Cyan
    glowColor = "rgba(6, 182, 212, 0.25)";
    barGradient = "from-cyan-500 to-blue-500";
    borderHover = "group-hover:border-cyan-500/30";
  } else if (course.icon_name === "Cpu") {
    accentColor = "#10b981"; // Emerald
    glowColor = "rgba(16, 185, 129, 0.22)";
    barGradient = "from-emerald-500 to-teal-500";
    borderHover = "group-hover:border-emerald-500/30";
  } else if (course.icon_name === "Brain") {
    accentColor = "#f59e0b"; // Amber
    glowColor = "rgba(245, 158, 11, 0.22)";
    barGradient = "from-amber-500 to-orange-500";
    borderHover = "group-hover:border-amber-500/30";
  }

  return (
    <BentoItem 
      className={`col-span-1 min-h-[220px] bg-neutral-950/80 border border-white/5 flex flex-col justify-between p-6 transition-all duration-300 relative group overflow-hidden ${borderHover}`}
      style={{
        boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.02)`,
      }}
    >
      {/* Decorative Radial Grid inside card */}
      <div 
        className="absolute -right-16 -bottom-16 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Subtly glowing color glow highlight on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${glowColor}`
        }}
      />

      {/* Card Header: Icon and status tag */}
      <header className="flex justify-between items-start w-full relative z-10">
        <span
          className="p-3 rounded-xl border flex items-center justify-center shrink-0"
          style={{
            borderColor: `${accentColor}25`,
            background: `${accentColor}08`,
            color: accentColor,
            boxShadow: `0 0 12px ${accentColor}15`,
          }}
        >
          <IconComponent size={20} className="relative z-10" />
        </span>
        <span 
          className="text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded border"
          style={{
            borderColor: `${accentColor}20`,
            background: `${accentColor}05`,
            color: accentColor
          }}
        >
          Active
        </span>
      </header>

      {/* Card Body: Title & Meta */}
      <div className="mt-5 relative z-10 w-full">
        <h3 className="font-extrabold text-neutral-100 group-hover:text-white transition-colors duration-200 text-base leading-tight tracking-tight line-clamp-1">
          {course.title}
        </h3>
        <p className="text-[11px] text-neutral-400 font-medium mt-1 uppercase tracking-wider">
          Student Progress
        </p>
      </div>

      {/* Card Footer: Progress Tracker */}
      <section className="mt-6 w-full relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold" style={{ color: accentColor }}>
            {course.progress}% Complete
          </span>
          <span className="text-[10px] text-neutral-500 font-bold">12/16 modules</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="progress-track w-full bg-neutral-900 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            style={{ 
              originX: 0,
              backgroundColor: accentColor
            }}
            transition={{ type: "spring", stiffness: 85, damping: 16, delay: 0.3 }}
            className={`progress-fill w-full bg-gradient-to-r ${barGradient}`}
          />
        </div>
      </section>
    </BentoItem>
  );
}
