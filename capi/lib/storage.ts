import { Expense, Profile } from "./types";

const PROFILE_KEY = "capi_profile_v1";
const EXPENSES_KEY = "capi_expenses_v1";

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

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

export function addExpense(expense: Expense) {
  const next = [...listExpenses(), expense];
  saveExpenses(next);
}

export function deleteExpense(id: string) {
  saveExpenses(listExpenses().filter((e) => e.id !== id));
}

export function seedDemoData() {
  if (typeof window === "undefined") return;
  const existing = listExpenses();
  if (existing.length > 0) return;

  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const today = new Date();

  const demo: Expense[] = [
    {
      id: crypto.randomUUID(),
      amount: 6.75,
      category: "coffee",
      merchant: "Starbucks",
      date: iso(new Date(today.getTime() - 2 * 86400000)),
    },
    {
      id: crypto.randomUUID(),
      amount: 24.35,
      category: "groceries",
      merchant: "Walmart Supercenter",
      date: iso(new Date(today.getTime() - 1 * 86400000)),
    },
    {
      id: crypto.randomUUID(),
      amount: 12.5,
      category: "restaurant",
      merchant: "Chipotle",
      date: iso(today),
    },
    {
      id: crypto.randomUUID(),
      amount: 18.99,
      category: "groceries",
      merchant: "Trader Joe's",
      date: iso(today),
    },
  ];

  saveExpenses(demo);

  // Seed a reasonable profile if none exists
  if (!getProfile()) {
    saveProfile({
      planCost: 2800,
      weeksInTerm: 16,
      mealCost: 12,
      weeklyBudget: 100,
      alertThreshold: 0.8,
    });
  }
}
