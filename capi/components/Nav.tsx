import Link from "next/link";

const linkClass = "text-sm font-medium text-zinc-700 hover:text-zinc-900";

export default function Nav() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          capi
        </Link>

        <nav className="flex items-center gap-4">
          <Link className={linkClass} href="/dashboard">
            Dashboard
          </Link>
          <Link className={linkClass} href="/add-expense">
            Add Expense
          </Link>
          <Link className={linkClass} href="/settings">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
