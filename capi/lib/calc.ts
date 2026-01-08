import { Expense, Profile } from "./types";

export function sum(expenses: Expense[]) {
  return expenses.reduce((acc, e) => acc + e.amount, 0);
}

export function weeklyPlanBudget(profile: Profile) {
  return profile.planCost / profile.weeksInTerm;
}

export function inDateRange(expenses: Expense[], from: string, to: string) {
  return expenses.filter((e) => e.date >= from && e.date <= to);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function heatmapByDay(expenses: Expense[]) {
  const map = new Map<string, { date: string; total: number; count: number }>();
  for (const e of expenses) {
    const cur = map.get(e.date) ?? { date: e.date, total: 0, count: 0 };
    cur.total += e.amount;
    cur.count += 1;
    map.set(e.date, cur);
  }
  return Array.from(map.values()).sort((a, b) => (a.date < b.date ? -1 : 1));
}
