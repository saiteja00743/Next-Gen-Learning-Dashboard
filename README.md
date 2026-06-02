# Sai — Student Learning Dashboard

A premium production-ready Next.js 15 Student Learning Dashboard built with a futuristic dark SaaS theme, Bento Grid layout, and smooth Framer Motion animations.

## 🚀 Features

- **Futuristic Aesthetic**: Glassmorphism cards, glowing gradients, and animated mesh background.
- **Bento Grid Layout**: Responsive grid transitioning from 4 columns on desktop, 2 on tablet, to a single-column layout on mobile.
- **Dynamic Course Cards**: Renders custom icons, course information, and spring-animated progress bars loaded from database.
- **Interactive Sidebar & Navigation**: Collapsible sidebar navigation for desktop/tablet, active tab tracking animations using Framer Motion `layoutId`, and bottom tab navigation for mobile devices.
- **Data Fetching (RSC)**: Secure Server Components retrieving data directly from Supabase, avoiding client-side layout shifts.
- **Skeleton Loaders & Shimmer Effects**: Fully tailored loader structure using Next.js Suspense boundary.
- **Error Boundaries**: Client-side error fallback UI supporting live hot retry.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 App Router](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💾 Database Setup

Run the following SQL script inside your Supabase project SQL Editor to create the schema and seed sample data:

```sql
-- 1. Create the courses table
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- 2. Insert premium sample courses
insert into courses(title, progress, icon_name)
values
  ('Advanced React Patterns', 75, 'Code2'),
  ('Next.js Mastery', 60, 'Rocket'),
  ('System Design Basics', 40, 'Cpu'),
  ('AI Engineering', 85, 'Brain');
```

---

## ⚙️ Getting Started

### 1. Clone the project and configure variables
Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```
*Note: If environment keys are not configured, the dashboard will gracefully fallback to local mock data automatically.*

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Production Build & Linter Check

To perform linting checks:
```bash
npm run lint
```

To compile production-ready bundle:
```bash
npm run build
```

---

## ☁️ Deployment (Vercel)

The easiest way to deploy this dashboard is using the Vercel Platform.

1. Push this project folder to your GitHub, GitLab, or Bitbucket repository.
2. Import the project into Vercel.
3. Configure the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings dashboard.
4. Deploy!

---

## 🏛️ Architectural Choices & Design Strategy

### 1. Server/Client Component Split
To maximize performance, security, and SEO, we strategically divided the application:
* **Server Components (RSC)**: 
  * [app/dashboard/page.tsx](file:///d:/tejasj/task/sai-dashboard/app/dashboard/page.tsx) is a server component that fetches course data directly from Supabase on the server side.
  * This keeps database credentials secure and eliminates client-side fetch latencies or Cumulative Layout Shift (CLS) on data mount.
* **Client Components**:
  * Animations, navigation, and interactive wrappers use `"use client"` where necessary (e.g. sidebar toggle, interactive line charts, Framer Motion transitions).
  * Static portions of the layouts are kept on the server to reduce the JavaScript bundle size shipped to the browser.

### 2. Zero Layout Shift & High Performance Animations
* **Transform & Opacity Only**: All animations (progress bars, chart heights, card fades) utilize GPU-accelerated CSS properties (`transform` and `opacity`) instead of repaint-heavy mutations (like `width` and `height`).
* **Mirror Skeletons**: The layout in [components/loading-skeleton.tsx](file:///d:/tejasj/task/sai-dashboard/components/loading-skeleton.tsx) exactly mirrors the dimensions and grid structure of the live Bento layout to prevent visual jumping when Server Component data resolves.

### 3. Challenges & Technical Solutions
* **CSS Variable Opacity Interpolation**: When building dynamic stat card themes, CSS-variables do not support standard hex-opacity appending (e.g., `var(--color)20` is invalid). Resolved by passing strict hex-token variables and interpolating with hex-opacity suffixes.
* **Next.js 15 Async Params**: Handled the new Next.js 15 routing requirement where dynamic route parameters must be asynchronously resolved (`await params`) inside catch-all views.
* **Sidebar Transition Refinement**: To achieve organic fluid animations during sidebar expand/collapse transitions, customized Framer Motion's `spring` properties (`stiffness: 220, damping: 26`). Staggered the text fading transitions using `AnimatePresence` to prevent wrapping text jumps.
* **Database Fallback Handler**: Created dynamic fallback mechanisms in RSC fetches. If the remote Supabase database contains no rows (or is locked via RLS policies), the application gracefully falls back to mock data structures, ensuring zero dashboard downtime.


