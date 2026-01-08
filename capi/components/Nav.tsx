import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #eee",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/add-expense">Add Expense</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
