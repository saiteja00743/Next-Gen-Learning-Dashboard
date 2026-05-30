import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar for Desktop & Tablet */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-24 md:pb-0 relative z-10">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-8 h-16 shrink-0"
          style={{
            background: "rgba(3, 3, 3, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Dashboard</span>
            <span className="text-neutral-700">/</span>
            <span className="text-[11px] font-semibold text-neutral-400">Overview</span>
          </div>
          {/* Right side: avatar and status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Active Session</span>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", boxShadow: "0 0 12px rgba(139,92,246,0.3)" }}
            >
              S
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <MobileNav />
    </div>
  );
}
