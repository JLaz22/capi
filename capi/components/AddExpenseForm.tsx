"use client";

import { useState } from "react";
import { addExpense } from "../lib/storage";
import { ExpenseCategory } from "../lib/types";
import { useRouter } from "next/navigation";

export default function AddExpenseForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(12);
  const [category, setCategory] = useState<ExpenseCategory>("dining_out");
  const [merchant, setMerchant] = useState<string>("DoorDash");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  function submit() {
    addExpense({
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      merchant,
      date,
    });
    router.push("/dashboard");
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Add Expense</h1>

      <label>Amount ($)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
      >
        <option value="dining_out">Dining Out</option>
        <option value="coffee">Coffee</option>
        <option value="groceries">Groceries</option>
        <option value="snacks">Snacks</option>
        <option value="other">Other</option>
      </select>

      <label>Merchant</label>
      <input value={merchant} onChange={(e) => setMerchant(e.target.value)} />

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => {
            setAmount(6);
            setCategory("coffee");
            setMerchant("Cafe");
          }}
        >
          Quick: $6 coffee
        </button>
        <button
          onClick={() => {
            setAmount(14);
            setCategory("dining_out");
            setMerchant("DoorDash");
          }}
        >
          Quick: $14 meal
        </button>
      </div>

      <button onClick={submit} style={{ marginTop: 12 }}>
        Save
      </button>
    </div>
  );
}
