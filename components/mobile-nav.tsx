"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Calendar,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-2"
      style={{
        background: "rgba(5, 5, 5, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--bg-border)",
      }}
    >
      <ul className="flex items-center justify-around list-none w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                id={`mobile-nav-${item.label.toLowerCase()}`}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "rgba(124,58,237,0.18)",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon
                    size={20}
                    style={{
                      color: isActive ? "var(--accent-violet)" : "var(--text-muted)",
                      filter: isActive ? "drop-shadow(0 0 6px var(--accent-violet))" : "none",
                      transition: "color 0.2s, filter 0.2s",
                    }}
                  />
                </div>
                <span
                  className="relative z-10 text-[10px] font-medium"
                  style={{ color: isActive ? "var(--accent-violet)" : "var(--text-muted)" }}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
