import { useEffect, useState } from 'react';
import { fetchQuotes } from '../api';
import PageShell from '../components/PageShell';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import Pagination from '../components/Pagination';
import { Quote as QuoteIcon } from 'lucide-react';

export default function Quotes() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = (p) => {
    setLoading(true);
    setError(null);
    fetchQuotes(p, 12)
      .then((res) => { setData(res.data); setTotalPages(res.totalPages); setPage(res.page); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(1); }, []);

  return (
    <PageShell title="Quotes">
      {loading && <Loader />}
      {error && <ErrorMsg message={error} onRetry={() => load(page)} />}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {data.map((q) => (
              <article key={q.id} className="p-6 border border-dashed border-border-dot rounded-xl bg-surface-card flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <QuoteIcon size={24} className="text-amber-500 shrink-0" aria-hidden="true" />
                <blockquote className="text-base italic leading-relaxed flex-1">
                  &ldquo;{q.content}&rdquo;
                </blockquote>
                <footer className="text-xs font-medium text-muted">— {q.author}</footer>
              </article>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={load} />
        </>
      )}
    </PageShell>
  );
}