export type ExpenseCategory =
  | "dining_out"
  | "coffee"
  | "groceries"
  | "snacks"
  | "other";

export type Expense = {
  id: string;
  amount: number;
  category: ExpenseCategory;
  merchant?: string;
  date: string; // "YYYY-MM-DD"
};

export type Profile = {
  planCost: number; // e.g., 2800
  weeksInTerm: number; // e.g., 16
  mealCost?: number; // optional, e.g., 12
};
