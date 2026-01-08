"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

type HeatPoint = { date: string; total: number; count: number };

function bucket(total: number) {
  if (total <= 0) return 0;
  if (total < 10) return 1;
  if (total < 25) return 2;
  if (total < 50) return 3;
  return 4;
}

export default function Heatmap({ values }: { values: HeatPoint[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900">
            Spending heatmap
          </div>
          <div className="text-sm text-zinc-600">
            Redder means you spent more that day.
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <CalendarHeatmap
          startDate={shiftDate(-120)}
          endDate={new Date()}
          values={values}
          classForValue={(v: any) => {
            if (!v) return "color-empty";
            return `color-scale-${bucket(v.total)}`;
          }}
          tooltipDataAttrs={(v: any) => {
            if (!v || !v.date) return null;
            return {
              "data-tip": `${v.date}: $${Number(v.total).toFixed(2)} (${
                v.count
              } purchases)`,
            };
          }}
          showWeekdayLabels
        />
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
        <span>Less</span>
        <span className="h-3 w-3 rounded-sm bg-zinc-200" />
        <span className="h-3 w-3 rounded-sm bg-red-200" />
        <span className="h-3 w-3 rounded-sm bg-red-300" />
        <span className="h-3 w-3 rounded-sm bg-red-400" />
        <span className="h-3 w-3 rounded-sm bg-red-500" />
        <span>More</span>
      </div>
    </div>
  );
}

function shiftDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
