"use client";

import TabsNav from "../../components/TabsNav";
import Heatmap from "../../components/Heatmap";
import { useEffect, useMemo, useState } from "react";
import { Expense, Profile } from "../../lib/types";
import { getProfile, listExpenses, seedDemoData } from "../../lib/storage";
import {
  heatmapByDay,
  inRange,
  percentUsed,
  prevWeekWindow,
  sortByDateDesc,
  sum,
  weekWindow,
  weeklyBudget,
} from "../../lib/calc";

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    seedDemoData();
    setProfile(getProfile());
    setExpenses(listExpenses());
  }, []);

  const { from, to } = weekWindow();
  const { from: pFrom, to: pTo } = prevWeekWindow();

  const weekSpend = useMemo(
    () => sum(inRange(expenses, from, to)),
    [expenses, from, to]
  );
  const prevWeekSpend = useMemo(
    () => sum(inRange(expenses, pFrom, pTo)),
    [expenses, pFrom, pTo]
  );

  const budget = profile ? weeklyBudget(profile) : 0;
  const usedPct = percentUsed(weekSpend, budget);
  const remaining = Math.max(0, budget - weekSpend);

  const deltaPct =
    prevWeekSpend > 0 ? ((weekSpend - prevWeekSpend) / prevWeekSpend) * 100 : 0;

  const threshold = profile?.alertThreshold ?? 0.8;
  const showAlert = budget > 0 && weekSpend / budget >= threshold;

  const recent = useMemo(
    () => sortByDateDesc(expenses).slice(0, 6),
    [expenses]
  );
  const heat = useMemo(() => heatmapByDay(expenses), [expenses]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Campus Meal Saver
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Smart meal planning for college students
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold">
              ${weekSpend.toFixed(2)}
            </div>
            <div className="text-xs text-zinc-500">spent this week</div>
          </div>
        </div>

        <div className="mt-6">
          <TabsNav />
        </div>

        {showAlert && (
          <div className="mt-6 rounded-2xl border border-orange-300 bg-orange-50 p-4 text-sm text-orange-900">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                ⚠️
              </span>
              <span>
                You&apos;ve spent {usedPct.toFixed(0)}% of your weekly budget.
                Consider choosing cheaper meal options.
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card title="Weekly Spending" right="$">
            <div className="text-3xl font-semibold">
              ${weekSpend.toFixed(2)}
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              of ${budget.toFixed(2)} budget
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-zinc-200">
              <div
                className="h-2 rounded-full bg-zinc-900"
                style={{ width: `${Math.min(100, usedPct)}%` }}
              />
            </div>
          </Card>

          <Card title="Remaining Budget" right="$">
            <div className="text-3xl font-semibold">
              ${remaining.toFixed(2)}
            </div>
            <div className="mt-1 text-sm text-zinc-500">left this week</div>
          </Card>

          <Card title="vs Last Week" right="↗">
            <div className="text-3xl font-semibold">
              {deltaPct >= 0 ? "+" : ""}
              {deltaPct.toFixed(1)}%
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              More than last week
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Heatmap values={heat} />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-900">
                Recent Transactions
              </div>
              <div className="text-sm text-zinc-500">
                Your latest food purchases (demo data for now)
              </div>
            </div>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recent.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <div className="font-medium">{t.merchant}</div>
                  <div className="text-sm text-zinc-500">{t.date}</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700">
                    {labelCategory(t.category)}
                  </span>
                  <div className="w-24 text-right font-semibold">
                    ${t.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!profile && (
            <div className="mt-4 text-sm text-zinc-500">
              Set your dining plan in{" "}
              <a className="underline" href="/settings">
                Settings
              </a>{" "}
              to enable budget alerts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  right,
  children,
}: {
  title: string;
  right?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-900">{title}</div>
        {right ? (
          <div className="text-zinc-400">{right}</div>
        ) : (
          <div className="text-red-500">{right}</div>
        )}
        {/* simple, matches your screenshot vibe */}
      </div>
      {children}
    </div>
  );
}

function labelCategory(c: string) {
  if (c === "coffee") return "Coffee";
  if (c === "groceries") return "Groceries";
  if (c === "restaurant") return "Restaurant";
  if (c === "delivery") return "Delivery";
  if (c === "snacks") return "Snacks";
  return "Other";
}
