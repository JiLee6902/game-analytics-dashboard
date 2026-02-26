import type { AnalyticsEntry } from "../types";

interface Props {
  entries: AnalyticsEntry[];
}

export function AnalyticsTable({ entries }: Props) {
  if (entries.length === 0) {
    return <p className="empty-state">No entries found.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Platform</th>
            <th>Genre</th>
            <th>DAU</th>
            <th>Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.gameName}</td>
              <td>
                <span className={`badge badge-${entry.platform.toLowerCase()}`}>
                  {entry.platform}
                </span>
              </td>
              <td>{entry.genre}</td>
              <td>{entry.dailyActivePlayers.toLocaleString()}</td>
              <td>${entry.revenue.toLocaleString()}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
