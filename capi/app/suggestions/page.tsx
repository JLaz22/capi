import TabsNav from "../../components/TabsNav";

export default function SuggestionsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Suggestions
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Coming next: budget-friendly meals and smarter alternatives.
        </p>
        <div className="mt-6">
          <TabsNav />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-zinc-600">
            For hackathon demo: we can show “Daily Budget” + a list of cheap
            meals filtered by max price.
          </p>
        </div>
      </div>
    </div>
  );
}
