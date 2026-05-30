import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai — Student Learning Dashboard",
  description:
    "A premium futuristic learning dashboard for tracking courses, progress, and activity streaks.",
  keywords: ["learning", "dashboard", "courses", "progress", "education"],
  openGraph: {
    title: "Sai — Student Learning Dashboard",
    description: "Track your learning journey with a premium futuristic dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="h-full antialiased" style={{ background: "var(--bg-base)" }}>
        {/* Animated mesh background */}
        <div className="mesh-bg" aria-hidden="true">
          <div className="mesh-orb mesh-orb-1" />
          <div className="mesh-orb mesh-orb-2" />
          <div className="mesh-orb mesh-orb-3" />
        </div>
        <div className="relative z-10 h-full">{children}</div>
      </body>
    </html>
  );
}
