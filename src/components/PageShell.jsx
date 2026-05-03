import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function PageShell({ title, children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-dashed border-border-dot sticky top-0 z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted px-2.5 py-1.5 rounded-md transition-colors duration-150 hover:text-foreground hover:bg-surface-hover"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
              <span>Home</span>
            </Link>
          )}
          {title && <h1 className="text-lg font-semibold tracking-tight">{title}</h1>}
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-1 px-6 py-8 pb-12 max-w-[1200px] w-full mx-auto">{children}</main>
    </div>
  );
}