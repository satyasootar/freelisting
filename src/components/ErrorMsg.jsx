export default function ErrorMsg({ message, onRetry }) {
  return (
    <div className="text-center py-12 px-4" role="alert">
      <p className="text-red-500 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          className="text-sm font-medium px-5 py-2 rounded-md border border-dashed border-border-dot bg-surface-card text-foreground cursor-pointer transition-colors duration-150 hover:bg-surface-hover hover:border-muted"
          onClick={onRetry}
          style={{ touchAction: 'manipulation' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}