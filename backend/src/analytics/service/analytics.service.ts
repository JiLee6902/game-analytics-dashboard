import { Injectable } from "@nestjs/common";
import type {
  AnalyticsEntry,
  AnalyticsSummary,
} from "../entities/analytics.entity";
import type { CreateAnalyticsDto } from "../dto/create-analytics.dto";
import type { FilterAnalyticsDto } from "../dto/filter-analytics.dto";

@Injectable()
export class AnalyticsService {
  private nextId = 11;
  private readonly store: AnalyticsEntry[] = [
    { id: "1", gameName: "Cyber Legends", platform: "PC", genre: "RPG", dailyActivePlayers: 45200, revenue: 128500, date: "2025-01-15", createdAt: Date.now() },
    { id: "2", gameName: "Cyber Legends", platform: "Mobile", genre: "RPG", dailyActivePlayers: 82100, revenue: 95300, date: "2025-01-15", createdAt: Date.now() },
    { id: "3", gameName: "Speed Rush", platform: "Console", genre: "Racing", dailyActivePlayers: 31400, revenue: 67800, date: "2025-01-15", createdAt: Date.now() },
    { id: "4", gameName: "Speed Rush", platform: "PC", genre: "Racing", dailyActivePlayers: 22300, revenue: 45600, date: "2025-01-16", createdAt: Date.now() },
    { id: "5", gameName: "Battle Arena", platform: "Mobile", genre: "Strategy", dailyActivePlayers: 120500, revenue: 210400, date: "2025-01-16", createdAt: Date.now() },
    { id: "6", gameName: "Battle Arena", platform: "PC", genre: "Strategy", dailyActivePlayers: 67800, revenue: 156200, date: "2025-01-17", createdAt: Date.now() },
    { id: "7", gameName: "Puzzle Quest", platform: "Mobile", genre: "Puzzle", dailyActivePlayers: 95600, revenue: 42100, date: "2025-01-17", createdAt: Date.now() },
    { id: "8", gameName: "Galaxy Wars", platform: "Console", genre: "Shooter", dailyActivePlayers: 58300, revenue: 189700, date: "2025-01-18", createdAt: Date.now() },
    { id: "9", gameName: "Galaxy Wars", platform: "PC", genre: "Shooter", dailyActivePlayers: 73400, revenue: 201300, date: "2025-01-18", createdAt: Date.now() },
    { id: "10", gameName: "Farm Life", platform: "Mobile", genre: "Simulation", dailyActivePlayers: 142000, revenue: 78900, date: "2025-01-19", createdAt: Date.now() },
  ];

  findAll(filters: FilterAnalyticsDto): AnalyticsEntry[] {
    let data = [...this.store];

    if (filters.platform) {
      data = data.filter((d) => d.platform === filters.platform);
    }
    if (filters.genre) {
      data = data.filter((d) =>
        d.genre.toLowerCase().includes(filters.genre!.toLowerCase()),
      );
    }
    if (filters.gameName) {
      data = data.filter((d) =>
        d.gameName.toLowerCase().includes(filters.gameName!.toLowerCase()),
      );
    }
    if (filters.startDate) {
      data = data.filter((d) => d.date >= filters.startDate!);
    }
    if (filters.endDate) {
      data = data.filter((d) => d.date <= filters.endDate!);
    }

    return data;
  }

  getSummary(): AnalyticsSummary {
    const data = this.store;

    if (data.length === 0) {
      return {
        totalEntries: 0,
        totalRevenue: 0,
        totalPlayers: 0,
        averageRevenue: 0,
        averagePlayers: 0,
        topGame: "N/A",
        platformBreakdown: {},
      };
    }

    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
    const totalPlayers = data.reduce(
      (sum, d) => sum + d.dailyActivePlayers,
      0,
    );

    const revenueByGame: Record<string, number> = {};
    const platformBreakdown: Record<string, number> = {};

    for (const entry of data) {
      revenueByGame[entry.gameName] =
        (revenueByGame[entry.gameName] || 0) + entry.revenue;
      platformBreakdown[entry.platform] =
        (platformBreakdown[entry.platform] || 0) + 1;
    }

    const topGame = Object.entries(revenueByGame).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    return {
      totalEntries: data.length,
      totalRevenue,
      totalPlayers,
      averageRevenue: Math.round(totalRevenue / data.length),
      averagePlayers: Math.round(totalPlayers / data.length),
      topGame,
      platformBreakdown,
    };
  }

  create(dto: CreateAnalyticsDto): AnalyticsEntry {
    const entry: AnalyticsEntry = {
      id: String(this.nextId++),
      gameName: dto.gameName.trim(),
      platform: dto.platform,
      genre: dto.genre.trim(),
      dailyActivePlayers: dto.dailyActivePlayers,
      revenue: dto.revenue,
      date: dto.date,
      createdAt: Date.now(),
    };
    this.store.push(entry);
    return entry;
  }

  getEntriesSince(since: number): AnalyticsEntry[] {
    return this.store.filter((entry) => entry.createdAt > since);
  }

  getAll(): AnalyticsEntry[] {
    return [...this.store];
  }

  generateCsv(): string {
    const headers = [
      "id",
      "gameName",
      "platform",
      "genre",
      "dailyActivePlayers",
      "revenue",
      "date",
    ];
    const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const rows = this.store.map((entry) =>
      headers
        .map((h) => {
          const raw = entry[h as keyof AnalyticsEntry];
          if (typeof raw === "number") return String(raw);
          if (h === "date") return `="${String(raw)}"`;
          return escape(String(raw));
        })
        .join(","),
    );
    return "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  }
}
