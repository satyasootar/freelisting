import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchRandomJoke } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import { RefreshCw, Laugh } from 'lucide-react';

export default function Jokes() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialized = useRef(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchRandomJoke()
      .then(setJoke)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      load();
    }
  }, [load]);

  return (
    <PageShell title="Jokes">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={load} />}
      {!loading && !error && joke && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="max-w-xl w-full px-8 py-10 border border-dashed border-border-dot rounded-xl bg-surface-card flex flex-col items-center gap-5 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg border border-dashed border-emerald-500 text-emerald-500" aria-hidden="true">
              <Laugh size={32} />
            </div>
            <p className="text-lg leading-relaxed" style={{ textWrap: 'pretty' }}>{joke.content}</p>
            {joke.categories?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {joke.categories.map((c) => (
                  <span key={c} className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-dashed border-border-dot text-muted">{c}</span>
                ))}
              </div>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-md border border-dashed border-border-dot bg-surface-card text-foreground cursor-pointer transition-colors duration-150 hover:bg-surface-hover hover:border-muted"
            onClick={load}
            aria-label="Get another joke"
            style={{ touchAction: 'manipulation' }}
          >
            <RefreshCw size={16} /> Another One
          </button>
        </div>
      )}
    </PageShell>
  );
}