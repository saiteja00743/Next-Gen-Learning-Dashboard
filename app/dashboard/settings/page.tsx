"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon,
  Sliders,
  Bell,
  Link2,
  Save,
  CheckCircle,
  Laptop,
  Mail,
  ShieldAlert,
  GitBranch,
  MessageSquare,
  Calendar,
  Eye,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general"); // "general" | "notifications" | "integrations"
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [weeklyGoal, setWeeklyGoal] = useState("15");
  const [themeAccent, setThemeAccent] = useState("violet"); // "violet" | "cyan" | "emerald" | "amber"

  // Toggles states
  const [toggles, setToggles] = useState({
    lectures: true,
    progress: true,
    deadlines: true,
    streak: false,
    github: true,
    slack: false,
    gcal: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 1200);
  };

  const tabs = [
    { id: "general", label: "General Preferences", icon: Sliders },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Link2 },
  ];

  return (
    <section className="space-y-6 max-w-6xl mx-auto relative">
      {/* Toast Feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 backdrop-blur-md shadow-lg"
          >
            <CheckCircle size={18} />
            <div className="text-xs font-semibold">Settings updated successfully!</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
          Preferences
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          System Settings
        </h2>
      </header>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Tabs */}
        <div className="lg:col-span-1">
          <article className="glass rounded-2xl p-4 border border-white/5">
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-left transition-all duration-200"
                    style={{ color: isActive ? "#ffffff" : "#94a3b8" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-settings-tab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.05))",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon size={16} className={isActive ? "text-violet-400" : "text-neutral-500"} />
                    <span className="text-sm font-semibold relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </article>
        </div>

        {/* Right Side Content Panel */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-full min-h-[400px]">
            {/* Tab content panel */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
                      <Sliders size={18} className="text-violet-400" />
                      General Preferences
                    </h3>

                    {/* Study Goal Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        Weekly Study Goal
                      </label>
                      <select
                        value={weeklyGoal}
                        onChange={(e) => setWeeklyGoal(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-xs text-neutral-300 focus:outline-none focus:border-violet-500 transition-all"
                      >
                        <option value="5">5 Hours / week</option>
                        <option value="10">10 Hours / week</option>
                        <option value="15">15 Hours / week</option>
                        <option value="20">20 Hours / week</option>
                        <option value="30">30 Hours / week</option>
                      </select>
                    </div>

                    {/* Theme Accent Selector */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        System Theme Accent
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: "violet", label: "Deep Violet", color: "#8b5cf6" },
                          { id: "cyan", label: "Cyber Cyan", color: "#06b6d4" },
                          { id: "emerald", label: "Emerald Glow", color: "#10b981" },
                          { id: "amber", label: "Amber Spark", color: "#f59e0b" },
                        ].map((accent) => {
                          const isSelected = themeAccent === accent.id;
                          return (
                            <button
                              key={accent.id}
                              type="button"
                              onClick={() => setThemeAccent(accent.id)}
                              className="p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer bg-white/[0.01]"
                              style={{
                                borderColor: isSelected ? accent.color : "rgba(255,255,255,0.03)",
                                background: isSelected ? `${accent.color}0c` : "rgba(255,255,255,0.01)",
                              }}
                            >
                              <span className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: accent.color }} />
                              <span className="text-[10px] font-bold" style={{ color: isSelected ? "#fff" : "#64748b" }}>
                                {accent.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
                      <Bell size={18} className="text-violet-400" />
                      Notification Channels
                    </h3>

                    <div className="space-y-3.5">
                      {/* Toggle items */}
                      {[
                        { id: "lectures", label: "New Lecture Alerts", desc: "Get notified when new course content is published." },
                        { id: "progress", label: "Weekly Progress Reports", desc: "Receive summary reports of your study performance." },
                        { id: "deadlines", label: "Assignment Deadlines", desc: "Alerts for upcoming milestone and exam deadlines." },
                        { id: "streak", label: "Streak Reminders", desc: "Daily reminders to maintain your active study streak." },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggle(item.id as any)}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-colors"
                        >
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-200">{item.label}</h4>
                            <p className="text-[10px] text-neutral-500">{item.desc}</p>
                          </div>
                          
                          {/* Toggle Switch */}
                          <div
                            className="w-10 h-6 rounded-full p-0.5 transition-all flex items-center cursor-pointer"
                            style={{
                              backgroundColor: toggles[item.id as keyof typeof toggles]
                                ? "rgba(139, 92, 246, 0.4)"
                                : "rgba(255, 255, 255, 0.05)",
                              border: toggles[item.id as keyof typeof toggles]
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid rgba(255, 255, 255, 0.08)",
                              justifyContent: toggles[item.id as keyof typeof toggles] ? "flex-end" : "flex-start",
                            }}
                          >
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-4 h-4 rounded-full bg-white shadow-md block"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "integrations" && (
                  <motion.div
                    key="integrations"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/5 pb-3">
                      <Link2 size={18} className="text-violet-400" />
                      Third-Party Integrations
                    </h3>

                    <div className="space-y-3.5">
                      {/* Integration Item: GitHub */}
                      <div
                        onClick={() => handleToggle("github")}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                            <GitBranch size={20} />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-200">GitHub Connector</h4>
                            <p className="text-[10px] text-neutral-500">Sync coding contributions into your study achievements.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${toggles.github ? "text-violet-400" : "text-neutral-500"}`}>
                            {toggles.github ? "Connected" : "Disconnected"}
                          </span>
                          <div
                            className="w-10 h-6 rounded-full p-0.5 transition-all flex items-center cursor-pointer"
                            style={{
                              backgroundColor: toggles.github
                                ? "rgba(139, 92, 246, 0.4)"
                                : "rgba(255, 255, 255, 0.05)",
                              border: toggles.github
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid rgba(255, 255, 255, 0.08)",
                              justifyContent: toggles.github ? "flex-end" : "flex-start",
                            }}
                          >
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-4 h-4 rounded-full bg-white shadow-md block"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Integration Item: Slack */}
                      <div
                        onClick={() => handleToggle("slack")}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 shrink-0">
                            <MessageSquare size={20} />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-200">Slack Notifications</h4>
                            <p className="text-[10px] text-neutral-500">Deliver progress summaries and warnings to Slack workspace.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${toggles.slack ? "text-violet-400" : "text-neutral-500"}`}>
                            {toggles.slack ? "Connected" : "Disconnected"}
                          </span>
                          <div
                            className="w-10 h-6 rounded-full p-0.5 transition-all flex items-center cursor-pointer"
                            style={{
                              backgroundColor: toggles.slack
                                ? "rgba(139, 92, 246, 0.4)"
                                : "rgba(255, 255, 255, 0.05)",
                              border: toggles.slack
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid rgba(255, 255, 255, 0.08)",
                              justifyContent: toggles.slack ? "flex-end" : "flex-start",
                            }}
                          >
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-4 h-4 rounded-full bg-white shadow-md block"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Integration Item: Google Calendar */}
                      <div
                        onClick={() => handleToggle("gcal")}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 shrink-0">
                            <Calendar size={20} />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-200">Google Calendar</h4>
                            <p className="text-[10px] text-neutral-500">Sync all your academic milestones directly with your calendar.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${toggles.gcal ? "text-violet-400" : "text-neutral-500"}`}>
                            {toggles.gcal ? "Connected" : "Disconnected"}
                          </span>
                          <div
                            className="w-10 h-6 rounded-full p-0.5 transition-all flex items-center cursor-pointer"
                            style={{
                              backgroundColor: toggles.gcal
                                ? "rgba(139, 92, 246, 0.4)"
                                : "rgba(255, 255, 255, 0.05)",
                              border: toggles.gcal
                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                : "1px solid rgba(255, 255, 255, 0.08)",
                              justifyContent: toggles.gcal ? "flex-end" : "flex-start",
                            }}
                          >
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-4 h-4 rounded-full bg-white shadow-md block"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-70 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
              >
                {saving ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving Preferences...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save Configurations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
