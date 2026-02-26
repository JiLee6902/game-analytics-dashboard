export type Platform = "PC" | "Mobile" | "Console";

export interface AnalyticsEntry {
  id: string;
  gameName: string;
  platform: Platform;
  genre: string;
  dailyActivePlayers: number;
  revenue: number;
  date: string; // YYYY-MM-DD
  createdAt: number; // Unix ms — used for polling
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
