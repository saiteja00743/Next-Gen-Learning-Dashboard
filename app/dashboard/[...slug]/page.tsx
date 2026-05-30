import Link from "next/link";
import { ArrowLeft, BookOpen, BarChart2, Calendar, Settings, Construction } from "lucide-react";

interface ComingSoonProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function ComingSoonPage({ params }: ComingSoonProps) {
  const { slug } = await params;
  const section = slug[0] || "feature";

  // Format section name
  const title = section.charAt(0).toUpperCase() + section.slice(1);

  // Choose icon based on section
  const getIcon = () => {
    switch (section.toLowerCase()) {
      case "courses":
        return <BookOpen className="w-8 h-8 text-violet-400" />;
      case "analytics":
        return <BarChart2 className="w-8 h-8 text-cyan-400" />;
      case "calendar":
        return <Calendar className="w-8 h-8 text-emerald-400" />;
      case "settings":
        return <Settings className="w-8 h-8 text-amber-400" />;
      default:
        return <Construction className="w-8 h-8 text-indigo-400" />;
    }
  };

  const getAccentColor = () => {
    switch (section.toLowerCase()) {
      case "courses":
        return "#8b5cf6";
      case "analytics":
        return "#06b6d4";
      case "calendar":
        return "#10b981";
      case "settings":
        return "#f59e0b";
      default:
        return "#6366f1";
    }
  };

  const accentColor = getAccentColor();

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Premium Glass Card */}
      <article
        className="glass rounded-2xl p-8 max-w-md w-full border border-white/5 relative overflow-hidden"
        style={{
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 10px 30px -10px rgba(0, 0, 0, 0.7)`,
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 blur-3xl rounded-full pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 75%)`,
          }}
        />

        {/* Feature Icon */}
        <header
          className="mx-auto w-16 h-16 rounded-2xl border flex items-center justify-center mb-6"
          style={{
            borderColor: `${accentColor}25`,
            background: `${accentColor}10`,
            boxShadow: `0 0 24px ${accentColor}15`,
          }}
        >
          {getIcon()}
        </header>

        {/* Content */}
        <h2 className="text-xl font-extrabold text-neutral-100 tracking-tight">
          {title} Hub
        </h2>
        <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
          The <span className="font-semibold text-neutral-200">{title}</span> section is currently under development. Antigravity is crafting this screen to follow the design tokens of LearnFlow.
        </p>

        {/* Progress track representation (Static premium visual) */}
        <div className="mt-6 w-full bg-neutral-900/60 border border-white/5 p-[1px] h-[8px] rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full animate-pulse"
            style={{
              width: "45%",
              background: `linear-gradient(90deg, ${accentColor}dd, ${accentColor}44)`,
            }}
          />
        </div>
        <span className="block mt-2 text-[10px] uppercase font-bold tracking-widest text-neutral-500">
          Status: Crafting Interfaces
        </span>

        {/* Back Link */}
        <footer className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass hover:bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </footer>
      </article>
    </section>
  );
}
