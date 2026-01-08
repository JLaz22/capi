import { Expense, Profile } from "./types";

const PROFILE_KEY = "capi_profile";
const EXPENSES_KEY = "capi_expenses";

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as Profile) : null;
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function listExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(EXPENSES_KEY);
  return raw ? (JSON.parse(raw) as Expense[]) : [];
}

export function addExpense(expense: Expense) {
  const current = listExpenses();
  current.push(expense);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(current));
}

export function deleteExpense(id: string) {
  const next = listExpenses().filter((e) => e.id !== id);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(next));
}

export function seedDemoData() {
  const existing = listExpenses();
  if (existing.length > 0) return;

  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const demo: Expense[] = [
    {
      id: crypto.randomUUID(),
      amount: 14.25,
      category: "dining_out",
      merchant: "DoorDash",
      date: iso(today),
    },
    {
      id: crypto.randomUUID(),
      amount: 6.1,
      category: "coffee",
      merchant: "Cafe",
      date: iso(new Date(today.getTime() - 86400000)),
    },
    {
      id: crypto.randomUUID(),
      amount: 9.8,
      category: "snacks",
      merchant: "Bodega",
      date: iso(new Date(today.getTime() - 2 * 86400000)),
    },
  ];

  localStorage.setItem(EXPENSES_KEY, JSON.stringify(demo));
}
