"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutGrid, CalendarDays, Lightbulb, Settings } from "lucide-react";

const tabs = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/meal-plan", label: "Meal Plan", icon: CalendarDays },
  { href: "/suggestions", label: "Suggestions", icon: Lightbulb },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function TabsNav() {
  const pathname = usePathname();

  return (
    <div className="rounded-full bg-zinc-100 p-1">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((t) => {
          const active = pathname === t.href;
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={clsx(
                "flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:bg-white/60"
              )}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
