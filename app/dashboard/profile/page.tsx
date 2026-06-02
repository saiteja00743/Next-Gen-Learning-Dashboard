"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Briefcase,
  BookOpen,
  Clock,
  Flame,
  Award,
  Save,
  CheckCircle,
  Code,
  Shield,
  Brain,
  Rocket,
  Sparkles,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Sai Teja",
    email: "sai.teja@learnflow.edu",
    title: "Full-Stack AI Developer",
    bio: "Passionate about building responsive, modern user interfaces and integrating AI models. Currently studying Next.js, React Canary, and advanced design systems.",
    goals: "Complete Next.js Mastery, Learn Framer Motion, Deploy full-stack apps with Supabase integration",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState("info"); // "info" | "achievements" | "skills"
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...tempProfile });
      setIsEditing(false);
      setSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 1200);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const tabs = [
    { id: "info", label: "Profile Info", icon: User },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "skills", label: "Learning Path", icon: Code },
  ];

  return (
    <section className="space-y-6 relative max-w-6xl mx-auto">
      {/* Dynamic Toast Success Message */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 backdrop-blur-md shadow-lg"
          >
            <CheckCircle size={18} />
            <div className="text-xs font-semibold">Profile updated successfully!</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Title */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
          Account Settings
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Student Profile
        </h2>
      </header>

      {/* Main profile banner and basic info */}
      <article className="glass rounded-3xl overflow-hidden border border-white/5 relative">
        {/* Banner Gradient */}
        <div
          className="h-32 sm:h-44 w-full relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
          }}
        >
          {/* Subtle overlay elements */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-white">
            <Sparkles size={12} className="text-amber-300 animate-pulse" />
            Premium Student
          </div>
        </div>

        {/* Profile Info Overlay Card */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row gap-5 items-start sm:items-end -mt-10 sm:-mt-14 z-10">
          {/* Avatar */}
          <div
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-3xl sm:text-5xl font-black text-white border-4 border-[#0a0a0a] shadow-xl"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            }}
          >
            {profile.name.charAt(0)}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {profile.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-400 border border-violet-500/30">
                Lvl 4 Learner
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-400 flex items-center gap-1.5">
              <Briefcase size={14} className="text-neutral-500" />
              {profile.title}
            </p>
            <p className="text-xs text-neutral-500 flex items-center gap-1.5">
              <Mail size={14} className="text-neutral-500" />
              {profile.email}
            </p>
          </div>
        </div>
      </article>

      {/* Grid for main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Stats & Navigation */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tabs Card */}
          <div className="glass rounded-2xl p-4 border border-white/5">
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id !== "info") setIsEditing(false);
                    }}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-left transition-all duration-200"
                    style={{ color: isActive ? "#ffffff" : "#94a3b8" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-profile-tab"
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
          </div>

          {/* Quick Learning Stats */}
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Overview Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Flame size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
                </div>
                <div className="text-lg font-black text-white">28 Days</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <BookOpen size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Courses</span>
                </div>
                <div className="text-lg font-black text-white">4 Enrolled</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Clock size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Hours</span>
                </div>
                <div className="text-lg font-black text-white">48.5 hrs</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Award size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Badges</span>
                </div>
                <div className="text-lg font-black text-white">2 Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-2xl p-6 border border-white/5 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <User size={18} className="text-violet-400" />
                    Personal Information
                  </h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Name</span>
                        <p className="text-sm font-semibold text-neutral-200">{profile.name}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Email Address</span>
                        <p className="text-sm font-semibold text-neutral-200">{profile.email}</p>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Professional Title</span>
                        <p className="text-sm font-semibold text-neutral-200">{profile.title}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Biography</span>
                      <p className="text-sm text-neutral-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                        {profile.bio}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Learning Goals</span>
                      <p className="text-sm text-neutral-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                        {profile.goals}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Name</label>
                        <input
                          type="text"
                          required
                          value={tempProfile.name}
                          onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={tempProfile.email}
                          onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Professional Title</label>
                        <input
                          type="text"
                          required
                          value={tempProfile.title}
                          onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Biography</label>
                      <textarea
                        rows={3}
                        value={tempProfile.bio}
                        onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Learning Goals</label>
                      <textarea
                        rows={2}
                        value={tempProfile.goals}
                        onChange={(e) => setTempProfile({ ...tempProfile, goals: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-neutral-950/60 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase border border-white/10 hover:bg-white/5 text-neutral-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase bg-violet-600 hover:bg-violet-500 text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-70 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                      >
                        {saving ? (
                          <>
                            <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={13} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {activeTab === "achievements" && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-2xl p-6 border border-white/5 space-y-6"
              >
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Award size={18} className="text-amber-400" />
                  Earned Badges & Certificates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Badge 1 */}
                  <article className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-violet-500/25 transition-all flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.1)]">
                      <Brain size={22} className="animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-neutral-100">AI Explorer</h4>
                      <p className="text-xs text-neutral-400">Completed the first series of AI integration courses in LearnFlow.</p>
                      <span className="block text-[9px] uppercase font-bold text-neutral-500 pt-1">Earned Jun 2026</span>
                    </div>
                  </article>

                  {/* Badge 2 */}
                  <article className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/25 transition-all flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.1)]">
                      <Rocket size={22} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-neutral-100">Next.js Wizard</h4>
                      <p className="text-xs text-neutral-400">Completed advanced routing, layouts, and server action exercises.</p>
                      <span className="block text-[9px] uppercase font-bold text-neutral-500 pt-1">Earned May 2026</span>
                    </div>
                  </article>
                </div>

                <div className="p-5 rounded-2xl border border-dashed border-white/5 bg-neutral-950/20 flex flex-col items-center text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-500">
                    <Lock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Upcoming Milestone</h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                      Maintain your daily streak for 30 consecutive days to unlock the <span className="text-neutral-300 font-semibold">Streak Champion</span> certificate badge!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-2xl p-6 border border-white/5 space-y-6"
              >
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Code size={18} className="text-cyan-400" />
                  Skills & Subject Competence
                </h3>

                <div className="space-y-4">
                  {/* Skill 1 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-neutral-300">HTML5 / CSS3 / Tailwind CSS</span>
                      <span className="text-cyan-400">95%</span>
                    </div>
                    <div className="w-full bg-neutral-900/60 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #06b6d4, #0891b2)",
                          boxShadow: "0 0 8px rgba(6, 182, 212, 0.4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill 2 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-neutral-300">React / Next.js Framework</span>
                      <span className="text-violet-400">88%</span>
                    </div>
                    <div className="w-full bg-neutral-900/60 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "88%" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #8b5cf6, #7c3aed)",
                          boxShadow: "0 0 8px rgba(139, 92, 246, 0.4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill 3 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-neutral-300">AI Integration & Prompt Engineering</span>
                      <span className="text-emerald-400">90%</span>
                    </div>
                    <div className="w-full bg-neutral-900/60 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #10b981, #059669)",
                          boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill 4 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-neutral-300">Database & Backend (Supabase / Postgres)</span>
                      <span className="text-amber-400">82%</span>
                    </div>
                    <div className="w-full bg-neutral-900/60 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #f59e0b, #d97706)",
                          boxShadow: "0 0 8px rgba(245, 158, 11, 0.4)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
