export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
      <div className="w-7 h-7 border-2 border-dashed border-border-dot border-t-foreground rounded-full animate-spin" />
      <span className="text-sm text-muted">Loading…</span>
    </div>
  );
}
