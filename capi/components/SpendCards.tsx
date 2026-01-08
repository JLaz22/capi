export function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-zinc-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub ? <div className="mt-1 text-sm text-zinc-600">{sub}</div> : null}
    </div>
  );
}

export default function SpendCards({
  today,
  week,
  month,
}: {
  today: number;
  week: number;
  month: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard title="Today" value={`$${today.toFixed(2)}`} />
      <StatCard title="This week" value={`$${week.toFixed(2)}`} />
      <StatCard title="Last 30 days" value={`$${month.toFixed(2)}`} />
    </div>
  );
}
