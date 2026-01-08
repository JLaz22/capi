"use client";

import { useEffect, useMemo, useState } from "react";
import { getProfile, listExpenses, seedDemoData } from "../../lib/storage";
import { Profile, Expense } from "../../lib/types";
import {
  daysAgoISO,
  heatmapByDay,
  inDateRange,
  sum,
  todayISO,
  weeklyPlanBudget,
} from "../../lib/calc";

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    seedDemoData();
    setProfile(getProfile());
    setExpenses(listExpenses());
  }, []);

  const today = todayISO();
  const weekFrom = daysAgoISO(6);
  const monthFrom = daysAgoISO(29);

  const todaySpend = useMemo(
    () => sum(inDateRange(expenses, today, today)),
    [expenses, today]
  );
  const weekSpend = useMemo(
    () => sum(inDateRange(expenses, weekFrom, today)),
    [expenses, weekFrom, today]
  );
  const monthSpend = useMemo(
    () => sum(inDateRange(expenses, monthFrom, today)),
    [expenses, monthFrom, today]
  );

  const weekBudget = profile ? weeklyPlanBudget(profile) : null;
  const weekPercent = weekBudget ? (weekSpend / weekBudget) * 100 : null;

  const mealsEq = profile?.mealCost ? todaySpend / profile.mealCost : null;

  const heat = useMemo(() => heatmapByDay(expenses), [expenses]);

  return (
    <div>
      <h1>Dashboard</h1>

      {!profile && (
        <p>
          You haven’t set your dining plan yet. Go to{" "}
          <a href="/settings">Settings</a>.
        </p>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Card title="Today" value={`$${todaySpend.toFixed(2)}`} />
        <Card title="This week" value={`$${weekSpend.toFixed(2)}`} />
        <Card title="Last 30 days" value={`$${monthSpend.toFixed(2)}`} />
      </div>

      {profile && (
        <div style={{ marginTop: 16 }}>
          <h2>Dining plan translation</h2>
          <p>
            Weekly dining plan budget: <b>${weekBudget!.toFixed(2)}</b>
          </p>
          <p>
            This week’s spend is <b>{weekPercent!.toFixed(1)}%</b> of that
            weekly budget.
          </p>
          {mealsEq !== null && (
            <p>
              Today’s spend equals about <b>{mealsEq.toFixed(1)}</b> dining-hall
              meals (using ${profile.mealCost}/meal).
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <h2>Spending heatmap</h2>
        <p style={{ color: "#666" }}>Redder = you spent more that day.</p>
        <pre style={{ background: "#fafafa", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(heat, null, 2)}
        </pre>
        {/* Next step: replace this pre with a Heatmap component */}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 12,
        minWidth: 180,
      }}
    >
      <div style={{ color: "#666", fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
