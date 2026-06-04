
import React from "react";
import { cardStyle } from "../styles";

export default function EligibilitySummary({
  loanAmount,
  financingPercent,
  financingOk,
  maxPayment,
  availablePayment,
  estimatedMonthlyPayment,
  repaymentCapacityOk,
  eligibilityMessage,
  limits,
  dealType,
  maxYearsByAge,
  eligible,
}) {
  return (
    <div
      style={{
        ...cardStyle,
        marginTop: 20,
      }}
    >
      <p>
        גובה מימון:
        ₪{loanAmount.toLocaleString()}
      </p>

      <p>
        אחוז מימון:
        {financingPercent.toFixed(2)}%
      </p>

      <p>
        מגבלה:
        {limits[dealType]}%
      </p>

      <p>
        {financingOk
          ? "✅ אחוז מימון תקין"
          : "❌ חריגה באחוז המימון"}
      </p>

      <p>
        כושר החזר מקסימלי:
        ₪{maxPayment.toLocaleString()}
      </p>

      <p>
        כושר החזר פנוי:
        ₪{availablePayment.toLocaleString()}
      </p>

      <p>
        החזר חודשי משוער:
        ₪
        {Math.round(
          estimatedMonthlyPayment
        ).toLocaleString()}
      </p>

      <p>
        {repaymentCapacityOk
          ? "✅ גובה המימון תואם את כושר ההחזר"
          : "❌ גובה המימון גבוה ביחס לכושר ההחזר"}
      </p>

      <div
        style={{
          background: eligible
            ? "#dcfce7"
            : "#fee2e2",
          padding: 15,
          borderRadius: 10,
          fontWeight: "bold",
        }}
      >
        {eligibilityMessage}
      </div>

      <p>
        תקופת הלוואה מקסימלית לפי גיל:
        {maxYearsByAge} שנים
      </p>
    </div>
  );
}
