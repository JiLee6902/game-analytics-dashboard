export interface AnalyticsEntry {
  id: string;
  gameName: string;
  platform: "PC" | "Mobile" | "Console";
  genre: string;
  dailyActivePlayers: number;
  revenue: number;
  date: string;
}

export interface AnalyticsSummary {
  totalEntries: number;
  totalRevenue: number;
  totalPlayers: number;
  averageRevenue: number;
  averagePlayers: number;
  topGame: string;
  platformBreakdown: Record<string, number>;
}
