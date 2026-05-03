import { ChevronLeft, ChevronRight } from 'lucide-react';

const btnClass =
  'inline-flex items-center gap-1 text-sm font-medium px-3.5 py-2 rounded-md border border-dashed border-border-dot bg-surface-card text-foreground cursor-pointer transition-colors duration-150 hover:bg-surface-hover hover:border-muted disabled:opacity-35 disabled:cursor-not-allowed';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-dashed border-border-dot">
      <button className={btnClass} onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>
      <span className="text-sm text-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {page}&nbsp;/&nbsp;{totalPages}
      </span>
      <button className={btnClass} onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
