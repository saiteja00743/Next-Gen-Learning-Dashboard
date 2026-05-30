import BentoGrid from "@/components/bento-grid";
import HeroCard from "@/components/hero-card";
import CourseCard from "@/components/course-card";
import ActivityCard from "@/components/activity-card";
import StatsCard from "@/components/stats-card";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Course } from "@/types/course";

// Opt into dynamic rendering to ensure fresh database state on page refresh
export const dynamic = "force-dynamic";

// Mock fallbacks if Supabase is not configured or throws an error
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Next.js Mastery",
    progress: 60,
    icon_name: "Rocket",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "System Design Basics",
    progress: 40,
    icon_name: "Cpu",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "AI Engineering",
    progress: 85,
    icon_name: "Brain",
    created_at: new Date().toISOString(),
  },
];

async function getCourses(): Promise<Course[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      console.warn("Supabase credentials missing. Falling back to mock course data.");
      return mockCourses;
    }

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      throw new Error(`Database connection failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.info("Supabase courses table is empty. Returning mock course data.");
      return mockCourses;
    }

    return data as Course[];
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    // If Supabase URL exists, we want to propagate the error to trigger the error boundary.
    // Otherwise, we gracefully fall back to mock data.
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw err;
    }
    return mockCourses;
  }
}

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <section className="space-y-6">
      {/* Page Title Section */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
          Overview
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Learning Dashboard
        </h2>
      </header>

      {/* Bento Grid Layout */}
      <BentoGrid>
        {/* Welcome Hero */}
        <HeroCard />

        {/* Course Cards */}
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        {/* Learning Activity */}
        <ActivityCard />

        {/* Stats Cards */}
        <StatsCard
          title="Courses Enrolled"
          value={courses.length}
          change="+1 this month"
          changeType="up"
          iconName="BookOpen"
          themeColor="#06b6d4"
        />
        <StatsCard
          title="Hours Learned"
          value="48.5"
          change="+4.2h this week"
          changeType="up"
          iconName="Clock"
          themeColor="#6366f1"
        />
        <StatsCard
          title="Completion Rate"
          value="65%"
          change="+8% vs avg"
          changeType="up"
          iconName="CheckCircle"
          themeColor="#10b981"
        />
        <StatsCard
          title="Daily Streak"
          value="28"
          change="🔥 Active"
          changeType="neutral"
          iconName="Flame"
          themeColor="#f59e0b"
        />
      </BentoGrid>
    </section>
  );
}
