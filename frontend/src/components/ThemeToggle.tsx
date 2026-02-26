interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button className="btn-secondary" onClick={onToggle}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
