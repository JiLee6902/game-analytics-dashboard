import { useAnalytics } from "./hooks/useAnalytics";
import { useTheme } from "./hooks/useTheme";
import { SummaryCards } from "./components/SummaryCards";
import { AnalyticsTable } from "./components/AnalyticsTable";
import { FilterBar } from "./components/FilterBar";
import { AddEntryForm } from "./components/AddEntryForm";
import { RevenueChart } from "./components/RevenueChart";
import { ThemeToggle } from "./components/ThemeToggle";
import { ExportButtons } from "./components/ExportButtons";

function App() {
  const { entries, summary, loading, error, fetchData, addEntry } = useAnalytics();
  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return <div className="container"><p className="loading">Loading...</p></div>;
  }

  if (error) {
    return (
      <div className="container">
        <p className="error-msg">Error: {error}</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <div className="header-row">
          <div>
            <h1>Game Analytics Dashboard</h1>
            <p className="subtitle">Real-time game performance metrics</p>
          </div>
          <div className="controls-right">
            <ExportButtons />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {summary && <SummaryCards summary={summary} />}

      <RevenueChart entries={entries} />

      <section className="controls">
        <FilterBar onFilter={(filters) => fetchData(filters)} />
        <AddEntryForm onSubmit={addEntry} />
      </section>

      <AnalyticsTable entries={entries} />
    </div>
  );
}

export default App;
