import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { AnalyticsEntry } from "../types";

interface Props {
  entries: AnalyticsEntry[];
}

export function RevenueChart({ entries }: Props) {
  // Aggregate revenue by game
  const dataMap: Record<string, { game: string; revenue: number; players: number }> = {};
  for (const entry of entries) {
    if (!dataMap[entry.gameName]) {
      dataMap[entry.gameName] = { game: entry.gameName, revenue: 0, players: 0 };
    }
    dataMap[entry.gameName].revenue += entry.revenue;
    dataMap[entry.gameName].players += entry.dailyActivePlayers;
  }

  const chartData = Object.values(dataMap).sort((a, b) => b.revenue - a.revenue);

  if (chartData.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Revenue by Game</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
