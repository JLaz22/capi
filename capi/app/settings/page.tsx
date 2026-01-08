"use client";

import TabsNav from "../../components/TabsNav";
import { useEffect, useMemo, useState } from "react";
import { getProfile, saveProfile } from "../../lib/storage";
import { Profile } from "../../lib/types";

export default function SettingsPage() {
  const [planCost, setPlanCost] = useState(2800);
  const [weeksInTerm, setWeeksInTerm] = useState(16);
  const [mealCost, setMealCost] = useState<number | "">(12);

  const [weeklyBudget, setWeeklyBudget] = useState(100);
  const [alertThresholdPct, setAlertThresholdPct] = useState(80);

  useEffect(() => {
    const p = getProfile();
    if (!p) return;
    setPlanCost(p.planCost ?? 2800);
    setWeeksInTerm(p.weeksInTerm ?? 16);
    setMealCost(p.mealCost ?? "");
    setWeeklyBudget(p.weeklyBudget ?? 100);
    setAlertThresholdPct(Math.round((p.alertThreshold ?? 0.8) * 100));
  }, []);

  const dailyAvg = useMemo(() => weeklyBudget / 7, [weeklyBudget]);
  const alertDollar = useMemo(
    () => weeklyBudget * (alertThresholdPct / 100),
    [weeklyBudget, alertThresholdPct]
  );

  function onSave() {
    const profile: Profile = {
      planCost: Number(planCost),
      weeksInTerm: Number(weeksInTerm),
      mealCost: mealCost === "" ? undefined : Number(mealCost),
      weeklyBudget: Number(weeklyBudget),
      alertThreshold: alertThresholdPct / 100,
    };
    saveProfile(profile);
    alert("Saved settings!");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Settings
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Set your weekly food budget and alert preferences.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <TabsNav />
        </div>

        <div className="mt-6 space-y-6">
          {/* Connect Account */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              Capital One Account
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              Connect your account to track spending automatically
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div>
                <div className="font-semibold">Not Connected</div>
                <div className="text-sm text-zinc-500">
                  Connect to enable real-time tracking
                </div>
              </div>
              <button
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                onClick={() =>
                  alert("Demo: would connect to Capital One API here.")
                }
              >
                Connect Account
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-100 p-4 text-sm text-zinc-600">
              <span className="font-semibold">Note:</span> This is a demo app.
              In production, you would connect to Capital One&apos;s secure API.
              For now, transactions are simulated.
            </div>
          </div>

          {/* Budget Settings */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              Budget Settings
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              Set your weekly food budget and alert preferences
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-zinc-900">
                Weekly Food Budget
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                <span className="text-zinc-500">$</span>
                <input
                  type="number"
                  value={weeklyBudget}
                  onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <div className="mt-2 text-sm text-zinc-500">
                Daily average: ${dailyAvg.toFixed(2)}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900">
                  Alert Threshold
                </div>
                <div className="text-sm text-zinc-600">
                  {alertThresholdPct}%
                </div>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={alertThresholdPct}
                onChange={(e) => setAlertThresholdPct(Number(e.target.value))}
                className="mt-3 w-full"
              />
              <div className="mt-2 text-sm text-zinc-500">
                You&apos;ll be alerted when you reach ${alertDollar.toFixed(2)}{" "}
                of your weekly budget
              </div>
            </div>

            <button
              onClick={onSave}
              className="mt-6 w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Save Settings
            </button>
          </div>

          {/* Dining Plan (optional but nice) */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              Dining Plan (optional)
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              Used to translate spending into dining-plan equivalents.
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  Plan Cost
                </div>
                <input
                  type="number"
                  value={planCost}
                  onChange={(e) => setPlanCost(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none"
                />
              </div>

              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  Weeks in Term
                </div>
                <input
                  type="number"
                  value={weeksInTerm}
                  onChange={(e) => setWeeksInTerm(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none"
                />
              </div>

              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  Meal Cost (optional)
                </div>
                <input
                  type="number"
                  value={mealCost}
                  onChange={(e) =>
                    setMealCost(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
