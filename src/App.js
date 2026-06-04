
import React from "react";
import EligibilityForm from "./components/EligibilityForm";
import EligibilitySummary from "./components/EligibilitySummary";
import TracksTable from "./components/TracksTable";
import MixSummary from "./components/MixSummary";
export default function MixSummary({
  summary,
  availablePayment,
  invalidTracks,
  invalidYearsTracks,
  age1,
  maxYearsByAge,
}) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 15,
        border: "1px solid #ddd",
      }}
    >
      <h3>סיכום</h3>

      <p>
        החזר חודשי:
        ₪
        {Math.round(
          summary.monthly
        ).toLocaleString()}
      </p>

      <p>
        סה״כ ריביות:
        ₪
        {summary.totalInterest.toFixed(0)}
      </p>

      <p>
        עלות כוללת:
        ₪
        {summary.totalCost.toFixed(0)}
      </p>

      {invalidTracks.map((t) => (
        <p
          key={t.id}
          style={{ color: "red" }}
        >
          ❌ {t.name} מסתיים בגיל{" "}
          {Number(age1) + Number(t.years)}
        </p>
      ))}

      {invalidYearsTracks.map((t) => (
        <p
          key={t.id}
          style={{ color: "red" }}
        >
          ❌ {t.name} חורג מ-
          {maxYearsByAge} שנים
        </p>
      ))}

      <p>
        {summary.monthly <=
        availablePayment
          ? "✅ התמהיל עומד בכושר ההחזר"
          : "❌ התמהיל חורג מכושר ההחזר"}
      </p>
    </div>
  );
}
