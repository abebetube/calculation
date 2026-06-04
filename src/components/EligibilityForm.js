import React from "react";
import { inputStyle, labelStyle } from "../styles";

export default function EligibilityForm({
  age1,
  setAge1,
  dealType,
  setDealType,
  propertyValue,
  setPropertyValue,
  equity,
  setEquity,
  income,
  setIncome,
  years,
  setYears,
  existingLoans,
  setExistingLoans,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "15px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>גיל הלווה</label>
        <input
          style={inputStyle}
          type="number"
          value={age1}
          onChange={(e) => setAge1(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>סוג עסקה</label>

        <select
          style={inputStyle}
          value={dealType}
          onChange={(e) => setDealType(e.target.value)}
        >
          <option value="FIRST_HOME">
            דירה ראשונה / יחידה
          </option>

          <option value="UPGRADER">
            משפר דיור
          </option>

          <option value="PURPOSE">
            לכל מטרה
          </option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>שווי הנכס</label>

        <input
          style={inputStyle}
          type="number"
          value={propertyValue}
          onChange={(e) =>
            setPropertyValue(Number(e.target.value))
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>הון עצמי</label>

        <input
          style={inputStyle}
          type="number"
          value={equity}
          onChange={(e) =>
            setEquity(Number(e.target.value))
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>הכנסה חודשית נטו</label>

        <input
          style={inputStyle}
          type="number"
          value={income}
          onChange={(e) =>
            setIncome(Number(e.target.value))
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>תקופת הלוואה</label>

        <input
          style={inputStyle}
          type="number"
          value={years}
          onChange={(e) =>
            setYears(Number(e.target.value))
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>
          החזרים חודשיים קיימים
        </label>

        <input
          style={inputStyle}
          type="number"
          value={existingLoans}
          onChange={(e) =>
            setExistingLoans(Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}
