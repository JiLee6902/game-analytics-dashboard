// @ts-nocheck
// Template: Custom React Hook with API integration
// Usage: Copy this template and replace placeholders
// Location: frontend/src/hooks/useHookName.ts

// === Type-only imports ===
import type { AnalyticsEntry } from '../types';

// === Value imports ===
import { useState, useCallback } from 'react';

// === API base URL ===
const API_URL = 'http://localhost:3001';

// === Hook ===
function useHookName() {
  // --- State ---
  const [data, setData] = useState<AnalyticsEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch data ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/analytics`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Create entry ---
  const createEntry = useCallback(async (entry: Omit<AnalyticsEntry, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.join(', ') || errorData.message?.join(', ') || 'Failed to create entry');
      }
      const newEntry = await response.json();
      setData(prev => [...prev, newEntry]);
      return newEntry;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Return ---
  return {
    data,
    loading,
    error,
    fetchData,
    createEntry,
  };
}

export default useHookName;
