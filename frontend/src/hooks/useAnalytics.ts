import { useState, useEffect, useCallback, useRef } from "react";
import type { AnalyticsEntry, AnalyticsSummary } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function useAnalytics() {
  const [entries, setEntries] = useState<AnalyticsEntry[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastPollTimestamp = useRef<number>(0);
  const initialLoadDone = useRef(false);

  const fetchData = useCallback(async (filters?: Record<string, string>) => {
    if (!initialLoadDone.current) {
      setLoading(true);
    }
    setError(null);
    try {
      const params = new URLSearchParams(filters);
      const [entriesRes, summaryRes] = await Promise.all([
        fetch(`${API_BASE}/analytics?${params}`),
        fetch(`${API_BASE}/analytics/summary`),
      ]);

      if (!entriesRes.ok || !summaryRes.ok) {
        throw new Error("Failed to fetch data");
      }

      setEntries(await entriesRes.json());
      setSummary(await summaryRes.json());
      lastPollTimestamp.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      initialLoadDone.current = true;
    }
  }, []);

  const addEntry = async (data: Omit<AnalyticsEntry, "id">) => {
    const res = await fetch(`${API_BASE}/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(
        body.errors?.join(", ") ||
          (Array.isArray(body.message) ? body.message.join(", ") : body.message) ||
          "Failed to create entry",
      );
    }

    await fetchData();
    return res.json();
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Polling for new entries every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/analytics/poll?since=${lastPollTimestamp.current}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.entries.length > 0) {
          lastPollTimestamp.current = data.timestamp;
          fetchData();
        }
      } catch {
        // Silently ignore poll errors (server may restart)
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return { entries, summary, loading, error, fetchData, addEntry };
}
