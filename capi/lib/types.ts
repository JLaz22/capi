export type ExpenseCategory =
  | "coffee"
  | "groceries"
  | "restaurant"
  | "delivery"
  | "snacks"
  | "other";

export type Expense = {
  id: string;
  amount: number;
  category: ExpenseCategory;
  merchant: string;
  date: string; // YYYY-MM-DD
};

export type Profile = {
  planCost: number; // e.g. 2800
  weeksInTerm: number; // e.g. 16
  mealCost?: number; // e.g. 12
  weeklyBudget?: number; // optional override (hackathon-friendly)
  alertThreshold?: number; // 0..1 (e.g. 0.8)
};
