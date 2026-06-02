"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Tag,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  day: number;
  month: number; // 0-indexed (e.g. 5 = June)
  year: number;
  time: string;
  title: string;
  type: "lecture" | "deadline" | "review" | "exam";
  color: string;
}

const initialEvents: ScheduleEvent[] = [
  {
    id: "1",
    day: 2,
    month: 5, // June
    year: 2026,
    time: "10:00 AM",
    title: "Next.js Mentorship Lecture",
    type: "lecture",
    color: "#8b5cf6",
  },
  {
    id: "2",
    day: 5,
    month: 5,
    year: 2026,
    time: "11:59 PM",
    title: "Advanced React Assignment Due",
    type: "deadline",
    color: "#ef4444",
  },
  {
    id: "3",
    day: 10,
    month: 5,
    year: 2026,
    time: "02:00 PM",
    title: "AI Engineering Project Review",
    type: "review",
    color: "#f59e0b",
  },
  {
    id: "4",
    day: 15,
    month: 5,
    year: 2026,
    time: "09:00 AM",
    title: "System Design Final Mock Exam",
    type: "exam",
    color: "#06b6d4",
  },
  {
    id: "5",
    day: 22,
    month: 5,
    year: 2026,
    time: "04:30 PM",
    title: "Database Indexing Workshop",
    type: "lecture",
    color: "#8b5cf6",
  },
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarPage() {
  // Current calendar view (initialize to June 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  const [selectedDay, setSelectedDay] = useState<number>(2); // Default to June 2nd
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  
  // Event Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM");
  const [newType, setNewType] = useState<"lecture" | "deadline" | "review" | "exam">("lecture");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get start offset and total days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  const selectDay = (day: number) => {
    setSelectedDay(day);
  };

  // Filter events for active month/day
  const getEventsForDay = (dayNum: number) => {
    return events.filter(
      (e) => e.day === dayNum && e.month === month && e.year === year
    );
  };

  const activeDayEvents = events.filter(
    (e) => e.day === selectedDay && e.month === month && e.year === year
  );

  // Type Colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "#8b5cf6"; // Violet
      case "deadline":
        return "#ef4444"; // Rose
      case "review":
        return "#f59e0b"; // Amber
      case "exam":
        return "#06b6d4"; // Cyan
      default:
        return "#6366f1";
    }
  };

  // Handle Event Insertion
  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      day: selectedDay,
      month: month,
      year: year,
      time: newTime,
      title: newTitle,
      type: newType,
      color: getTypeColor(newType),
    };

    setEvents([...events, newEvent]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  return (
    <section className="space-y-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            Study Schedule
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Academic Calendar
          </h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={15} />
          Add Event
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Calendar Board */}
        <article className="glass rounded-3xl p-6 border border-white/5 lg:col-span-2 space-y-6">
          {/* Calendar Controller Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white tracking-tight">
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Grid Layout Calendar */}
          <div className="space-y-2">
            {/* Weekdays names */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {dayNames.map((name) => (
                <div key={name} className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 py-1">
                  {name}
                </div>
              ))}
            </div>

            {/* Monthly numbers */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* Padding empty slots at beginning */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square rounded-xl bg-transparent" />
              ))}

              {/* Real Month Days */}
              {Array.from({ length: totalDays }).map((_, idx) => {
                const dayNum = idx + 1;
                const isSelected = selectedDay === dayNum;
                const dayEvents = getEventsForDay(dayNum);
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => selectDay(dayNum)}
                    className="aspect-square rounded-xl flex flex-col items-center justify-between p-1.5 text-xs font-bold border transition-all cursor-pointer relative"
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.05))"
                        : "rgba(255, 255, 255, 0.01)",
                      borderColor: isSelected
                        ? "rgba(139, 92, 246, 0.3)"
                        : "rgba(255,255,255,0.03)",
                      color: isSelected ? "#ffffff" : "#94a3b8",
                    }}
                  >
                    <span className="self-start text-[10px]">{dayNum}</span>

                    {/* Event Indicator Dots */}
                    {hasEvents && (
                      <div className="flex gap-1 justify-center pb-1 w-full overflow-hidden">
                        {dayEvents.slice(0, 3).map((event) => (
                          <span
                            key={event.id}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: event.color }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </article>

        {/* Right Side: Day Schedule Info Panel */}
        <article className="glass rounded-3xl p-6 border border-white/5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <CalendarIcon size={16} className="text-violet-400" />
                Schedule for {monthNames[month]} {selectedDay}
              </h3>
              <span className="text-[10px] uppercase font-bold text-neutral-500 bg-white/5 px-2.5 py-1 rounded-full">
                {activeDayEvents.length} Events
              </span>
            </div>

            {/* Event list */}
            {activeDayEvents.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <AlertCircle className="mx-auto w-10 h-10 text-neutral-700" />
                <p className="text-xs text-neutral-500">No scheduled sessions for this day.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {activeDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-start gap-3 relative overflow-hidden"
                  >
                    {/* Event Type Accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-neutral-500">
                        <Clock size={11} />
                        {event.time}
                        <span className="text-neutral-700">•</span>
                        <span style={{ color: event.color }}>{event.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-relaxed">{event.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500">Need adjustments?</span>
            <p className="text-[11px] text-neutral-400">Click the Add Event button above to fill your schedule.</p>
          </div>
        </article>
      </div>

      {/* Dynamic Add Event Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.article
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm glass rounded-2xl border border-white/5 p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CalendarIcon size={16} className="text-violet-400" />
                  Add Event for June {selectedDay}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-6 h-6 rounded-lg text-neutral-400 hover:text-white flex items-center justify-center hover:bg-white/5 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleAddEventSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Workshop, Exam Preparation..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Time</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10:00 AM"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Category</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-xs text-neutral-300 focus:outline-none focus:border-violet-500 transition-all"
                    >
                      <option value="lecture">Lecture</option>
                      <option value="deadline">Deadline</option>
                      <option value="review">Review</option>
                      <option value="exam">Exam</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.article>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
