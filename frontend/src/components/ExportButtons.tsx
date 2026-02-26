const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function ExportButtons() {
  const handleExport = (format: "csv" | "json") => {
    window.open(`${API_BASE}/analytics/export?format=${format}`, "_blank");
  };

  return (
    <div className="export-buttons">
      <button className="btn-secondary" onClick={() => handleExport("csv")}>
        Export CSV
      </button>
      <button className="btn-secondary" onClick={() => handleExport("json")}>
        Export JSON
      </button>
    </div>
  );
}
