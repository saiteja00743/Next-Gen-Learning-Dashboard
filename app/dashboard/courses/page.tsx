"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  User,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Code,
  Rocket,
  Cpu,
  Brain,
  Shield,
  PlayCircle,
  Award,
} from "lucide-react";

// Mock courses data with syllabus details
const coursesData = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Dr. Evelyn Vance",
    category: "frontend",
    progress: 75,
    modulesTotal: 16,
    modulesCompleted: 12,
    hoursTotal: 24,
    icon: Code,
    color: "#8b5cf6",
    status: "in-progress",
    syllabus: [
      { name: "Higher-Order Components & Render Props", completed: true },
      { name: "React Context & State Composition", completed: true },
      { name: "Compound Components Pattern", completed: true },
      { name: "Custom Hooks & Performance Optimization", completed: true },
      { name: "State Reducer Pattern & Controlled Components", completed: false },
      { name: "Concurrent Features & Server-Side Suspense", completed: false },
    ],
  },
  {
    id: "2",
    title: "Next.js Mastery",
    instructor: "Marcus Sterling",
    category: "frontend",
    progress: 60,
    modulesTotal: 10,
    modulesCompleted: 6,
    hoursTotal: 18,
    icon: Rocket,
    color: "#6366f1",
    status: "in-progress",
    syllabus: [
      { name: "App Router & Layout System", completed: true },
      { name: "React Server Components (RSC) Deep Dive", completed: true },
      { name: "Dynamic Data Fetching, Caching & Revalidation", completed: true },
      { name: "Server Actions & Progressive Enhancement", completed: false },
      { name: "Middleware, Edge Runtime & Advanced Routing", completed: false },
      { name: "Static Site Generation & Incremental Rebuilds", completed: false },
    ],
  },
  {
    id: "3",
    title: "System Design Basics",
    instructor: "Sarah Jenkins",
    category: "backend",
    progress: 40,
    modulesTotal: 10,
    modulesCompleted: 4,
    hoursTotal: 20,
    icon: Cpu,
    color: "#06b6d4",
    status: "in-progress",
    syllabus: [
      { name: "Client-Server Architecture & Communication Protocols", completed: true },
      { name: "Load Balancers, Reverse Proxies & CDN Setup", completed: true },
      { name: "Relational vs. Non-Relational Databases & Sharding", completed: false },
      { name: "Caching Layers (Redis & Memcached) & Invalidation", completed: false },
      { name: "Message Queues & Event-Driven Microservices", completed: false },
    ],
  },
  {
    id: "4",
    title: "AI Engineering",
    instructor: "Prof. Liam Thorne",
    category: "ai",
    progress: 85,
    modulesTotal: 20,
    modulesCompleted: 17,
    hoursTotal: 30,
    icon: Brain,
    color: "#f59e0b",
    status: "in-progress",
    syllabus: [
      { name: "Introduction to LLMs, Tokenization & API Architectures", completed: true },
      { name: "Prompt Engineering, Few-Shot Learning & System Instructions", completed: true },
      { name: "Vector Databases, Embeddings & RAG Architectures", completed: true },
      { name: "Agentic Frameworks, Function Calling & State Machines", completed: true },
      { name: "Fine-Tuning Models & Evaluation Frameworks", completed: false },
      { name: "Deployment of Local Models & Performance Tuning", completed: false },
    ],
  },
  {
    id: "5",
    title: "Intro to TypeScript",
    instructor: "Alex Rivera",
    category: "frontend",
    progress: 100,
    modulesTotal: 8,
    modulesCompleted: 8,
    hoursTotal: 10,
    icon: Shield,
    color: "#10b981",
    status: "completed",
    syllabus: [
      { name: "Basic Types, Type Annotations & Type Inference", completed: true },
      { name: "Interfaces, Type Aliases & Union Types", completed: true },
      { name: "Generics, Utility Types & Type Assertion", completed: true },
      { name: "TypeScript Config, Strict Mode & Compilation", completed: true },
    ],
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "in-progress" | "completed"
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all" | "frontend" | "backend" | "ai"
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleSyllabus = (id: string) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <section className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
          Your Learning Program
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Active Courses
        </h2>
      </header>

      {/* Control Panel: Search & Filters */}
      <div className="glass rounded-2xl p-4 border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search courses or tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-white/10 bg-neutral-950/60 text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Select */}
          <div className="flex items-center gap-1 bg-neutral-950/40 border border-white/5 rounded-xl p-1 shrink-0">
            {["all", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer"
                style={{
                  background: statusFilter === status ? "rgba(255,255,255,0.06)" : "transparent",
                  color: statusFilter === status ? "#fff" : "#94a3b8",
                  border: statusFilter === status ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                }}
              >
                {status.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Category Select */}
          <div className="flex items-center gap-1 bg-neutral-950/40 border border-white/5 rounded-xl p-1 shrink-0">
            {["all", "frontend", "backend", "ai"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer"
                style={{
                  background: categoryFilter === cat ? "rgba(255,255,255,0.06)" : "transparent",
                  color: categoryFilter === cat ? "#fff" : "#94a3b8",
                  border: categoryFilter === cat ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses List/Grid */}
      {filteredCourses.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center border border-white/5 space-y-3">
          <BookOpen className="mx-auto w-12 h-12 text-neutral-600 animate-pulse" />
          <h3 className="text-sm font-bold text-neutral-300">No courses match your criteria</h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Try adjusting your search filters or queries to locate your course.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            const isExpanded = expandedCourse === course.id;

            return (
              <article
                key={course.id}
                className="glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                style={{
                  boxShadow: isExpanded ? `0 10px 30px -10px rgba(0,0,0,0.6)` : "none",
                }}
              >
                {/* Main Card Header Area */}
                <div className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  {/* Left info */}
                  <div className="flex items-center gap-4">
                    {/* Course icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${course.color}15`,
                        border: `1px solid ${course.color}30`,
                        boxShadow: `0 0 15px ${course.color}15`,
                        color: course.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white tracking-tight">{course.title}</h3>
                        {course.status === "completed" && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <Award size={10} /> Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                        <User size={13} className="text-neutral-500" />
                        {course.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Middle metrics: progress */}
                  <div className="w-full sm:w-48 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-neutral-400">
                      <span>Progress</span>
                      <span style={{ color: course.color }}>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-900/80 border border-white/5 p-[1px] h-[6px] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${course.color}, ${course.color}aa)`,
                          boxShadow: `0 0 8px ${course.color}40`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-neutral-500">
                      <span>{course.modulesCompleted}/{course.modulesTotal} Modules</span>
                      <span>{course.hoursTotal}h Total</span>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto self-stretch sm:self-center justify-end">
                    <button
                      onClick={() => toggleSyllabus(course.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-white/5 hover:bg-white/10 text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Syllabus
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {course.status !== "completed" ? (
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <PlayCircle size={14} />
                        Continue
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <CheckCircle size={14} />
                        Review
                      </button>
                    )}
                  </div>
                </div>

                {/* Syllabus Accordion content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 bg-neutral-950/20">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3 pt-3">
                          Syllabus Structure
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {course.syllabus.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01]"
                            >
                              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                                <span className="text-neutral-600 font-bold">{idx + 1}.</span>
                                {item.name}
                              </span>
                              {item.completed ? (
                                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 bg-emerald-400/5 border border-emerald-400/10 px-2 py-0.5 rounded">
                                  <CheckCircle size={12} /> Done
                                </span>
                              ) : (
                                <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0 bg-neutral-900 border border-white/5 px-2 py-0.5 rounded">
                                  Pending
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
