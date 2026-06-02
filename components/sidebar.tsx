"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();



  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="hidden md:flex flex-col shrink-0 h-full relative"
      style={{
        background: "rgba(3, 3, 3, 0.6)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Top Logo and Header */}
      <div
        className="flex items-center gap-3 px-5 py-6 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
      >
        <button
          id="sidebar-collapse-toggle"
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center shrink-0 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
            border: "none",
            outline: "none",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Zap size={20} className="text-white fill-white/10" />
        </button>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h2 className="font-bold text-base tracking-tight text-white">
                LearnFlow
              </h2>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mt-0.5">
                Student Hub
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2 list-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link href={item.href} id={`nav-${item.label.toLowerCase()}`}>
                  <div
                    className="relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group transition-colors duration-200"
                    style={{ color: isActive ? "#ffffff" : "#94a3b8" }}
                  >
                    {/* Snap Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-tab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.05))",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Hover Glow */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "rgba(255, 255, 255, 0.025)", border: "1px solid rgba(255, 255, 255, 0.04)" }}
                      />
                    )}

                    {/* Left Accent indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 shrink-0">
                      <Icon
                        size={18}
                        style={{
                          color: isActive ? "#a78bfa" : "inherit",
                          filter: isActive ? "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" : "none",
                        }}
                      />
                    </div>

                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.18 }}
                          className="relative z-10 text-sm font-semibold whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    </motion.aside>
  );
}
