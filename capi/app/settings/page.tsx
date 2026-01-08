"use client";

import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "../../lib/storage";
import { Profile } from "../../lib/types";

export default function SettingsPage() {
  const [planCost, setPlanCost] = useState(2800);
  const [weeksInTerm, setWeeksInTerm] = useState(16);
  const [mealCost, setMealCost] = useState<number | "">(12);

  useEffect(() => {
    const p = getProfile();
    if (p) {
      setPlanCost(p.planCost);
      setWeeksInTerm(p.weeksInTerm);
      setMealCost(p.mealCost ?? "");
    }
  }, []);

  function onSave() {
    const profile: Profile = {
      planCost: Number(planCost),
      weeksInTerm: Number(weeksInTerm),
      mealCost: mealCost === "" ? undefined : Number(mealCost),
    };
    saveProfile(profile);
    alert("Saved!");
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>Settings</h1>

      <label>Dining plan cost ($)</label>
      <input
        value={planCost}
        onChange={(e) => setPlanCost(Number(e.target.value))}
        type="number"
      />

      <label>Weeks in term</label>
      <input
        value={weeksInTerm}
        onChange={(e) => setWeeksInTerm(Number(e.target.value))}
        type="number"
      />

      <label>Optional: cost per dining-hall meal ($)</label>
      <input
        value={mealCost}
        onChange={(e) =>
          setMealCost(e.target.value === "" ? "" : Number(e.target.value))
        }
        type="number"
      />

      <button onClick={onSave} style={{ marginTop: 12 }}>
        Save
      </button>
    </div>
  );
}
