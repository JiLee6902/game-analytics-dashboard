import { useState } from "react";
import type { AnalyticsEntry } from "../types";

interface Props {
  onSubmit: (data: Omit<AnalyticsEntry, "id">) => Promise<void>;
}

export function AddEntryForm({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    gameName: "",
    platform: "PC" as AnalyticsEntry["platform"],
    genre: "",
    dailyActivePlayers: "",
    revenue: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        gameName: form.gameName,
        platform: form.platform,
        genre: form.genre,
        dailyActivePlayers: Number(form.dailyActivePlayers),
        revenue: Number(form.revenue),
        date: form.date,
      });
      setForm({
        gameName: "",
        platform: "PC",
        genre: "",
        dailyActivePlayers: "",
        revenue: "",
        date: new Date().toISOString().slice(0, 10),
      });
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add entry");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + Add Entry
      </button>
    );
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Entry</h3>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-grid">
        <input
          required
          placeholder="Game Name"
          value={form.gameName}
          onChange={(e) => setForm({ ...form, gameName: e.target.value })}
        />
        <select
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value as AnalyticsEntry["platform"] })}
        >
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
          <option value="Console">Console</option>
        </select>
        <input
          required
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <input
          required
          type="number"
          min="0"
          placeholder="Daily Active Players"
          value={form.dailyActivePlayers}
          onChange={(e) => setForm({ ...form, dailyActivePlayers: e.target.value })}
        />
        <input
          required
          type="number"
          min="0"
          placeholder="Revenue ($)"
          value={form.revenue}
          onChange={(e) => setForm({ ...form, revenue: e.target.value })}
        />
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Adding..." : "Add"}
        </button>
        <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
