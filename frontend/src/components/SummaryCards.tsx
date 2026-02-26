import type { AnalyticsSummary } from "../types";

interface Props {
  summary: AnalyticsSummary;
}

export function SummaryCards({ summary }: Props) {
  const cards = [
    { label: "Total Entries", value: summary.totalEntries },
    { label: "Total Revenue", value: `$${summary.totalRevenue.toLocaleString()}` },
    { label: "Total Players", value: summary.totalPlayers.toLocaleString() },
    { label: "Avg Revenue", value: `$${summary.averageRevenue.toLocaleString()}` },
    { label: "Avg Players", value: summary.averagePlayers.toLocaleString() },
    { label: "Top Game", value: summary.topGame },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.label} className="card">
          <span className="card-label">{card.label}</span>
          <span className="card-value">{card.value}</span>
        </div>
      ))}
    </div>
  );
}
