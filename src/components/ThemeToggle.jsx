import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-dashed border-border-dot bg-surface-card text-muted cursor-pointer transition-colors duration-200 hover:text-foreground hover:border-muted hover:bg-surface-hover"
      style={{ touchAction: 'manipulation' }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
