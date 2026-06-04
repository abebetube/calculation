
import React from "react";
import { inputStyle } from "../styles";
import { pmt } from "../utils/mortgageUtils";

export default function TracksTable({
  tracks,
  updateTrack,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
      }}
    >
      <thead>
        <tr>
          <th>מסלול</th>
          <th>סכום</th>
          <th>ריבית</th>
          <th>שנים</th>
          <th>החזר חודשי</th>
        </tr>
      </thead>

      <tbody>
        {tracks.map((t) => (
          <tr key={t.id}>
            <td>{t.name}</td>

            <td>
              <input
                style={inputStyle}
                type="number"
                value={t.amount}
                onChange={(e) =>
                  updateTrack(
                    t.id,
                    "amount",
                    e.target.value
                  )
                }
              />
            </td>

            <td>
              <input
                style={inputStyle}
                type="number"
                step="0.01"
                value={t.rate}
                onChange={(e) =>
                  updateTrack(
                    t.id,
                    "rate",
                    e.target.value
                  )
                }
              />
            </td>

            <td>
              <input
                style={inputStyle}
                type="number"
                value={t.years}
                onChange={(e) =>
                  updateTrack(
                    t.id,
                    "years",
                    e.target.value
                  )
                }
              />
            </td>

            <td>
              ₪
              {Math.round(
                pmt(
                  t.amount,
                  t.rate,
                  t.years
                )
              ).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
