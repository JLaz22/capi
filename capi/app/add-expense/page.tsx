"use client";

import TabsNav from "../../components/TabsNav";
import { useEffect, useState } from "react";
import { ExpenseCategory, Profile } from "../../lib/types";
import { addExpense, getProfile } from "../../lib/storage";
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  const [amount, setAmount] = useState<number>(12);
  const [merchant, setMerchant] = useState<string>("Chipotle");
  const [category, setCategory] = useState<ExpenseCategory>("restaurant");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => setProfile(getProfile()), []);

  function submit() {
    addExpense({
      id: crypto.randomUUID(),
      amount: Number(amount),
      merchant: merchant.trim() || "Unknown",
      category,
      date,
    });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Add Expense
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Log a food purchase manually (demo).
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-500">Weekly Budget</div>
            <div className="text-xl font-semibold">
              {profile?.weeklyBudget
                ? `$${profile.weeklyBudget.toFixed(2)}`
                : "—"}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <TabsNav />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm max-w-xl">
          <div className="grid grid-cols-1 gap-4">
            <Field label="Amount ($)">
              <input
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-400"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Field>

            <Field label="Merchant">
              <input
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-400"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </Field>

            <Field label="Category">
              <select
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-400"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              >
                <option value="restaurant">Restaurant</option>
                <option value="delivery">Delivery</option>
                <option value="coffee">Coffee</option>
                <option value="groceries">Groceries</option>
                <option value="snacks">Snacks</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Date">
              <input
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-400"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>

            <div className="flex flex-wrap gap-2 pt-2">
              <Quick
                onClick={() => {
                  setAmount(6);
                  setCategory("coffee");
                  setMerchant("Starbucks");
                }}
              >
                Quick: $6 coffee
              </Quick>
              <Quick
                onClick={() => {
                  setAmount(14);
                  setCategory("delivery");
                  setMerchant("DoorDash");
                }}
              >
                Quick: $14 delivery
              </Quick>
              <Quick
                onClick={() => {
                  setAmount(11);
                  setCategory("restaurant");
                  setMerchant("Dining Hall");
                }}
              >
                Quick: $11 dining hall
              </Quick>
            </div>

            <button
              onClick={submit}
              className="mt-2 w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Save Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-zinc-900">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Quick({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
    >
      {children}
    </button>
  );
}
