import { useState, useEffect, useRef } from "react";

interface Props {
  onFilter: (filters: Record<string, string>) => void;
}

export function FilterBar({ onFilter }: Props) {
  const [gameName, setGameName] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const filters: Record<string, string> = {};
      if (gameName) filters.gameName = gameName;
      if (platform) filters.platform = platform;
      if (genre) filters.genre = genre;
      onFilter(filters);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [gameName, platform, genre, onFilter]);

  const handleReset = () => {
    setGameName("");
    setPlatform("");
    setGenre("");
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search game..."
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="">All Platforms</option>
        <option value="PC">PC</option>
        <option value="Mobile">Mobile</option>
        <option value="Console">Console</option>
      </select>
      <input
        type="text"
        placeholder="Genre..."
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button type="button" onClick={handleReset} className="btn-secondary">
        Reset
      </button>
    </div>
  );
}
