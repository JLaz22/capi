import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Campus Meal Saver
        </h1>
        <p className="mt-2 max-w-xl text-zinc-600">
          Track food spending, translate it into dining-plan value, and see
          habits with a GitHub-style heatmap.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/settings"
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Set Dining Plan
          </Link>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Tip: If you haven’t entered any data yet, the dashboard will seed demo
          transactions automatically.
        </p>
      </div>
    </div>
  );
}
